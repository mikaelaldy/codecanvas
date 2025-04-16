# CodeCanvas

CodeCanvas is an AI-powered code explanation tool that helps developers understand code through clear explanations and visual analogies. Built for the Vercel Next.js Hackathon 2025, CodeCanvas aims to make code comprehension more intuitive and accessible.

## Features

### Completed ✅
- **Modern Landing Page**
  - Responsive design with Tailwind CSS
  - Smooth animations using Framer Motion
  - Dark mode support
  - Clear call-to-action buttons

- **Code Input & Syntax Highlighting**
  - Support for multiple programming languages
  - Real-time syntax highlighting
  - Dark theme optimized code editor
  - Language selection dropdown

- **AI-Powered Explanations**
  - Clear, structured code explanations
  - Real-time streaming responses
  - Section-based formatting
  - Technical and conceptual insights

- **Visual Analogies**
  - Real-world analogies for code concepts
  - Focus on code flow and relationships
  - Easy-to-understand comparisons
  - Non-technical explanations

- **User Interface**
  - Tabbed interface (Code, Explanation, Visual)
  - Dark/Light mode toggle
  - Responsive layout
  - Loading states and error handling

### In Progress 🚧
- Code Examples
  - Similar code patterns
  - Best practices
  - Common use cases
  - Copyable snippets

- Code Analysis
  - Complexity metrics
  - Optimization suggestions
  - Security considerations
  - Performance insights

### Planned Features 📋
- History Feature
  - Save previous explanations
  - Search functionality
  - User preferences

- Sharing Capabilities
  - Shareable URLs
  - Public gallery
  - Social media integration

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Google AI (Gemini)
- **UI Components**: Custom components with Tailwind
- **Code Highlighting**: react-syntax-highlighter
- **Animations**: Framer Motion

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/codecanvas.git
```

2. Install dependencies:
```bash
cd codecanvas
npm install
```

3. Set up environment variables:
```bash
# Create a .env.local file with:
GOOGLE_AI_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
```
codecanvas/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── explain/
│   │   │   └── visual/
│   │   ├── page.tsx (Landing)
│   │   └── explain/
│   │       └── page.tsx
│   └── components/
│       ├── DarkModeToggle.tsx
│       └── TabView.tsx
```

## Next Steps

1. **Code Analysis Implementation**
   - Add complexity analysis
   - Implement security scanning
   - Create optimization suggestions
   - Add performance metrics

2. **Code Examples Feature**
   - Design example database structure
   - Create example collection
   - Implement similarity matching
   - Add copy-to-clipboard functionality

3. **UI/UX Improvements**
   - Add more animations
   - Improve mobile responsiveness
   - Enhance dark mode transitions
   - Add keyboard shortcuts

4. **Performance Optimization**
   - Implement caching
   - Optimize API calls
   - Add request debouncing
   - Improve loading states

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
