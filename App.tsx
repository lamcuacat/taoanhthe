import React, { useState, useCallback, useRef } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ResultDisplay from './components/ResultDisplay';
import { generatePassportPhoto, refinePassportPhoto } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import GenerationOptions from './components/GenerationOptions';
import { MagicIcon } from './components/icons/MagicIcon';
import RequirementsList from './components/RequirementsList';
import SourceImageViewer from './components/SourceImageViewer';

const App: React.FC = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [refinementPrompt, setRefinementPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefining, setIsRefining] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sourceFileName, setSourceFileName] = useState<string>('anh-ho-chieu.jpg');
  const [triggerUpload, setTriggerUpload] = useState<boolean>(false);

  // State for progress bars
  const [generationProgress, setGenerationProgress] = useState<number>(0);
  const [generationStatus, setGenerationStatus] = useState<string>('');
  const [refinementProgress, setRefinementProgress] = useState<number>(0);
  const [refinementStatus, setRefinementStatus] = useState<string>('');
  const progressIntervalRef = useRef<number | null>(null);


  // State for customization options
  const [gender, setGender] = useState<'Nam' | 'Nữ'>('Nam');
  const [attire, setAttire] = useState<{ type: string; color: string; }>({ type: 'Áo sơ mi có cổ', color: 'trắng' });
  const [hairstyle, setHairstyle] = useState<string>('Giữ nguyên kiểu tóc gốc');
  const [retouchLevel, setRetouchLevel] = useState<string>('Tự nhiên');
  const [correctPosture, setCorrectPosture] = useState<boolean>(true);
  const [enhanceSymmetry, setEnhanceSymmetry] = useState<boolean>(true);
  const [lightingStyle, setLightingStyle] = useState<string>('Ánh sáng Studio mềm mại');
  const [backgroundTone, setBackgroundTone] = useState<string>('Trắng');
  const [removeGlare, setRemoveGlare] = useState<boolean>(true);
  const [aspectRatio, setAspectRatio] = useState<string>('4x6');
  const [autoZoom, setAutoZoom] = useState<boolean>(true);

  const handleAttireChange = (update: Partial<{ type: string; color: string; }>) => {
    setAttire(prev => ({ ...prev, ...update }));
  };

  const handleGenderChange = (newGender: 'Nam' | 'Nữ') => {
    setGender(newGender);
    setHairstyle('Giữ nguyên kiểu tóc gốc'); // Reset hairstyle to default
    setAttire({ type: 'Áo sơ mi có cổ', color: 'trắng' }); // Reset attire to a safe default
  };


  const handleGeneration = async () => {
      if (!sourceImage) return;

      setIsLoading(true);
      setError(null);
      setGeneratedImages([]);
      setSelectedImage(null);
      setGenerationProgress(0);

      // Simulate progress
      const generationTime = 25000; // 25 seconds
      const intervalTime = generationTime / 100;
      progressIntervalRef.current = window.setInterval(() => {
          setGenerationProgress(prev => {
              const newProgress = prev + 1;
              if (newProgress < 20) setGenerationStatus('Đang khởi tạo...');
              else if (newProgress < 50) setGenerationStatus('Đang gửi ảnh đến AI...');
              else if (newProgress < 85) setGenerationStatus('AI đang xử lý...');
              else if (newProgress < 100) setGenerationStatus('Sắp xong...');
              return newProgress >= 100 ? 99 : newProgress; // Stop at 99
          });
      }, intervalTime);

      const getRatioFromString = (size: string): string => {
        switch (size) {
            case '3x4':
                return '3:4';
            case '4x4':
                return '1:1';
            case '4x6':
            default:
                return '2:3';
        }
      };

      try {
          const { base64, mimeType } = await fileToBase64(sourceImage, true);
          
          let attireDetail = attire.type;
          if (attire.type === 'Áo vest') {
              attireDetail = 'một chiếc áo khoác vest công sở (suit jacket) hoặc blazer. YÊU CẦU BẮT BUỘC: Chiếc áo này PHẢI CÓ TAY DÀI, TUYỆT ĐỐI CẤM tạo ra áo gile (vest) không có tay.';
          }
          
          let attirePrompt = `${attireDetail} màu ${attire.color}`;
          if (gender === 'Nam' && attire.type === 'Áo vest') {
            attirePrompt = `một chiếc áo sơ mi trắng có cổ mặc bên trong ${attireDetail} màu ${attire.color}`;
          }
          
          const result = await generatePassportPhoto(
              base64, mimeType, gender, attirePrompt, hairstyle, 
              retouchLevel, correctPosture, enhanceSymmetry, lightingStyle,
              backgroundTone, removeGlare, getRatioFromString(aspectRatio),
              autoZoom
          );
          
          if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
          setGenerationProgress(100);
          setGenerationStatus('Hoàn tất!');

          if (result.success && result.images && result.images.length > 0) {
              const imageUrls = result.images.map(r => `data:${r.mimeType};base64,${r.base64}`);
              setGeneratedImages(imageUrls);
              setSelectedImage(imageUrls[0]);
          } else {
              setError(result.error || 'AI không thể tạo ảnh. Vui lòng thử một ảnh nguồn khác đáp ứng các yêu cầu.');
          }
      } catch (err) {
          console.error('Generation failed:', err);
          const errorMessage = err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định.';
          setError(`Đã xảy ra lỗi trong khi tạo ảnh: ${errorMessage}. Vui lòng kiểm tra kết nối mạng hoặc khóa API của bạn và thử lại.`);
      } finally {
          if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
          setIsLoading(false);
      }
  };

  const handleImageUpload = (file: File) => {
    setSourceFileName(file.name);
    // Clear previous state immediately
    setError(null);
    setGeneratedImages([]);
    setSelectedImage(null);
    
    fileToBase64(file)
      .then(base64 => {
        setSourceImage(base64);
      })
      .catch(err => {
        setError('Không thể đọc tệp đã chọn. Vui lòng thử một hình ảnh khác.');
        console.error(err);
      });
  };

  const handleCancel = () => {
    setSourceImage(null);
    setGeneratedImages([]);
    setSelectedImage(null);
    setError(null);
    // Reset options to default
    setGender('Nam');
    setAttire({ type: 'Áo sơ mi có cổ', color: 'trắng' });
    setHairstyle('Giữ nguyên kiểu tóc gốc');
    setRetouchLevel('Tự nhiên');
    setCorrectPosture(true);
    setEnhanceSymmetry(true);
    setLightingStyle('Ánh sáng Studio mềm mại');
    setBackgroundTone('Trắng');
    setRemoveGlare(true);
    setAspectRatio('4x6');
    setAutoZoom(true);
    setTriggerUpload(true);
  };

  const handleRefineClick = useCallback(async () => {
    if (!selectedImage || !refinementPrompt) {
      setError('Vui lòng chọn một ảnh và nhập yêu cầu chỉnh sửa.');
      return;
    }

    setIsRefining(true);
    setError(null);
    setRefinementProgress(0);

    // Simulate progress
    const refinementTime = 12000; // 12 seconds
    const intervalTime = refinementTime / 100;
    progressIntervalRef.current = window.setInterval(() => {
        setRefinementProgress(prev => {
            const newProgress = prev + 1;
            if (newProgress < 30) setRefinementStatus('Đang gửi yêu cầu...');
            else if (newProgress < 80) setRefinementStatus('AI đang tinh chỉnh...');
            else if (newProgress < 100) setRefinementStatus('Đang hoàn tất...');
            return newProgress >= 100 ? 99 : newProgress; // Stop at 99
        });
    }, intervalTime);


    try {
        const { base64, mimeType } = await fileToBase64(selectedImage, true);
        const result = await refinePassportPhoto(base64, mimeType, refinementPrompt);
        
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        setRefinementProgress(100);
        setRefinementStatus('Hoàn tất!');

        if (result) {
            const newImageUrl = `data:${result.mimeType};base64,${result.base64}`;
            const updatedImages = generatedImages.map(img => img === selectedImage ? newImageUrl : img);
            setGeneratedImages(updatedImages);
            setSelectedImage(newImageUrl);
            setRefinementPrompt('');
        } else {
            setError('AI không thể tinh chỉnh ảnh. Vui lòng thử một yêu cầu khác.');
        }

    } catch (err) {
        console.error('Refinement failed:', err);
        setError('Đã xảy ra lỗi trong quá trình tinh chỉnh. Vui lòng thử lại.');
    } finally {
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        setIsRefining(false);
    }
  }, [selectedImage, refinementPrompt, generatedImages]);


  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        
        {!sourceImage ? (
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex flex-col justify-center h-full">
              <ImageUploader
                onImageUpload={handleImageUpload}
                triggerUpload={triggerUpload}
                onUploadTriggered={() => setTriggerUpload(false)}
              />
            </div>
            <RequirementsList />
          </div>
        ) : (
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* --- LEFT COLUMN --- */}
                <div className="w-full bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-100 flex flex-col gap-6 lg:sticky lg:top-28">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">Ảnh đã tải lên</h2>
                        <SourceImageViewer src={sourceImage} aspectRatio={aspectRatio} />
                    </div>
                    <GenerationOptions 
                        gender={gender}
                        onGenderChange={handleGenderChange}
                        attire={attire}
                        onAttireChange={handleAttireChange}
                        hairstyle={hairstyle}
                        onHairstyleChange={setHairstyle}
                        retouchLevel={retouchLevel}
                        onRetouchLevelChange={setRetouchLevel}
                        correctPosture={correctPosture}
                        onCorrectPostureChange={setCorrectPosture}
                        enhanceSymmetry={enhanceSymmetry}
                        onEnhanceSymmetryChange={setEnhanceSymmetry}
                        lightingStyle={lightingStyle}
                        onLightingStyleChange={setLightingStyle}
                        backgroundTone={backgroundTone}
                        onBackgroundToneChange={setBackgroundTone}
                        removeGlare={removeGlare}
                        onRemoveGlareChange={setRemoveGlare}
                        aspectRatio={aspectRatio}
                        onAspectRatioChange={setAspectRatio}
                        autoZoom={autoZoom}
                        onAutoZoomChange={setAutoZoom}
                    />
                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <button 
                            onClick={handleGeneration}
                            disabled={isLoading}
                            className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-all"
                        >
                            <MagicIcon />
                            {isLoading ? 'Đang tạo...' : 'Tạo ảnh'}
                        </button>
                        <button
                            onClick={handleCancel}
                            className="flex-1 bg-transparent text-slate-700 font-semibold py-3 px-4 rounded-lg hover:bg-slate-100 disabled:opacity-50 transition-colors border border-slate-300"
                        >
                            Hủy, chọn ảnh khác
                        </button>
                    </div>
                </div>

                {/* --- RIGHT COLUMN --- */}
                <div className="w-full bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-100">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">Kết quả</h2>
                    <ResultDisplay
                        generatedImages={generatedImages}
                        isLoading={isLoading}
                        error={error}
                        sourceImage={sourceImage}
                        sourceFileName={sourceFileName}
                        selectedImage={selectedImage}
                        onImageSelect={setSelectedImage}
                        refinementPrompt={refinementPrompt}
                        onRefinementPromptChange={setRefinementPrompt}
                        onRefine={handleRefineClick}
                        isRefining={isRefining}
                        generationProgress={generationProgress}
                        generationStatus={generationStatus}
                        refinementProgress={refinementProgress}
                        refinementStatus={refinementStatus}
                    />
                </div>
            </div>
        )}
      </main>
      <footer className="text-center p-6 text-slate-500 text-sm mt-8 pb-12">
        <p className="font-medium text-slate-400">&copy; {new Date().getFullYear()} ProID AI Studio. All rights reserved.</p>
        <p className="text-xs text-slate-400 mt-1">Hệ thống xử lý ảnh thông minh tự động</p>
      </footer>
    </div>
  );
};

export default App;