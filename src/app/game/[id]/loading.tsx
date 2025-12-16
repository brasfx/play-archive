'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Loading() {
  return (
    <div className="flex align-middle justify-center">
      <DotLottieReact
        src="https://lottie.host/4ec06082-972c-406a-95f7-a8bacdc304fd/3HD8JEeXs0.lottie"
        loop
        autoplay
      />
    </div>
  );
}
