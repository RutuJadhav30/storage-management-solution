interface UploadDocument {
  bucketField: string;
  file: File;
  metadata?: Record<string, unknown>;
}

export const validateDocument = (doc: Partial<UploadDocument>): doc is UploadDocument => {
  if (!doc.bucketField) {
    throw new Error('Invalid document structure: Missing required attribute "bucketField"');
  }
  if (!doc.file) {
    throw new Error('Invalid document structure: Missing required attribute "file"');
  }
  return true;
};

export const uploadFile = async (document: UploadDocument) => {
  try {
    validateDocument(document);
    
    const formData = new FormData();
    formData.append('bucketField', document.bucketField);
    formData.append('file', document.file);
    
    if (document.metadata) {
      formData.append('metadata', JSON.stringify(document.metadata));
    }

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};
