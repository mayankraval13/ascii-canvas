import { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';
import AsciiOutput from '@/components/AsciiOutput';
import CopyButton from '@/components/CopyButton';
import AsciiControls from '@/components/AsciiControls';
import ThemeToggle from '@/components/ThemeToggle';
import { imageToAscii } from '@/utils/asciiConverter';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const [asciiArt, setAsciiArt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [width, setWidth] = useState(80);
  const [characters, setCharacters] = useState(" .:-=+*#%@");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleImageUpload = async (file: File) => {
    setSelectedFile(file);
    setIsProcessing(true);
    
    try {
      const ascii = await imageToAscii(file, { width, characters });
      setAsciiArt(ascii);
      toast({
        title: "Success!",
        description: "Your image has been converted to ASCII art.",
      });
    } catch (error) {
      console.error('ASCII conversion failed:', error);
      toast({
        title: "Conversion failed",
        description: "Please try with a different image.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImageRemove = () => {
    setSelectedFile(null);
    setAsciiArt('');
  };

  const handleSettingsChange = async (newWidth: number, newCharacters: string) => {
    if (selectedFile && !isProcessing) {
      setIsProcessing(true);
      try {
        const ascii = await imageToAscii(selectedFile, { width: newWidth, characters: newCharacters });
        setAsciiArt(ascii);
      } catch (error) {
        console.error('Re-conversion failed:', error);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth);
    handleSettingsChange(newWidth, characters);
  };

  const handleCharactersChange = (newCharacters: string) => {
    setCharacters(newCharacters);
    handleSettingsChange(width, newCharacters);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="relative text-center mb-12">
          <div className="absolute top-0 right-0">
            <ThemeToggle />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            ASCII Art Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your images into beautiful text-based ASCII art. 
            Upload any image and watch it come to life as characters.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Upload & Controls */}
          <div className="space-y-6">
            <ImageUpload 
              onImageUpload={handleImageUpload}
              onImageRemove={handleImageRemove}
              selectedFile={selectedFile}
              isProcessing={isProcessing}
            />
            
            <AsciiControls
              width={width}
              onWidthChange={handleWidthChange}
              characters={characters}
              onCharactersChange={handleCharactersChange}
              disabled={isProcessing}
            />
          </div>

          {/* Right Column - Output */}
          <div className="lg:col-span-2 space-y-4">
            <AsciiOutput 
              asciiArt={asciiArt} 
              isEmpty={!asciiArt && !isProcessing}
            />
            
            {asciiArt && (
              <div className="flex justify-end">
                <CopyButton text={asciiArt} />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            Built with modern web technologies for instant ASCII art generation
          </p>
        </div>
      </div>
    </div>
  );
}