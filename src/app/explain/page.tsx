'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Link from 'next/link';
import DarkModeToggle from '@/components/DarkModeToggle';
import TabView from '@/components/TabView';

export default function ExplainPage() {
  const [input, setInput] = useState('');
  const [completion, setCompletion] = useState('');
  const [visualAnalogy, setVisualAnalogy] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('javascript');
  const [activeTab, setActiveTab] = useState('code');

  const tabs = [
    {
      id: 'code',
      label: 'Code',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      id: 'explanation',
      label: 'Explanation',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      id: 'visual',
      label: 'Visual',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCompletion('');
    setVisualAnalogy('');
    setIsLoading(true);

    try {
      // First, get the explanation
      const explanationResponse = await fetch('/api/explain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt: input,
          language: language 
        }),
      });

      if (!explanationResponse.ok) {
        throw new Error('Failed to generate explanation');
      }

      const reader = explanationResponse.body?.getReader();
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

      // Then, get the visual analogy
      const visualResponse = await fetch('/api/visual', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt: input,
          language: language 
        }),
      });

      if (!visualResponse.ok) {
        throw new Error('Failed to generate visual analogy');
      }

      const visualData = await visualResponse.json();
      setVisualAnalogy(visualData.analogy);
      
    } catch (error) {
      console.error('Error:', error);
      setCompletion('Error generating explanation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatExplanation = (text: string) => {
    const sections = text.split('\n\n');
    return sections.map((section, index) => {
      if (section.startsWith('**') && section.endsWith('**')) {
        return (
          <h3 key={index} className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
            {section.replace(/\*\*/g, '')}
          </h3>
        );
      } else if (section.startsWith('* ')) {
        return (
          <ul key={index} className="list-disc pl-6 mb-4">
            {section.split('\n').map((item, i) => (
              <li key={i} className="text-gray-700 dark:text-gray-300 mb-1">
                {item.replace('* ', '')}
              </li>
            ))}
          </ul>
        );
      } else {
        return (
          <p key={index} className="text-gray-700 dark:text-gray-300 mb-4">
            {section}
          </p>
        );
      }
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'code':
        return (
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
          </div>
        );
      case 'explanation':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">AI Explanation</h2>
            <div className="p-6 border rounded-lg min-h-[24rem] bg-white dark:bg-gray-800 shadow-sm overflow-auto">
              {isLoading && !completion ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-pulse text-gray-500 dark:text-gray-400">Generating explanation...</div>
                </div>
              ) : completion ? (
                <div className="prose dark:prose-invert max-w-none">
                  {formatExplanation(completion)}
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
        );
      case 'visual':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Visual Analogy</h2>
            <div className="p-6 border rounded-lg min-h-[24rem] bg-white dark:bg-gray-800 shadow-sm">
              {isLoading && !visualAnalogy ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-pulse text-gray-500 dark:text-gray-400">Generating visual analogy...</div>
                </div>
              ) : visualAnalogy ? (
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300">{visualAnalogy}</p>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    Your visual analogy will appear here...<br />
                    Try pasting some code and clicking &quot;Generate Explanation&quot;
                  </p>
                </div>
              )}
            </div>
          </div>
        );
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
        <div className="max-w-7xl mx-auto space-y-6">
          <form onSubmit={handleSubmit}>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300 font-medium"
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? 'Analyzing...' : 'Analyze Code'}
            </button>
          </form>

          <TabView
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <div className="mt-6">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
} 