import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import HomePage from './components/HomePage';
import { mathChapters } from './data/mathChapters';
import { Chapter, MathTopic } from './types/MathTopic';

// Declare global MathJax types
declare global {
  interface Window {
    MathJax: {
      typesetPromise: () => Promise<void>;
      typeset: (elements?: HTMLElement[]) => void;
      startup: {
        promise: Promise<void>;
      };
    };
  }
}

function App() {
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<MathTopic | null>(null);
  const [activeSection, setActiveSection] = useState<'theory' | 'flashcards' | 'examples' | 'quiz' | 'homework'>('theory');

  // Function to re-render MathJax
  const renderMathJax = () => {
    if (window.MathJax) {
      // Use a timeout to ensure DOM is updated
      setTimeout(() => {
        if (window.MathJax.typesetPromise) {
          window.MathJax.typesetPromise().catch((err) => {
            console.warn('MathJax typeset error:', err);
          });
        } else if (window.MathJax.typeset) {
          try {
            window.MathJax.typeset();
          } catch (err) {
            console.warn('MathJax typeset error:', err);
          }
        }
      }, 100);
    }
  };

  // Re-render MathJax when content changes
  useEffect(() => {
    if (window.MathJax && window.MathJax.startup) {
      window.MathJax.startup.promise.then(() => {
        renderMathJax();
      }).catch((err) => {
        console.warn('MathJax startup error:', err);
      });
    } else {
      // Fallback: try to render after a delay
      setTimeout(renderMathJax, 500);
    }
  }, [selectedTopic, activeSection]);

  const handleTopicSelect = (chapter: Chapter, topic: MathTopic) => {
    setSelectedChapter(chapter);
    setSelectedTopic(topic);
    setActiveSection('theory');
  };

  const handleHomeSelect = () => {
    setSelectedChapter(null);
    setSelectedTopic(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex">
        <Sidebar 
          chapters={mathChapters}
          selectedChapter={selectedChapter}
          selectedTopic={selectedTopic}
          onTopicSelect={handleTopicSelect}
          onHomeSelect={handleHomeSelect}
        />
        {selectedTopic ? (
          <MainContent 
            topic={selectedTopic}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            onMathJaxRender={renderMathJax}
          />
        ) : (
          <div className="flex-1">
            <HomePage />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;