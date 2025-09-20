import CopyButton from '../CopyButton';

const sampleText = `
  ╔══════════════════════════════════════╗
  ║         ASCII ART GENERATOR          ║
  ╚══════════════════════════════════════╝
  This is sample ASCII art text to copy!
`;

export default function CopyButtonExample() {
  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Active Copy Button</h3>
        <CopyButton text={sampleText} />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Disabled Copy Button</h3>
        <CopyButton text="" disabled={true} />
      </div>
    </div>
  );
}