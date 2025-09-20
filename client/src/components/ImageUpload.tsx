import { useCallback, useState, useEffect } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  onImageRemove?: () => void;
  selectedFile?: File | null;
  isProcessing?: boolean;
}

export default function ImageUpload({ 
  onImageUpload, 
  onImageRemove, 
  selectedFile, 
  isProcessing = false 
}: ImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      onImageUpload(imageFile);
    }
  }, [onImageUpload]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  }, [onImageUpload]);

  const handleClick = useCallback(() => {
    if (!isProcessing && !selectedFile) {
      document.getElementById('file-input')?.click();
    }
  }, [isProcessing, selectedFile]);

  const handleRemove = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    onImageRemove?.();
    
    // Clear the file input
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }, [previewUrl, onImageRemove]);

  // Create preview URL when file is selected
  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);
    }
  }, [selectedFile]);

  // Show image preview if file is selected
  if (selectedFile && previewUrl) {
    return (
      <Card className="relative overflow-hidden border-2 border-solid border-border">
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 rounded-full w-8 h-8 shadow-md z-20"
          onClick={handleRemove}
          data-testid="button-remove-image"
        >
          <X className="w-4 h-4" />
        </Button>
        <div className="relative">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-48 object-cover"
            data-testid="image-preview"
          />
          {isProcessing && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="animate-spin">
                <ImageIcon className="w-8 h-8 text-white" />
              </div>
            </div>
          )}
        </div>
        <div className="p-4 border-t bg-muted/50">
          <div className="text-sm">
            <p className="font-medium text-foreground">{selectedFile.name}</p>
            <p className="text-muted-foreground">
              {Math.round(selectedFile.size / 1024)} KB
            </p>
          </div>
        </div>
      </Card>
    );
  }

  // Show upload area if no file is selected
  return (
    <Card 
      className={`
        relative overflow-hidden border-2 border-dashed cursor-pointer
        transition-all duration-200 hover-elevate
        ${isDragOver ? 'border-primary bg-primary/5' : 'border-border'}
        ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
      data-testid="image-upload-area"
    >
      <div className="p-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className={`
            p-4 rounded-full transition-colors
            ${isDragOver ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
          `}>
            {isProcessing ? (
              <div className="animate-spin">
                <ImageIcon className="w-8 h-8" />
              </div>
            ) : (
              <Upload className="w-8 h-8" />
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              {isProcessing ? 'Processing...' : 'Upload an image'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isProcessing 
                ? 'Converting your image to ASCII art'
                : 'Drag and drop an image here, or click to browse'
              }
            </p>
            <p className="text-xs text-muted-foreground">
              Supports JPG, PNG, GIF formats
            </p>
          </div>
        </div>
      </div>
      
      <input
        id="file-input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileInput}
        disabled={isProcessing}
        data-testid="file-input"
      />
    </Card>
  );
}