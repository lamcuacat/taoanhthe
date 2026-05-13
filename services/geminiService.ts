import { GoogleGenAI, Modality, Part } from "@google/genai";

// Fix: Initialize the GoogleGenAI client lazily.
let aiClient: GoogleGenAI | null = null;
function getAi(): GoogleGenAI {
    if (!aiClient) {
        // @ts-ignore
        const key = process.env.API_KEY || process.env.GEMINI_API_KEY || (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY);
        if (!key) {
            console.error("Thiếu API Key cho Gemini. Vui lòng thêm biến môi trường GEMINI_API_KEY hoặc VITE_GEMINI_API_KEY.");
            // We initialize it with a dummy string so it doesn't immediately crash, but requests will fail.
            aiClient = new GoogleGenAI({ apiKey: "MISSING_KEY" });
        } else {
            aiClient = new GoogleGenAI({ apiKey: key });
        }
    }
    return aiClient;
}

interface GeneratedImage {
  base64: string;
  mimeType: string;
}

interface GenerationResult {
    success: boolean;
    images?: GeneratedImage[];
    error?: string;
}

/**
 * Generates a single passport photo from a source image using a highly constrained, single-step process.
 */
export const generatePassportPhoto = async (
  base64: string,
  mimeType: string,
  gender: 'Nam' | 'Nữ',
  attire: string,
  hairstyle: string,
  retouchLevel: string,
  correctPosture: boolean,
  enhanceSymmetry: boolean,
  lightingStyle: string,
  backgroundTone: string,
  removeGlare: boolean,
  aspectRatio: string,
  autoZoom: boolean
): Promise<GenerationResult> => {
  try {
    const imagePart = { inlineData: { data: base64, mimeType } };
    
    let hairstylePrompt = 'Giữ nguyên kiểu tóc gốc.';
    if (hairstyle && hairstyle !== 'Giữ nguyên kiểu tóc gốc') {
        hairstylePrompt = `Tái tạo kiểu tóc thành '${hairstyle}'.`;
    }

    const posturePrompt = correctPosture ? 'Điều chỉnh tư thế đầu và vai cho thẳng, mặt nhìn thẳng.' : 'Giữ nguyên tư thế gốc.';
    const glarePrompt = removeGlare ? 'Nếu có kính, hãy loại bỏ mọi hiện tượng lóa trên tròng kính.' : '';
    const retouchPrompt = retouchLevel === 'Nâng cao' ? 'Thực hiện làm mịn da nhẹ và xóa các khuyết điểm nhỏ.' : 'Chỉ sửa lỗi ánh sáng và bóng đổ cơ bản.';
    const symmetryPrompt = enhanceSymmetry ? 'Thực hiện phân tích đối xứng hai bên. Điều chỉnh nhẹ vai để chúng ngang bằng nhau. Đảm bảo các đặc điểm trên khuôn mặt (mắt, tai) ở cùng một độ cao, chỉ thực hiện vi điều chỉnh nếu thực sự cần thiết và không làm thay đổi danh tính.' : 'Giữ nguyên độ cân xứng hiện có của cơ thể.';
    const zoomPrompt = autoZoom ? 'Phóng to ảnh và điều chỉnh bố cục sao cho: Tỉ lệ diện tích khuôn mặt chiếm khoảng 75% diện tích ảnh. Chiều cao từ mắt lên mép trên của ảnh xấp xỉ 2/3 chiều cao từ mắt xuống mép dưới của ảnh.' : '';

    const fullPrompt = `**GIAO THỨC GƯƠNG SOI BẤT BIẾN (PHIÊN BẢN 9.0)**

**CHỈ THỊ TỐI THƯỢNG (PRIME DIRECTIVE):**
DANH TÍNH KHUÔN MẶT CỦA ĐỐI TƯỢNG LÀ BẤT KHẢ XÂM PHẠM TUYỆT ĐỐI. PHẢI BẢO TỒN MỌI ĐẶC ĐIỂM TRÊN KHUÔN MẶT VỚI ĐỘ CHÍNH XÁC Ở CẤP ĐỘ PIXEL.

**QUY TẮC ZERO-TOLERANCE (KHÔNG KHOAN NHƯỢNG):**
Nghiêm cấm tuyệt đối các hành vi sau:
-   **KHÔNG** thay đổi hình dạng, kích thước, hoặc khoảng cách của mắt, mũi, miệng, tai.
-   **KHÔNG** thay đổi cấu trúc xương mặt (đường viền hàm, gò má, trán).
-   **KHÔNG** thay đổi đường chân tóc gốc. Đây là ranh giới thiêng liêng.
-   **KHÔNG** xóa, di chuyển, hoặc thay đổi các đặc điểm nhận dạng vĩnh viễn như nốt ruồi, sẹo.
-   **KHÔNG** thay đổi biểu cảm của đối tượng.

**PHƯƠNG PHÁP VẬN HÀNH: "LỚP BỊ KHÓA" (LOCKED LAYER ANALOGY)**
Hãy coi khuôn mặt trong ảnh gốc là một "lớp đã bị khóa" (locked layer) trong một phần mềm chỉnh sửa ảnh. Nhiệm vụ của bạn chỉ là chỉnh sửa các lớp xung quanh nó. Mọi thao tác của bạn phải diễn ra BÊN NGOÀI vùng mặt.

**YÊU CẦU CHỈNH SỬA (Thực thi bên ngoài lớp bị khóa):**
1.  **Phông nền:** Thay đổi thành nền trơn, màu '${backgroundTone}'.
2.  **Trang phục:** Thay đổi thành '${attire}'.
3.  **Kiểu tóc:** ${hairstylePrompt}
    -   **CẢNH BÁO AN TOÀN TÓC:** Kiểu tóc mới phải mọc một cách tự nhiên từ ĐƯỜNG CHÂN TÓC GỐC VÀ KHÔNG THAY ĐỔI. Không được phép che trán nhiều hơn ảnh gốc. ${gender === 'Nữ' ? "ĐẶC BIỆT CẨN TRỌNG VỚI TÓC NỮ: Các kiểu tóc phức tạp của nữ có nguy cơ cao làm thay đổi khuôn mặt. Hãy tăng cường các biện pháp bảo vệ danh tính lên mức tối đa." : ""}
4.  **Ánh sáng:** Áp dụng '${lightingStyle}'.
5.  **Tư thế & Cân xứng:** ${posturePrompt} ${symmetryPrompt}
6.  **Bố cục & Phóng to:** ${zoomPrompt}
7.  **Chỉnh sửa khác:** ${glarePrompt} ${retouchPrompt}

**QUY TRÌNH KIỂM TRA NỘI BỘ (BẮT BUỘC):**
Trước khi xuất kết quả cuối cùng, hãy tự trả lời câu hỏi: "Nếu đặt ảnh gốc và ảnh kết quả cạnh nhau, một người bình thường có thể nhận ra bất kỳ sự khác biệt nào trên khuôn mặt không?". Nếu câu trả lời không phải là "Hoàn toàn không", quá trình đã thất bại. Hủy bỏ kết quả và thực hiện lại từ đầu với sự tập trung cao độ hơn vào Chỉ thị Tối thượng.

**ĐỊNH DẠNG ĐẦU RA:** Trả về một hình ảnh duy nhất với tỷ lệ khung hình chính xác là ${aspectRatio}. Chỉ trả về hình ảnh. Không có văn bản.`;

    const ai = getAi();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: fullPrompt }, imagePart] },
      config: { responseModalities: [Modality.IMAGE, Modality.TEXT] },
    });
    
    const generatedImages: GeneratedImage[] = [];
    if (response.candidates && response.candidates.length > 0) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                generatedImages.push({
                    base64: part.inlineData.data,
                    mimeType: part.inlineData.mimeType,
                });
            }
        }
    }

    if (generatedImages.length > 0) {
        return { success: true, images: generatedImages.slice(0, 1) };
    } else {
        const failureReason = response.text || "AI không thể tạo ảnh.";
        console.warn("Image generation failed. Reason:", failureReason);
        const userFriendlyError = failureReason.includes("safety")
            ? "AI từ chối xử lý ảnh này vì lý do an toàn. Vui lòng thử một ảnh khác."
            : `Lỗi: ${failureReason}`;
        return { success: false, error: userFriendlyError };
    }

  } catch (error) {
    console.error("Error generating passport photos:", error);
    throw new Error("Không thể tạo ảnh bằng AI. Vui lòng kiểm tra khóa API và kết nối mạng của bạn.");
  }
};


/**
 * Refines a single passport photo based on a user's text prompt.
 */
export const refinePassportPhoto = async (
  base64: string,
  mimeType: string,
  prompt: string
): Promise<GeneratedImage | null> => {
   try {
    const imagePart = {
      inlineData: {
        data: base64,
        mimeType: mimeType,
      },
    };

    const textPart = {
      text: `**GIAO THỨC GƯƠNG SOI BẤT BIẾN (PHIÊN BẢN 9.0) - TINH CHỈNH AN TOÀN**

**CHỈ THỊ TỐI THƯỢNG (PRIME DIRECTIVE):**
DANH TÍNH KHUÔN MẶT CỦA ĐỐI TƯỢNG LÀ BẤT KHẢ XÂM PHẠM. BẢO TỒN 100% CÁC ĐẶC ĐIỂM TRÊN KHUÔN MẶT LÀ ƯU TIÊN DUY NHẤT.

**NHIỆM VỤ:**
Thực hiện yêu cầu chỉnh sửa sau đây: "${prompt}".

**QUY TRÌNH RA QUYẾT ĐỊNH:**
1.  **Phân tích Yêu cầu:** Yêu cầu này có chạm đến khuôn mặt (mắt, mũi, miệng, da, đường chân tóc, biểu cảm) không?
2.  **THỰC THI (Nếu An toàn):** Nếu yêu cầu KHÔNG chạm đến khuôn mặt (ví dụ: "thay đổi màu áo", "làm nền sáng hơn"), hãy thực hiện yêu cầu đó.
3.  **TỪ CHỐI & BẢO TOÀN (Nếu Nguy hiểm):** Nếu yêu cầu chạm đến khuôn mặt (ví dụ: "cười một chút", "nghiêng đầu"), bạn phải TỪ CHỐI HOÀN TOÀN yêu cầu đó. Trong trường hợp này, hãy trả về hình ảnh GỐC MÀ KHÔNG CÓ BẤT KỲ THAY ĐỔI NÀO. Sự an toàn danh tính quan trọng hơn việc thực hiện yêu cầu.

**ĐỊNH DẠNG ĐẦU RA:** Chỉ trả về hình ảnh. Không có văn bản.`,
    };

    const ai = getAi();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', 
      contents: {
        parts: [imagePart, textPart],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });
    
    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return {
            base64: part.inlineData.data,
            mimeType: part.inlineData.mimeType,
          };
        }
      }
    }
    
    console.warn("Refinement did not produce an image.");
    return null;

  } catch (error) {
    console.error("Error refining passport photo:", error);
    throw new Error("Failed to refine photo with AI. Please try again.");
  }
};