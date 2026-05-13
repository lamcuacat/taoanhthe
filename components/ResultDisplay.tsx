import React from 'react';
import { Download, Sparkles, Wand2, Image as ImageIcon, Key } from 'lucide-react';
import ImageComparator from './ImageComparator';
import ProgressBar from './ProgressBar';

interface ResultDisplayProps {
  generatedImages: string[];
  isLoading: boolean;
  error: string | null;
  sourceImage: string | null;
  sourceFileName: string;
  selectedImage: string | null;
  onImageSelect: (image: string) => void;
  refinementPrompt: string;
  onRefinementPromptChange: (prompt: string) => void;
  onRefine: () => void;
  isRefining: boolean;
  generationProgress: number;
  generationStatus: string;
  refinementProgress: number;
  refinementStatus: string;
}

const RefinementControls: React.FC<Pick<ResultDisplayProps, 'refinementPrompt' | 'onRefinementPromptChange' | 'onRefine' | 'isRefining' | 'selectedImage' | 'sourceFileName' | 'refinementProgress' | 'refinementStatus'>> = 
({ refinementPrompt, onRefinementPromptChange, onRefine, isRefining, selectedImage, sourceFileName, refinementProgress, refinementStatus }) => {
    
    const getDownloadFileName = () => {
        const parts = sourceFileName.split('.');
        parts.pop();
        const name = parts.join('.');
        return `${name}-hochieu-dieu-chinh.jpg`;
    };
    
    return (
        <div className="w-full max-w-lg mt-8 p-6 bg-slate-50 border border-slate-200/60 rounded-2xl flex flex-col gap-5 shadow-sm">
            <div>
              <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-indigo-600" />
                Chỉnh sửa bằng trí tuệ nhân tạo
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                  Nhập yêu cầu của bạn (ví dụ: "đổi áo sang màu xanh dương", "xóa nốt ruồi nhỏ").
              </p>
            </div>
            <textarea
                value={refinementPrompt}
                onChange={(e) => onRefinementPromptChange(e.target.value)}
                placeholder="Nhập yêu cầu chỉnh sửa..."
                className="w-full p-3 border border-slate-300 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm outline-none resize-none text-sm"
                rows={3}
                disabled={isRefining}
            />
            {isRefining && (
                <div className="my-1">
                    <ProgressBar progress={refinementProgress} label={refinementStatus} />
                </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-slate-200">
                <button
                    onClick={onRefine}
                    disabled={isRefining || !refinementPrompt}
                    className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-indigo-700 disabled:bg-indigo-400 disabled:opacity-70 transition-all shadow-sm group"
                >
                    <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    {isRefining ? 'Đang tinh chỉnh...' : 'Áp dụng chỉnh sửa'}
                </button>
                 <a
                  href={selectedImage!}
                  download={getDownloadFileName()}
                  className={`flex-1 flex items-center justify-center gap-2 bg-slate-800 text-white font-semibold py-3 px-4 rounded-xl hover:bg-slate-900 transition-all shadow-sm ${isRefining ? 'opacity-50 pointer-events-none' : ''}`}
                >
                  <Download className="w-4 h-4" />
                  Tải ảnh xuống
                </a>
            </div>
        </div>
    );
};


const ResultDisplay: React.FC<ResultDisplayProps> = (props) => {
    const { generatedImages, isLoading, error, selectedImage, sourceImage, generationProgress, generationStatus } = props;

  if (error) {
    const isApiError = error.toLowerCase().includes('api');
    return (
      <div className="flex flex-col items-center justify-center bg-red-50 border border-red-100 rounded-xl p-6 text-center shadow-sm w-full">
        <p className="text-red-700 text-sm font-medium mb-3">{error}</p>
        {isApiError && (
          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent('open-api-key-modal'));
            }}
            className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors shadow-sm text-sm flex items-center gap-2"
          >
            <Key className="w-4 h-4" />
            Nạp Khóa API Gemini
          </button>
        )}
      </div>
    );
  }
  
  if (isLoading) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 text-slate-500 w-full max-w-md mx-auto py-12">
            <ProgressBar progress={generationProgress} label={generationStatus} />
        </div>
    );
  }

  if (generatedImages.length > 0) {
    return (
      <div className="flex flex-col items-center w-full">
        {selectedImage && sourceImage && (
            <div className="w-full">
                <ImageComparator beforeImage={sourceImage} afterImage={selectedImage} />
            </div>
        )}

        {selectedImage && <RefinementControls {...props} />}
      </div>
    );
  }

  return (
    <div className="text-slate-400 text-center min-h-[200px] flex flex-col items-center justify-center bg-slate-50/50 rounded-2xl border border-slate-100 border-dashed m-1">
      <ImageIcon className="w-10 h-10 text-slate-300 mb-3" />
      <p className="text-sm">Ảnh hộ chiếu của bạn sẽ xuất hiện ở đây sau khi được tạo.</p>
    </div>
  );
};

export default ResultDisplay;