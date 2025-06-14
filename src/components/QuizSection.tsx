import React, { useState, useEffect } from 'react';
import { Brain, Check, X, RotateCcw, Trophy, CheckCircle, XCircle, Edit3 } from 'lucide-react';
import { QuizQuestion, TrueFalseQuestion, ShortAnswerQuestion } from '../types/MathTopic';

interface QuizSectionProps {
  questions: QuizQuestion[];
  trueFalseQuestions: TrueFalseQuestion[];
  shortAnswerQuestions: ShortAnswerQuestion[];
  onMathJaxRender: () => void;
}

const QuizSection: React.FC<QuizSectionProps> = ({ 
  questions, 
  trueFalseQuestions, 
  shortAnswerQuestions,
  onMathJaxRender
}) => {
  const [quizType, setQuizType] = useState<'multiple' | 'trueFalse' | 'shortAnswer'>('multiple');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Re-render MathJax when quiz state changes
  useEffect(() => {
    onMathJaxRender();
  }, [currentQuestion, showResults, quizType, onMathJaxRender]);

  const getCurrentQuestions = () => {
    switch (quizType) {
      case 'multiple': return questions;
      case 'trueFalse': return trueFalseQuestions;
      case 'shortAnswer': return shortAnswerQuestions;
      default: return questions;
    }
  };

  const currentQuestions = getCurrentQuestions();

  const handleAnswerSelect = (answer: any) => {
    if (showResults) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answer;
    setSelectedAnswers(newAnswers);
    
    // Re-render MathJax after state update
    setTimeout(onMathJaxRender, 50);
  };

  const nextQuestion = () => {
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowResults(false);
    } else {
      setQuizCompleted(true);
      setShowResults(true);
    }
  };

  const showAnswer = () => {
    setShowResults(true);
    // Re-render MathJax when showing results
    setTimeout(onMathJaxRender, 100);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizCompleted(false);
  };

  const switchQuizType = (type: 'multiple' | 'trueFalse' | 'shortAnswer') => {
    setQuizType(type);
    resetQuiz();
  };

  const calculateScore = () => {
    let correct = 0;
    currentQuestions.forEach((question, index) => {
      const userAnswer = selectedAnswers[index];
      if (quizType === 'multiple') {
        if (userAnswer === (question as QuizQuestion).correctAnswer) correct++;
      } else if (quizType === 'trueFalse') {
        const tfQuestion = question as TrueFalseQuestion;
        if (userAnswer && userAnswer.every((answer: boolean, i: number) => 
          answer === tfQuestion.statements[i].isTrue)) correct++;
      } else if (quizType === 'shortAnswer') {
        const saQuestion = question as ShortAnswerQuestion;
        if (userAnswer && userAnswer.toLowerCase().trim() === saQuestion.correctAnswer.toLowerCase().trim()) {
          correct++;
        }
      }
    });
    return correct;
  };

  if (currentQuestions.length === 0) {
    return (
      <div className="text-center py-12">
        <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Chưa có câu hỏi cho loại bài tập này.</p>
      </div>
    );
  }

  if (quizCompleted) {
    const score = calculateScore();
    const percentage = Math.round((score / currentQuestions.length) * 100);
    
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Hoàn thành!</h2>
          <div className="text-6xl font-bold text-orange-500 mb-4">{percentage}%</div>
          <p className="text-xl text-gray-700 mb-6">
            Bạn đã trả lời đúng {score}/{currentQuestions.length} câu
          </p>
          <button
            onClick={resetQuiz}
            className="flex items-center space-x-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors duration-200 mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Làm lại</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Quiz Type Selector */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Brain className="w-8 h-8 text-orange-500" />
          <h2 className="text-2xl font-bold text-gray-900">Bài tập</h2>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => switchQuizType('multiple')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              quizType === 'multiple' 
                ? 'bg-orange-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-orange-100'
            }`}
          >
            Trắc nghiệm
          </button>
          <button
            onClick={() => switchQuizType('trueFalse')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              quizType === 'trueFalse' 
                ? 'bg-orange-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-orange-100'
            }`}
          >
            Đúng/Sai
          </button>
          <button
            onClick={() => switchQuizType('shortAnswer')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              quizType === 'shortAnswer' 
                ? 'bg-orange-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-orange-100'
            }`}
          >
            Trả lời ngắn
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-500 mb-4 text-center">
        Câu {currentQuestion + 1} / {currentQuestions.length}
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        {quizType === 'multiple' && (
          <MultipleChoiceQuestion 
            question={currentQuestions[currentQuestion] as QuizQuestion}
            selectedAnswer={selectedAnswers[currentQuestion]}
            showResults={showResults}
            onAnswerSelect={handleAnswerSelect}
            onMathJaxRender={onMathJaxRender}
          />
        )}

        {quizType === 'trueFalse' && (
          <TrueFalseQuestionComponent
            question={currentQuestions[currentQuestion] as TrueFalseQuestion}
            selectedAnswers={selectedAnswers[currentQuestion]}
            showResults={showResults}
            onAnswerSelect={handleAnswerSelect}
            onMathJaxRender={onMathJaxRender}
          />
        )}

        {quizType === 'shortAnswer' && (
          <ShortAnswerQuestionComponent
            question={currentQuestions[currentQuestion] as ShortAnswerQuestion}
            selectedAnswer={selectedAnswers[currentQuestion]}
            showResults={showResults}
            onAnswerSelect={handleAnswerSelect}
            onMathJaxRender={onMathJaxRender}
          />
        )}

        <div className="flex justify-between mt-8">
          {!showResults && selectedAnswers[currentQuestion] !== undefined ? (
            <button
              onClick={showAnswer}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200"
            >
              Kiểm tra đáp án
            </button>
          ) : (
            <div></div>
          )}

          {showResults && (
            <button
              onClick={nextQuestion}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors duration-200"
            >
              {currentQuestion < currentQuestions.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Multiple Choice Component
const MultipleChoiceQuestion: React.FC<{
  question: QuizQuestion;
  selectedAnswer: number;
  showResults: boolean;
  onAnswerSelect: (answer: number) => void;
  onMathJaxRender: () => void;
}> = ({ question, selectedAnswer, showResults, onAnswerSelect, onMathJaxRender }) => {
  
  const handleAnswerClick = (index: number) => {
    onAnswerSelect(index);
    setTimeout(onMathJaxRender, 50);
  };

  return (
    <>
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        {question.question}
      </h3>

      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => {
          let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ";
          
          if (showResults) {
            if (index === question.correctAnswer) {
              buttonClass += "bg-green-50 border-green-500 text-green-800";
            } else if (index === selectedAnswer && index !== question.correctAnswer) {
              buttonClass += "bg-red-50 border-red-500 text-red-800";
            } else {
              buttonClass += "bg-gray-50 border-gray-200 text-gray-600";
            }
          } else {
            if (index === selectedAnswer) {
              buttonClass += "bg-orange-50 border-orange-500 text-orange-800";
            } else {
              buttonClass += "bg-gray-50 border-gray-200 text-gray-700 hover:bg-orange-50 hover:border-orange-300";
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
              className={buttonClass}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showResults && (
                  <div>
                    {index === question.correctAnswer && (
                      <Check className="w-6 h-6 text-green-600" />
                    )}
                    {index === selectedAnswer && index !== question.correctAnswer && (
                      <X className="w-6 h-6 text-red-600" />
                    )}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {showResults && (
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">Giải thích:</h4>
          <p className="text-blue-700">{question.explanation}</p>
        </div>
      )}
    </>
  );
};

// True/False Component
const TrueFalseQuestionComponent: React.FC<{
  question: TrueFalseQuestion;
  selectedAnswers: boolean[];
  showResults: boolean;
  onAnswerSelect: (answers: boolean[]) => void;
  onMathJaxRender: () => void;
}> = ({ question, selectedAnswers = [], showResults, onAnswerSelect, onMathJaxRender }) => {
  const handleStatementAnswer = (index: number, answer: boolean) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[index] = answer;
    onAnswerSelect(newAnswers);
    setTimeout(onMathJaxRender, 50);
  };

  return (
    <>
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        {question.question}
      </h3>

      <div className="space-y-4 mb-6">
        {question.statements.map((statement, index) => (
          <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <p className="text-gray-800 mb-3">{statement.text}</p>
            <div className="flex space-x-3">
              <button
                onClick={() => handleStatementAnswer(index, true)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  selectedAnswers[index] === true
                    ? showResults
                      ? statement.isTrue
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-blue-500 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {showResults && selectedAnswers[index] === true && (
                  statement.isTrue ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />
                )}
                <span>Đúng</span>
              </button>
              <button
                onClick={() => handleStatementAnswer(index, false)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  selectedAnswers[index] === false
                    ? showResults
                      ? !statement.isTrue
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-blue-500 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {showResults && selectedAnswers[index] === false && (
                  !statement.isTrue ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />
                )}
                <span>Sai</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {showResults && (
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">Giải thích:</h4>
          <p className="text-blue-700">{question.explanation}</p>
        </div>
      )}
    </>
  );
};

// Short Answer Component
const ShortAnswerQuestionComponent: React.FC<{
  question: ShortAnswerQuestion;
  selectedAnswer: string;
  showResults: boolean;
  onAnswerSelect: (answer: string) => void;
  onMathJaxRender: () => void;
}> = ({ question, selectedAnswer = '', showResults, onAnswerSelect, onMathJaxRender }) => {
  
  const handleInputChange = (value: string) => {
    onAnswerSelect(value);
    setTimeout(onMathJaxRender, 50);
  };

  return (
    <>
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        {question.question}
      </h3>

      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-3">
          <Edit3 className="w-5 h-5 text-gray-500" />
          <label className="text-sm font-medium text-gray-700">Nhập đáp án của bạn:</label>
        </div>
        <input
          type="text"
          value={selectedAnswer}
          onChange={(e) => handleInputChange(e.target.value)}
          disabled={showResults}
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors duration-200"
          placeholder="Nhập đáp án..."
        />
        {question.hint && !showResults && (
          <p className="text-sm text-gray-500 mt-2">💡 Gợi ý: {question.hint}</p>
        )}
      </div>

      {showResults && (
        <div className="space-y-4">
          <div className={`p-4 rounded-xl border-2 ${
            selectedAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim()
              ? 'bg-green-50 border-green-500'
              : 'bg-red-50 border-red-500'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              {selectedAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim() ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
              <span className="font-semibold">
                {selectedAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim() 
                  ? 'Chính xác!' 
                  : 'Chưa đúng'}
              </span>
            </div>
            <p className="text-sm">Đáp án đúng: <strong>{question.correctAnswer}</strong></p>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">Giải thích:</h4>
            <p className="text-blue-700">{question.explanation}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizSection;