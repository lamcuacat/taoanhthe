import React, { useRef, useEffect } from 'react';
import { UploadCloud } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  triggerUpload?: boolean;
  onUploadTriggered?: () => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, triggerUpload, onUploadTriggered }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (triggerUpload) {
      handleClick();
      if (onUploadTriggered) {
        onUploadTriggered();
      }
    }
  }, [triggerUpload, onUploadTriggered]);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">1. Tải ảnh của bạn lên</h2>
      <div
        className="group relative border-2 border-dashed border-indigo-200 bg-indigo-50/30 rounded-2xl p-12 text-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50/80 transition-all duration-300 flex flex-col items-center justify-center min-h-[300px]"
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 pointer-events-none rounded-2xl"></div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
        />
        <div className="flex flex-col items-center justify-center relative z-10 w-full max-w-sm mx-auto">
            <div className="w-16 h-16 bg-white rounded-full shadow-sm mb-4 flex items-center justify-center text-indigo-500 group-hover:scale-110 group-hover:text-indigo-600 transition-transform duration-300">
                <UploadCloud className="w-8 h-8" />
            </div>
            <p className="mt-2 font-bold text-slate-700 text-lg">Nhấp để duyệt hoặc kéo thả ảnh</p>
            <p className="text-sm text-slate-500 mt-2 text-center">Định dạng hỗ trợ: JPEG, PNG, WEBP. Để có kết quả tốt nhất, hãy dùng ảnh chân dung rõ nét, nhìn thẳng.</p>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;