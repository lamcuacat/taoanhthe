import React from 'react';
import { 
  CheckCircle2, 
  ScanLine, 
  Sun, 
  Shirt, 
  UserSquare2, 
  Smile, 
  Glasses, 
  Image as ImageIcon 
} from 'lucide-react';

const requirements = [
  { icon: ScanLine, title: "Kích thước & Trọng tâm", text: "Khuôn mặt chiếm 75% diện tích ảnh. Tỷ lệ chuẩn (thường là 4x6cm hoặc 2x2 inch)." },
  { icon: Sun, title: "Phông nền", text: "Nền trắng hoặc xanh dương trơn, sáng đều và có độ tương phản tốt." },
  { icon: Shirt, title: "Trang phục", text: "Quần áo lịch sự; khuyến khích áo sơ mi hoặc vest có cổ." },
  { icon: UserSquare2, title: "Vị trí & Tư thế", text: "Mặt nhìn thẳng, đầu và vai cân đối, thẳng thắn." },
  { icon: Smile, title: "Biểu cảm", text: "Biểu cảm trung tính, miệng ngậm, mắt mở và nhìn rõ." },
  { icon: Glasses, title: "Kính & Phụ kiện", text: "Được phép đeo kính nhưng không được lóa mờ hoặc che khuất mắt. Tóc không che trán và tai." },
  { icon: ImageIcon, title: "Chất lượng ảnh", text: "Ảnh gốc cần sắc nét, không bị mờ nhòe hay vỡ hạt." },
];

const RequirementItem: React.FC<{ requirement: typeof requirements[0] }> = ({ requirement }) => {
  const Icon = requirement.icon;
  return (
    <li className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
      <div className="bg-indigo-100/50 p-2 rounded-lg text-indigo-600 mt-0.5">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h4 className="font-semibold text-slate-800 text-sm">{requirement.title}</h4>
        <p className="text-slate-500 text-sm mt-0.5 leading-relaxed">{requirement.text}</p>
      </div>
    </li>
  );
};

const RequirementsList: React.FC = () => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-100 h-full">
      <div className="flex items-center gap-3 mb-6">
        <CheckCircle2 className="w-8 h-8 text-green-500" />
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Tiêu chuẩn ảnh chuẩn</h2>
      </div>
      <p className="mb-6 text-slate-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 font-medium">Để AI xử lý tốt nhất, hãy tải lên một bức ảnh chụp chính diện rõ nét. AI của ProID Studio sẽ tự động căn chỉnh và xử lý các lỗi thường gặp.</p>
      <ul className="space-y-1">
        {requirements.map(req => (
          <RequirementItem key={req.title} requirement={req} />
        ))}
      </ul>
    </div>
  );
};

export default RequirementsList;