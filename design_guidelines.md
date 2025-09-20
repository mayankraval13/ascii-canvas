# ASCII Art Generator Design Guidelines

## Design Approach: Reference-Based (GitHub/CodePen Inspired)
Following the user's explicit visual references to CodePen's clean editor interface and GitHub's file upload areas. This utility-focused application prioritizes clarity, functionality, and familiar patterns over visual experimentation.

## Core Design Elements

### A. Color Palette
**Specified by user - must be strictly followed:**
- Primary: #24292E (dark grey)
- Secondary: #0366D6 (GitHub blue) 
- Background: #FAFBFC (light grey)
- Text: #24292E (dark)
- Accent: #28A745 (success green)
- Border: #E1E4E8 (light border)

### B. Typography
- **ASCII Output**: SF Mono, Consolas, Monaco (monospace fonts essential for ASCII alignment)
- **UI Text**: System fonts following GitHub's approach
- **Hierarchy**: Clear distinction between interface text and ASCII output

### C. Layout System
**Tailwind spacing primitives: 2, 4, 6, 8, 12, 16**
- Consistent 16px padding as specified by user
- Rounded corners throughout interface
- Centered layout with responsive design
- Clear visual hierarchy with generous whitespace

### D. Component Library

**Upload Area:**
- Clean design with dashed border (#E1E4E8)
- Drag-and-drop functionality with visual feedback
- File input integration
- Hover states using GitHub blue (#0366D6)

**ASCII Output Display:**
- Scrollable text area with monospace font
- Dark text on light background for readability
- Border consistent with overall design
- Fixed-width container to maintain ASCII formatting

**Control Buttons:**
- Primary button using GitHub blue (#0366D6)
- Success state using accent green (#28A745)
- Consistent padding and rounded corners
- Clear copy-to-clipboard functionality

**Configuration Options:**
- Simple controls for ASCII density/size
- Minimal interface elements
- Consistent with GitHub's clean form design

### E. Responsive Design
- Mobile-first approach
- Stacked layout on smaller screens
- Maintained ASCII readability across devices
- Touch-friendly button sizing

## Key Design Principles
1. **Functionality First**: Every element serves the core ASCII generation purpose
2. **Familiar Patterns**: Leverage GitHub/CodePen conventions for immediate usability
3. **Monospace Integrity**: Ensure ASCII art displays correctly with proper font selection
4. **Visual Clarity**: High contrast and clear hierarchy for easy scanning
5. **Responsive Utility**: Clean adaptation across screen sizes without compromising function

## No Images Required
This is a utility application focused on user-generated ASCII art output. No hero images or decorative graphics needed - the ASCII art itself becomes the visual centerpiece.