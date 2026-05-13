import React, { useState, useRef, useLayoutEffect } from 'react';

interface SourceImageViewerProps {
  src: string;
  aspectRatio: string; // '4x6', '3x4', '4x4'
}

const SourceImageViewer: React.FC<SourceImageViewerProps> = ({ src, aspectRatio }) => {
  const [overlayStyle, setOverlayStyle] = useState<React.CSSProperties>({ display: 'none' });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getOverlayAspectRatio = (ratioString: string): number => {
    switch (ratioString) {
      case '3x4':
        return 3 / 4;
      case '4x4':
        return 1;
      case '4x6':
      default:
        return 2 / 3;
    }
  };

  useLayoutEffect(() => {
    const calculateOverlay = () => {
      if (!imageRef.current) return;

      const image = imageRef.current;
      const { clientWidth, clientHeight } = image;
      
      if (clientWidth === 0 || clientHeight === 0) return;

      const overlayAR = getOverlayAspectRatio(aspectRatio);

      let overlayWidth, overlayHeight;
      const imageAR = clientWidth / clientHeight;

      const scaleFactor = 0.9; // Make the guide slightly smaller than the image boundaries

      if (imageAR > overlayAR) {
        overlayHeight = clientHeight * scaleFactor;
        overlayWidth = overlayHeight * overlayAR;
      } else {
        overlayWidth = clientWidth * scaleFactor;
        overlayHeight = overlayWidth / overlayAR;
      }
      
      setOverlayStyle({
        display: 'block',
        width: `${overlayWidth}px`,
        height: `${overlayHeight}px`,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.4)',
      });
    };

    const imageElement = imageRef.current;
    if (imageElement) {
      const observer = new ResizeObserver(calculateOverlay);
      observer.observe(imageElement);

      if (imageElement.complete) {
        calculateOverlay();
      } else {
        imageElement.onload = calculateOverlay;
      }
      
      return () => {
        observer.disconnect();
        imageElement.onload = null;
      };
    }
  }, [src, aspectRatio]);

  return (
    <div ref={containerRef} className="relative w-auto mx-auto inline-block">
      <img
        ref={imageRef}
        src={src}
        alt="Source"
        className="max-h-80 w-auto rounded-lg shadow-sm border block"
      />
      <div 
        className="absolute border-2 border-dashed border-white/80 pointer-events-none rounded-sm"
        style={overlayStyle}
      >
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
          Khung {aspectRatio.replace('x', 'x')} cm
        </div>
      </div>
    </div>
  );
};

export default SourceImageViewer;