import React, { useState, useRef } from 'react';

interface ImageComparatorProps {
  beforeImage: string;
  afterImage: string;
}

const ImageComparator: React.FC<ImageComparatorProps> = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };
  
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    handleMove(e.clientX)
  };
  const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
  
  const handleMouseUp = () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };
  
  const handleTouchEnd = () => {
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('touchend', handleTouchEnd);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <div className="w-full max-w-md mx-auto">
        <h3 className="font-bold text-xl text-slate-800 text-center mb-3">So sánh Trước & Sau</h3>
        <div ref={containerRef} className="relative w-full aspect-[2/3] overflow-hidden rounded-lg select-none group shadow-lg border-2 border-white">
            {/* After Image (Top Layer) */}
            <div 
                className="absolute top-0 left-0 h-full w-full"
                style={{
                    clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
                }}
            >
                <img src={afterImage} alt="Ảnh do AI tạo" className="h-full w-full object-cover pointer-events-none" />
                 <div className="absolute top-0 right-0 p-2 bg-black bg-opacity-60 text-white text-sm font-semibold rounded-bl-lg">AI</div>
            </div>

            {/* Before Image (Bottom Layer) */}
            <div className="h-full w-full">
                <img src={beforeImage} alt="Ảnh gốc" className="h-full w-full object-cover pointer-events-none" />
                <div className="absolute top-0 left-0 p-2 bg-black bg-opacity-60 text-white text-sm font-semibold rounded-br-lg">Gốc</div>
            </div>
            
            {/* Slider Handle */}
            <div
                className="absolute top-0 h-full w-1.5 bg-white cursor-ew-resize opacity-50 group-hover:opacity-100 transition-opacity"
                style={{ left: `calc(${sliderPosition}% - 3px)` }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
            >
                <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center border border-slate-200">
                    <svg className="w-6 h-6 text-slate-600 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
                </div>
            </div>
        </div>
        <input 
            type="range" 
            min="0" 
            max="100" 
            value={sliderPosition}
            onChange={handleSliderChange}
            className="w-full mt-3 cursor-ew-resize"
            aria-label="Image comparison slider"
        />
    </div>
  );
};

export default ImageComparator;