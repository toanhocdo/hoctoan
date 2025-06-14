import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Zap } from 'lucide-react';
import { FlashCard } from '../types/MathTopic';

interface FlashcardsSectionProps {
  flashcards: FlashCard[];
  onMathJaxRender: () => void;
}

const FlashcardsSection: React.FC<FlashcardsSectionProps> = ({ flashcards, onMathJaxRender }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    onMathJaxRender();
  }, [currentCard, isFlipped, onMathJaxRender]);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
    setIsFlipped(false);
    setTimeout(onMathJaxRender, 100);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setIsFlipped(false);
    setTimeout(onMathJaxRender, 100);
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
    setTimeout(onMathJaxRender, 100);
  };

  const resetCards = () => {
    setCurrentCard(0);
    setIsFlipped(false);
    setTimeout(onMathJaxRender, 100);
  };

  // Lấy index của 3 card: prev, current, next
  const getCardIndexes = () => {
    const len = flashcards.length;
    const prev = (currentCard - 1 + len) % len;
    const next = (currentCard + 1) % len;
    return [prev, currentCard, next];
  };

  if (flashcards.length === 0) {
    return (
      <div className="text-center py-12">
        <Zap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Chưa có flashcards cho bài học này.</p>
      </div>
    );
  }

  // Card component dùng chung cho 3 card
  const Card = ({
    card,
    flipped,
    onClick,
    isCenter,
  }: {
    card: FlashCard;
    flipped: boolean;
    onClick?: () => void;
    isCenter?: boolean;
  }) => (
    <div
      className={`
        relative
        w-60 h-72
        sm:w-64 sm:h-80
        lg:w-72 lg:h-96
        mx-1 sm:mx-2 flex-shrink-0
        cursor-pointer
        transition-transform duration-[1200ms] ease-in-out
        transform-style-preserve-3d
        ${flipped ? 'rotate-y-180' : ''}
        ${isCenter ? 'z-20 scale-105' : 'z-10 scale-95 opacity-80 pointer-events-none'}
        shadow-xl
      `}
      onClick={onClick}
      style={{ perspective: 1200 }}
    >
      {/* Front */}
      <div className="absolute inset-0 w-full h-full backface-hidden transition-colors duration-500">
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-2xl p-4 sm:p-6 h-full flex flex-col justify-center text-white">
          <div className="text-center">
            <div className="text-xs sm:text-sm font-medium text-purple-200 mb-2 sm:mb-4">CÂU HỎI</div>
            <div className="text-base sm:text-xl font-semibold leading-relaxed mb-4 sm:mb-6">
              {card.question}
            </div>
            <div className="text-xs sm:text-sm text-purple-200 flex items-center justify-center space-x-2">
              <RotateCcw className="w-4 h-4" />
              <span>Nhấp để xem đáp án</span>
            </div>
          </div>
        </div>
      </div>
      {/* Back */}
      <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 transition-colors duration-500">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-2xl p-4 sm:p-6 h-full flex flex-col justify-center text-white">
          <div className="text-center">
            <div className="text-xs sm:text-sm font-medium text-emerald-200 mb-2 sm:mb-4">ĐÁP ÁN</div>
            <div className="text-base sm:text-xl font-semibold leading-relaxed mb-4 sm:mb-6">
              {card.answer}
            </div>
            <div className="text-xs sm:text-sm text-emerald-200 flex items-center justify-center space-x-2">
              <RotateCcw className="w-4 h-4" />
              <span>Nhấp để xem câu hỏi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Zap className="w-8 h-8 text-purple-500" />
          <h2 className="text-2xl font-bold text-gray-900">Flashcards</h2>
        </div>
        <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {currentCard + 1} / {flashcards.length}
        </div>
      </div>

      {/* 3-card carousel: 1 card trên mobile, 3 card trên laptop/tablet */}
      <div className="relative w-full overflow-x-auto">
        <div
          className="
            flex items-center justify-center
            transition-transform duration-500
            -mx-1 sm:-mx-2
          "
        >
          {getCardIndexes().map((idx, i) => (
            <div
              key={idx}
              className={`
                ${i === 1 ? '' : 'hidden lg:block'}
              `}
              // Ẩn card hai bên trên mobile/tablet, chỉ hiện trên laptop (lg)
            >
              <Card
                card={flashcards[idx]}
                flipped={i === 1 ? isFlipped : false}
                onClick={i === 1 ? flipCard : undefined}
                isCenter={i === 1}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={prevCard}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 disabled:opacity-50"
          disabled={flashcards.length <= 1}
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-medium">Trước</span>
        </button>

        <button
          onClick={resetCards}
          className="flex items-center space-x-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <RotateCcw className="w-5 h-5" />
          <span className="font-medium">Bắt đầu lại</span>
        </button>

        <button
          onClick={nextCard}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 disabled:opacity-50"
          disabled={flashcards.length <= 1}
        >
          <span className="font-medium">Sau</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default FlashcardsSection;