'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import DarkModeToggle from '@/components/DarkModeToggle';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">CodeCanvas</h1>
            </div>
            <div className="flex items-center space-x-4">
              <DarkModeToggle />
              <Link 
                href="/explain" 
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                Try Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Understand Code Like Never Before
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              CodeCanvas uses AI to explain your code with visual analogies and real-world examples. 
              Make complex code concepts simple and intuitive.
            </p>
            <Link 
              href="/explain"
              className="inline-block px-8 py-4 rounded-lg bg-blue-500 text-white text-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Start Explaining
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-sm"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                AI-Powered Explanations
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get clear, detailed explanations of your code using advanced AI models.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-sm"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Visual Analogies
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Understand complex code through intuitive visual representations and analogies.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-sm"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Code Analysis
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get insights into code complexity, optimizations, and security considerations.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Understand Your Code Better?
            </h2>
            <Link 
              href="/explain"
              className="inline-block px-8 py-4 rounded-lg bg-blue-500 text-white text-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Try CodeCanvas Now
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
