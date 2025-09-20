import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';

interface AsciiOutputProps {
  asciiArt: string;
  isEmpty?: boolean;
}

export default function AsciiOutput({ asciiArt, isEmpty = false }: AsciiOutputProps) {
  if (isEmpty) {
    return (
      <Card className="p-8 text-center">
        <div className="text-muted-foreground">
          <p className="text-lg mb-2">No ASCII art yet</p>
          <p className="text-sm">Upload an image to see the magic happen!</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="p-4 border-b bg-muted/50">
        <h3 className="text-sm font-semibold text-foreground">ASCII Art Output</h3>
      </div>
      <ScrollArea className="h-96">
        <div className="p-4">
          <pre 
            className="font-ascii text-xs leading-tight text-foreground whitespace-pre select-all"
            style={{ fontSize: '10px', lineHeight: '1.1' }}
            data-testid="ascii-output"
          >
            {asciiArt}
          </pre>
        </div>
      </ScrollArea>
    </Card>
  );
}