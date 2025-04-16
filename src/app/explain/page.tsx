'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Link from 'next/link';
import DarkModeToggle from '@/components/DarkModeToggle';

export default function ExplainPage() {
  const [input, setInput] = useState('');
  const [completion, setCompletion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('javascript');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCompletion('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt: input,
          language: language 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate explanation');
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No reader available');
      }

      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const text = decoder.decode(value);
        setCompletion(prev => prev + text);
      }
    } catch (error) {
      console.error('Error:', error);
      setCompletion('Error generating explanation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">CodeCanvas</h1>
            </Link>
            <div className="flex items-center space-x-4">
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Code Input Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Your Code</h2>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-3 py-1 border rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  disabled={isLoading}
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="typescript">TypeScript</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                </select>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <SyntaxHighlighter
                    language={language}
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      padding: '1rem',
                      height: '24rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                    }}
                    showLineNumbers
                  >
                    {input || '// Paste your code here...'}
                  </SyntaxHighlighter>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-text"
                    placeholder="Paste your code here..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300 font-medium"
                  disabled={isLoading || !input.trim()}
                >
                  {isLoading ? 'Generating...' : 'Generate Explanation'}
                </button>
              </form>
            </div>

            {/* Explanation Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">AI Explanation</h2>
              <div className="p-6 border rounded-lg min-h-[24rem] bg-white dark:bg-gray-800 shadow-sm">
                {isLoading && !completion ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-pulse text-gray-500 dark:text-gray-400">Generating explanation...</div>
                  </div>
                ) : completion ? (
                  <div className="prose dark:prose-invert max-w-none">
                    {completion.split('\n').map((line, i) => (
                      <p key={i} className="mb-2">{line}</p>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500 dark:text-gray-400 text-center">
                      Your explanation will appear here...<br />
                      Try pasting some code and clicking &quot;Generate Explanation&quot;
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 