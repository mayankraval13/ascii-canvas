import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';

interface AsciiControlsProps {
  width: number;
  onWidthChange: (width: number) => void;
  characters: string;
  onCharactersChange: (characters: string) => void;
  disabled?: boolean;
}

const characterSets = {
  standard: " .:-=+*#%@",
  simple: " .',;:clodxkO0KXNWM",
  blocks: " ░▒▓█",
  minimal: " .oO"
};

export default function AsciiControls({ 
  width, 
  onWidthChange, 
  characters, 
  onCharactersChange,
  disabled = false
}: AsciiControlsProps) {
  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">ASCII Settings</h3>
        <p className="text-sm text-muted-foreground">
          Adjust the output to match your preferences
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label htmlFor="width-slider" className="text-sm font-medium">
              Output Width
            </Label>
            <span className="text-sm text-muted-foreground">{width} characters</span>
          </div>
          <Slider
            id="width-slider"
            min={40}
            max={200}
            step={10}
            value={[width]}
            onValueChange={(value) => onWidthChange(value[0])}
            disabled={disabled}
            data-testid="slider-width"
          />
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">Character Set</Label>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(characterSets).map(([name, chars]) => (
              <button
                key={name}
                onClick={() => onCharactersChange(chars)}
                disabled={disabled}
                className={`
                  p-3 text-left rounded-md border transition-colors
                  hover-elevate text-xs
                  ${characters === chars 
                    ? 'border-primary bg-primary/10 text-primary' 
                    : 'border-border bg-card text-card-foreground'
                  }
                  ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
                data-testid={`button-charset-${name}`}
              >
                <div className="font-medium capitalize mb-1">{name}</div>
                <div className="font-ascii text-muted-foreground overflow-hidden">
                  {chars}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}