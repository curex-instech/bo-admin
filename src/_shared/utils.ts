import { fireNotification } from '@mymind/banh-mi';
import { isAxiosError } from 'axios';

export async function detectFileType(
  url: string,
): Promise<'pdf' | 'image' | 'unknown'> {
  const byExt = getFileTypeFromUrl(url);
  if (byExt !== 'unknown') return byExt;

  return await getFileTypeFromHeaders(url);
}

function getFileTypeFromUrl(url: string): 'pdf' | 'image' | 'unknown' {
  const lower = url.toLowerCase();

  if (lower.endsWith('.pdf')) return 'pdf';
  if (/\.(jpg|jpeg|png|gif|webp|svg)$/.test(lower)) return 'image';

  return 'unknown';
}

async function getFileTypeFromHeaders(
  url: string,
): Promise<'pdf' | 'image' | 'unknown'> {
  try {
    const res = await fetch(url, { method: 'HEAD' });

    const contentType = res.headers.get('Content-Type') || '';

    if (contentType.includes('application/pdf')) return 'pdf';
    if (contentType.startsWith('image/')) return 'image';

    return 'unknown';
  } catch (err) {
    console.warn('cannot fetch HEAD:', err);
    return 'unknown';
  }
}

export const handleErrorNotification = (error: unknown) => {
  if (isAxiosError(error) && error.response) {
    fireNotification({
      title: '',
      description:
        error.response?.data?.error_code || 'An unexpected error occurred.',
      type: 'error',
      timeout: 3,
    });
  }
};

export const handleSuccessNotification = ({
  title = '',
  description = '',
}: {
  title?: string;
  description?: string;
}): void => {
  fireNotification({
    title,
    description,
    type: 'success',
    timeout: 3,
  });
};
