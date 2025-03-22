    import { uploadFile } from '../utils/upload';
import { useState } from 'react';

export const FileUploader = () => {
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null);
      const file = event.target.files?.[0];
      if (!file) return;

      await uploadFile({
        bucketField: 'default', // or get this from props/config
        file,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {error && <div className="error">{error}</div>}
    </div>
  );
};
