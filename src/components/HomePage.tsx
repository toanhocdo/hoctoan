import React from 'react';
import { BookOpen, Calculator, TrendingUp, Shapes, Box, BarChart3 } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Toán học lớp 8
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Khám phá thế giới toán học qua các bài học tương tác, flashcard thông minh và bài tập đa dạng
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-lg font-semibold">8 Chương học</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-lg font-semibold">Flashcard tương tác</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-lg font-semibold">Bài tập đa dạng</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Math Elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <div className="text-6xl font-bold transform rotate-12">∫</div>
        </div>
        <div className="absolute top-32 right-20 opacity-20">
          <div className="text-4xl font-bold transform -rotate-12">π</div>
        </div>
        <div className="absolute bottom-20 left-1/4 opacity-20">
          <div className="text-5xl font-bold">∑</div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Tính năng nổi bật
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Lý thuyết chi tiết</h3>
            <p className="text-gray-600 leading-relaxed">
              Các khái niệm được giải thích rõ ràng với công thức LaTeX và ví dụ minh họa sinh động
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Flashcard thông minh</h3>
            <p className="text-gray-600 leading-relaxed">
              Hệ thống flashcard lật 3D giúp ghi nhớ công thức và khái niệm một cách hiệu quả
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Bài tập đa dạng</h3>
            <p className="text-gray-600 leading-relaxed">
              Trắc nghiệm, đúng-sai, trả lời ngắn và bài tập tự luận với khả năng upload hình ảnh
            </p>
          </div>
        </div>
      </div>

      {/* Math Concepts Visualization */}
      <div className="bg-gradient-to-r from-indigo-100 to-purple-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Khám phá các chủ đề toán học
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Polynomial Visualization */}
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">f(x)</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Đa thức</h3>
              <p className="text-gray-600 text-sm">Phân thức đại số và các phép toán</p>
              <div className="mt-4 h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                <span className="text-blue-800 font-mono">ax² + bx + c</span>
              </div>
            </div>

            {/* 3D Shapes */}
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Box className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Hình đa diện</h3>
              <p className="text-gray-600 text-sm">Lăng trụ, hình chóp và thể tích</p>
              <div className="mt-4 h-16 bg-gradient-to-r from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                <Shapes className="w-8 h-8 text-green-800" />
              </div>
            </div>

            {/* Linear Functions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Hàm số bậc nhất</h3>
              <p className="text-gray-600 text-sm">Đồ thị và ứng dụng thực tế</p>
              <div className="mt-4 h-16 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
                <span className="text-purple-800 font-mono">y = ax + b</span>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Thống kê</h3>
              <p className="text-gray-600 text-sm">Thu thập và xử lý dữ liệu</p>
              <div className="mt-4 h-16 bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-orange-800" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-6">
            Bắt đầu hành trình học toán ngay hôm nay!
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Chọn chương học từ menu bên trái để khám phá thế giới toán học đầy thú vị
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-8 py-4">
              <div className="text-2xl font-bold text-white">100+</div>
              <div className="text-blue-100">Bài tập</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-8 py-4">
              <div className="text-2xl font-bold text-white">50+</div>
              <div className="text-blue-100">Flashcard</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-8 py-4">
              <div className="text-2xl font-bold text-white">30+</div>
              <div className="text-blue-100">Ví dụ</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;