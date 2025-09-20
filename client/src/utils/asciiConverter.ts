export interface AsciiOptions {
  width: number;
  characters: string;
}

export function imageToAscii(
  imageFile: File, 
  options: AsciiOptions
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    img.onload = () => {
      // Calculate dimensions while maintaining aspect ratio
      const aspectRatio = img.height / img.width;
      const width = options.width;
      const height = Math.floor(width * aspectRatio * 0.5); // 0.5 to account for character height
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and resize image
      ctx.drawImage(img, 0, 0, width, height);
      
      // Get image data
      const imageData = ctx.getImageData(0, 0, width, height);
      const pixels = imageData.data;
      
      let ascii = '';
      
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const offset = (y * width + x) * 4;
          const r = pixels[offset];
          const g = pixels[offset + 1];
          const b = pixels[offset + 2];
          
          // Convert to grayscale
          const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
          
          // Map grayscale to character
          const charIndex = Math.floor((gray / 255) * (options.characters.length - 1));
          ascii += options.characters[charIndex];
        }
        ascii += '\n';
      }
      
      resolve(ascii);
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    img.src = URL.createObjectURL(imageFile);
  });
}