'use client';

import React, { useState, MouseEvent } from 'react';
import Image, { StaticImageData } from 'next/image';

type CustomZoomableImageProps = {
  src: string | StaticImageData;
  alt: string;
  thumbWidth: number;
  thumbHeight: number;
  zoomWidth?: number;
  zoomHeight?: number;
};

const ImageZoom: React.FC<CustomZoomableImageProps> = ({
  src,
  alt,
  thumbWidth,
  thumbHeight,
  zoomWidth = 1200,
  zoomHeight = 800,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const openZoom = () => setIsZoomed(true);
  const closeZoom = () => setIsZoomed(false);

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeZoom();
    }
  };

  return (
    <React.Fragment>
      <div className="relative cursor-zoom-in inline-block" onClick={openZoom}>
        <Image
          alt={alt}
          src={src}
          width={thumbWidth}
          height={thumbHeight}
          className="w-full h-auto object-cover rounded-lg min-h-[222px] min-w-[200px]"
        />
      </div>
      {isZoomed && (
        <div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/75 p-4"
          onClick={handleOverlayClick}
        >
          <button
            type="button"
            onClick={closeZoom}
            className="absolute right-4 top-4 text-white text-2xl leading-none "
            aria-label="Fechar"
          >
            ×
          </button>

          <div className="relative max-h-[90vh] max-w-[90vw] cursor-zoom-out">
            <Image
              alt={alt}
              src={src}
              width={zoomWidth}
              height={zoomHeight}
              className="h-auto w-auto max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg "
              onClick={closeZoom}
            />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ImageZoom;
