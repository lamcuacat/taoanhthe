import React from 'react';
import { Fingerprint, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/90 backdrop-blur-xl sticky top-0 z-50 border-b border-indigo-100/50 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-200/50">
            <Fingerprint className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 tracking-tight flex items-center gap-2">
              ProID AI Studio
              <span className="hidden sm:flex text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 items-center gap-1 mt-0.5 uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                Beta
              </span>
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm font-medium mt-0.5">Tạo ảnh thẻ chuẩn quốc tế</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <div className="text-sm font-medium text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">Cơ chế bởi Google Gemini</div>
        </div>
      </div>
    </header>
  );
};

export default Header;