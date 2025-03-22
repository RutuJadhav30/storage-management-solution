import { Document } from "../types/document";

export async function uploadFile(file: File, document: Document) {
  if (!document.bucketField) {
    throw new Error(
      'Invalid document structure: Missing required attribute "bucketField"'
    );
  }

  try {
    // ...existing code...
    const uploadData = {
      file,
      bucketField: document.bucketField,
      // ...other fields...
    };

    return await fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify(uploadData),
    });
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
}
