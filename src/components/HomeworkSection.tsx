import React, { useState, useEffect } from 'react';
import { Home, Upload, FileText, Calendar, Camera, Check, X, Eye } from 'lucide-react';
import { HomeworkAssignment } from '../types/MathTopic';

interface HomeworkSectionProps {
  assignments: HomeworkAssignment[];
  onMathJaxRender: () => void;
}

const HomeworkSection: React.FC<HomeworkSectionProps> = ({ assignments, onMathJaxRender }) => {
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);
  const [solutions, setSolutions] = useState<{[key: string]: string}>({});
  const [uploadedImages, setUploadedImages] = useState<{[key: string]: string[]}>({});
  const [uploadingImages, setUploadingImages] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    onMathJaxRender();
  }, [selectedAssignment, onMathJaxRender]);

  const handleSolutionChange = (problemIndex: number, value: string) => {
    const key = `${selectedAssignment}-${problemIndex}`;
    setSolutions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const uploadImageToServer = async (file: File, problemKey: string): Promise<string> => {
    const formData = new FormData();
    formData.append('fileToUpload', file);
    formData.append('problemKey', problemKey);

    try {
      const response = await fetch('/upanh.php', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      
      if (result.status === 'success') {
        return result.url || `/uploads/${result.filename}`;
      } else {
        throw new Error(result.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleImageUpload = async (problemIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File quá lớn! Vui lòng chọn file nhỏ hơn 5MB.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn file hình ảnh!');
      return;
    }

    const key = `${selectedAssignment}-${problemIndex}`;
    
    setUploadingImages(prev => ({
      ...prev,
      [key]: true
    }));

    try {
      const previewUrl = URL.createObjectURL(file);
      
      setUploadedImages(prev => ({
        ...prev,
        [key]: [...(prev[key] || []), previewUrl]
      }));

      const serverUrl = await uploadImageToServer(file, key);
      
      setUploadedImages(prev => ({
        ...prev,
        [key]: prev[key]?.map(url => url === previewUrl ? serverUrl : url) || []
      }));

      console.log(`Ảnh đã được lưu tại: ${serverUrl}`);
      alert('Tải ảnh lên thành công!');
      
    } catch (error) {
      const previewUrl = URL.createObjectURL(file);
      setUploadedImages(prev => ({
        ...prev,
        [key]: prev[key]?.filter(url => url !== previewUrl) || []
      }));
      
      alert('Có lỗi xảy ra khi tải ảnh lên. Vui lòng thử lại!');
      console.error('Upload error:', error);
    } finally {
      setUploadingImages(prev => ({
        ...prev,
        [key]: false
      }));
    }

    event.target.value = '';
  };

  const removeImage = (problemIndex: number, imageIndex: number) => {
    const key = `${selectedAssignment}-${problemIndex}`;
    const imageUrl = uploadedImages[key]?.[imageIndex];
    
    if (imageUrl && imageUrl.startsWith('blob:')) {
      URL.revokeObjectURL(imageUrl);
    }
    
    setUploadedImages(prev => ({
      ...prev,
      [key]: prev[key]?.filter((_, index) => index !== imageIndex) || []
    }));
  };

  const viewImageFullSize = (imageUrl: string) => {
    window.open(imageUrl, '_blank');
  };

  const submitHomework = async () => {
    const assignment = assignments.find(a => a.id === selectedAssignment);
    if (!assignment) return;

    const homeworkData = {
      assignmentId: selectedAssignment,
      assignmentTitle: assignment.title,
      solutions: solutions,
      images: uploadedImages,
      submittedAt: new Date().toISOString()
    };

    console.log('Homework submitted:', homeworkData);
    
    try {
      const existingHomework = JSON.parse(localStorage.getItem('submittedHomework') || '[]');
      existingHomework.push(homeworkData);
      localStorage.setItem('submittedHomework', JSON.stringify(existingHomework));
      
      alert('Bài tập đã được nộp thành công!');
      setSelectedAssignment(null);
      setSolutions({});
      setUploadedImages({});
    } catch (error) {
      console.error('Error submitting homework:', error);
      alert('Có lỗi xảy ra khi nộp bài. Vui lòng thử lại!');
    }
  };

  if (assignments.length === 0) {
    return (
      <div className="text-center py-12">
        <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Chưa có bài tập về nhà cho bài học này.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center space-x-3 mb-8">
        <Home className="w-8 h-8 text-red-500" />
        <h2 className="text-2xl font-bold text-gray-900">Bài tập về nhà</h2>
      </div>

      {!selectedAssignment ? (
        <div className="grid gap-6">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="bg-white rounded-2xl shadow-lg border border-red-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{assignment.title}</h3>
                    <p className="text-gray-600 mb-4">{assignment.description}</p>
                    {assignment.dueDate && (
                      <div className="flex items-center space-x-2 text-sm text-orange-600">
                        <Calendar className="w-4 h-4" />
                        <span>Hạn nộp: {assignment.dueDate}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-red-50 rounded-xl p-4 mb-4">
                  <h4 className="font-semibold text-red-800 mb-2">Số câu hỏi: {assignment.problems.length}</h4>
                  <div className="text-sm text-red-700">
                    {assignment.problems.slice(0, 2).map((problem, index) => (
                      <div key={index} className="mb-1">• {problem.substring(0, 100)}...</div>
                    ))}
                    {assignment.problems.length > 2 && (
                      <div className="text-red-600 font-medium">... và {assignment.problems.length - 2} câu khác</div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedAssignment(assignment.id)}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-6 rounded-xl font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Bắt đầu làm bài
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              {assignments.find(a => a.id === selectedAssignment)?.title}
            </h3>
            <button
              onClick={() => setSelectedAssignment(null)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            >
              Quay lại
            </button>
          </div>

          <div className="space-y-8">
            {assignments.find(a => a.id === selectedAssignment)?.problems.map((problem, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Câu {index + 1}:</h4>
                    <p className="text-gray-700 leading-relaxed">{problem}</p>
                  </div>
                </div>

                <div className="ml-11 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lời giải:
                    </label>
                    <textarea
                      value={solutions[`${selectedAssignment}-${index}`] || ''}
                      onChange={(e) => handleSolutionChange(index, e.target.value)}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                      rows={6}
                      placeholder="Nhập lời giải của bạn..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tải lên hình ảnh (tùy chọn):
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className={`flex items-center space-x-2 px-4 py-2 border border-blue-200 rounded-lg cursor-pointer transition-all duration-200 ${
                        uploadingImages[`${selectedAssignment}-${index}`] 
                          ? 'bg-blue-100 cursor-not-allowed' 
                          : 'bg-blue-50 hover:bg-blue-100'
                      }`}>
                        {uploadingImages[`${selectedAssignment}-${index}`] ? (
                          <>
                            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-blue-600 font-medium">Đang tải lên server...</span>
                          </>
                        ) : (
                          <>
                            <Camera className="w-5 h-5 text-blue-600" />
                            <span className="text-blue-600 font-medium">Chọn ảnh</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(index, e)}
                          className="hidden"
                          disabled={uploadingImages[`${selectedAssignment}-${index}`]}
                        />
                      </label>
                      <span className="text-sm text-gray-500">JPG, PNG, GIF (tối đa 5MB)</span>
                    </div>

                    {uploadedImages[`${selectedAssignment}-${index}`]?.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Ảnh đã tải lên:</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {uploadedImages[`${selectedAssignment}-${index}`].map((imageUrl, imageIndex) => (
                            <div key={imageIndex} className="relative group bg-gray-100 rounded-lg overflow-hidden">
                              <img
                                src={imageUrl}
                                alt={`Uploaded ${imageIndex + 1}`}
                                className="w-full h-32 object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDIwMCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTI4IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iNjQiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkFuaCBraMO0bmcgdOG6o2kgxJHGsOG7o2M8L3RleHQ+Cjwvc3ZnPgo=';
                                }}
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 flex space-x-2">
                                  <button
                                    onClick={() => viewImageFullSize(imageUrl)}
                                    className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
                                    title="Xem ảnh lớn"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => removeImage(index, imageIndex)}
                                    className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                                    title="Xóa ảnh"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                              {imageUrl.startsWith('/uploads/') && (
                                <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                                  ✓ Đã lưu trên server
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button 
              onClick={submitHomework}
              className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Check className="w-5 h-5" />
              <span>Nộp bài</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeworkSection;