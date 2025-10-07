import { Image } from 'antd';
import { useEffect, useState } from 'react';
import { detectFileType } from '../utils';
import PdfViewer from './pdf-viewer';

interface FileViewerProps {
  url: string;
}

const FileViewer: React.FC<FileViewerProps> = ({ url }) => {
  const [type, setType] = useState<'pdf' | 'image' | 'unknown'>('unknown');

  useEffect(() => {
    detectFileType(url).then(setType);
  }, [url]);

  if (type === 'pdf') {
    return (
      <div className="flex flex-col gap-2 h-full">
        <PdfViewer url={url} />
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="!text-muted-foreground text-right"
        >
          View in new tab
        </a>
      </div>
    );
  }

  if (type === 'image') {
    return (
      <Image src={url} preview={false} alt="Curex" className="object-contain" />
    );
  }

  return null;
};

export default FileViewer;
