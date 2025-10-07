'use client';
import type React from 'react';

interface PdfViewerProps {
  url: string;
  className?: string;
  height?: string | number;
}

const PdfViewer: React.FC<PdfViewerProps> = ({
  url,
  className,
  height = '100%',
}) => {
  if (!url) {
    return (
      <div className="flex items-center justify-center text-gray-500 h-[200px]">
        Failed to open PDF file
      </div>
    );
  }

  return (
    <iframe
      src={url}
      className={className}
      style={{
        width: '100%',
        height,
        border: 'none',
      }}
      title="PDF Viewer"
    />
  );
};

export default PdfViewer;
