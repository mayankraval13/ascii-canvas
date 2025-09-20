import AsciiOutput from '../AsciiOutput';

const sampleAsciiArt = `                    .-.    
                   /  |    
                  /   |    
                 /    |    
                /     |    
               /      |    
              /       |    
             /        |    
            /         |    
           /          |    
          /           |    
         /            |    
        /             |    
       /              |    
      /               |    
     /                |    
    /                 |    
   /                  |    
  /                   |    
 /                    |    
/_____________________|____`;

export default function AsciiOutputExample() {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <AsciiOutput asciiArt={sampleAsciiArt} />
      <AsciiOutput asciiArt="" isEmpty={true} />
    </div>
  );
}