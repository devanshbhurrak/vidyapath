import { Sparkles } from 'lucide-react';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        
        {/* Brand */}
        <div className="flex items-center gap-3 text-center md:text-left">
          <Sparkles size={28} className="text-blue-500" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              VidyaPath
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Learn. Teach. Grow.
            </p>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 text-gray-700 dark:text-gray-300">
          <a href="https://github.com/devanshbhurrak" target="_blank" rel="noreferrer" className="hover:text-gray-800 dark:hover:text-gray-200">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/devansh-bhurrak" target="_blank" rel="noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400">
            LinkedIn
          </a>
          <a href="https://twitter.com/devanshbhurrak" target="_blank" rel="noreferrer" className="hover:text-blue-400 dark:hover:text-blue-500">
            Twitter
          </a>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-300 dark:border-gray-700 mt-4 py-4 text-center text-gray-600 dark:text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Devansh Bhurrak. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
