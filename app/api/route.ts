// ...existing code...
const document = await databases.createDocument(
    databaseId,
    collectionId,
    ID.unique(),
    {
        name: file.name,
        size: file.size,
        bucketField: bucketId,  // Add this required field
        // ...other fields...
    }
);
// ...existing code...
