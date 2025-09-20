import AsciiControls from '../AsciiControls';
import { useState } from 'react';

export default function AsciiControlsExample() {
  const [width, setWidth] = useState(80);
  const [characters, setCharacters] = useState(" .:-=+*#%@");

  return (
    <div className="max-w-md mx-auto space-y-4">
      <AsciiControls
        width={width}
        onWidthChange={setWidth}
        characters={characters}
        onCharactersChange={setCharacters}
      />
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Current Settings:</h3>
        <p className="text-xs text-muted-foreground">Width: {width}</p>
        <p className="text-xs text-muted-foreground">Characters: "{characters}"</p>
      </div>
    </div>
  );
}