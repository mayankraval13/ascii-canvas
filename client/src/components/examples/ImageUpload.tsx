import ImageUpload from '../ImageUpload';
import { useState } from 'react';

export default function ImageUploadExample() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageUpload = (file: File) => {
    console.log('Image uploaded:', file.name);
    setSelectedFile(file);
  };

  const handleImageRemove = () => {
    console.log('Image removed');
    setSelectedFile(null);
  };

  return (
    <div className="max-w-md mx-auto">
      <ImageUpload 
        onImageUpload={handleImageUpload}
        onImageRemove={handleImageRemove}
        selectedFile={selectedFile}
      />
    </div>
  );
}