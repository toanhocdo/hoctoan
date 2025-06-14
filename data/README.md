# Hướng dẫn quản lý nội dung toán học

## Cách sửa tên chương và bài học

### 1. Sửa trực tiếp trong file TypeScript
Mở file `src/data/mathChapters.ts` và chỉnh sửa:

```typescript
{
  id: 'chuong-1',
  title: 'Chương 1: Tên chương mới',  // ← Sửa tên chương ở đây
  description: 'Mô tả mới',           // ← Sửa mô tả ở đây
  lessons: [
    {
      id: 'bai-1',
      title: 'Bài 1: Tên bài mới',    // ← Sửa tên bài ở đây
      description: 'Mô tả bài mới',   // ← Sửa mô tả bài ở đây
      // ... nội dung khác
    }
  ]
}
```

### 2. Sử dụng file JSON (Khuyến nghị)
Tạo file `data/chapters-config.json` để quản lý dễ dàng hơn:

```json
{
  "chapters": [
    {
      "id": "chuong-1",
      "title": "Chương 1: Phân thức đại số",
      "description": "Khái niệm và các phép toán",
      "lessons": [...]
    }
  ]
}
```

## Cách thêm bài học mới

### Thêm bài học vào chương hiện có:

```json
{
  "id": "bai-moi",
  "title": "Bài mới: Tên bài",
  "description": "Mô tả bài học",
  "theory": {
    "title": "Lý thuyết",
    "content": [
      "Nội dung lý thuyết với LaTeX: $x^2 + y^2 = z^2$"
    ],
    "formulas": [
      "$a^2 + b^2 = c^2$",
      "$\\frac{a}{b} = \\frac{c}{d}$"
    ]
  },
  "flashcards": [
    {
      "id": "1",
      "question": "Câu hỏi với LaTeX: $\\sqrt{x}$",
      "answer": "Đáp án với LaTeX: $x^{1/2}$"
    }
  ],
  "examples": [
    {
      "id": "1",
      "title": "Ví dụ 1",
      "problem": "Đề bài với LaTeX: $\\int x dx$",
      "solution": [
        "Bước 1: $\\int x dx = \\frac{x^2}{2} + C$",
        "Bước 2: Kiểm tra đạo hàm"
      ]
    }
  ],
  "quiz": [
    {
      "id": "1",
      "question": "Câu hỏi trắc nghiệm với LaTeX: $\\lim_{x \\to 0} \\frac{\\sin x}{x} = ?$",
      "options": ["0", "1", "$\\infty$", "Không tồn tại"],
      "correctAnswer": 1,
      "explanation": "Theo định lý giới hạn cơ bản: $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$"
    }
  ],
  "trueFalseQuiz": [
    {
      "id": "1",
      "question": "Xét tính đúng sai:",
      "statements": [
        { "text": "$\\sin^2 x + \\cos^2 x = 1$", "isTrue": true },
        { "text": "$\\tan x = \\frac{\\sin x}{\\cos x}$", "isTrue": true }
      ],
      "explanation": "Cả hai đều là công thức lượng giác cơ bản"
    }
  ],
  "shortAnswerQuiz": [
    {
      "id": "1",
      "question": "Tính đạo hàm của $f(x) = x^3$",
      "correctAnswer": "3x^2",
      "explanation": "Theo quy tắc đạo hàm: $(x^n)' = nx^{n-1}$",
      "hint": "Sử dụng quy tắc đạo hàm cơ bản"
    }
  ],
  "homework": [
    {
      "id": "1",
      "title": "Bài tập về nhà",
      "description": "Làm các bài tập sau",
      "problems": [
        "Bài 1: Tính $\\int_0^1 x^2 dx$",
        "Bài 2: Giải phương trình $x^2 - 5x + 6 = 0$"
      ],
      "dueDate": "2024-01-15"
    }
  ]
}
```

## Lưu ý quan trọng về LaTeX

### Cú pháp LaTeX được hỗ trợ:
- Phân số: `$\\frac{a}{b}$` → $\frac{a}{b}$
- Lũy thừa: `$x^2$` → $x^2$
- Căn bậc hai: `$\\sqrt{x}$` → $\sqrt{x}$
- Tích phân: `$\\int x dx$` → $\int x dx$
- Giới hạn: `$\\lim_{x \\to 0}$` → $\lim_{x \to 0}$
- Ma trận: `$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$`

### Escape characters trong JSON:
- Dùng `\\` thay vì `\` (ví dụ: `\\frac` thay vì `\frac`)
- Dùng `\\\\` cho xuống dòng trong ma trận

## Cách nhanh nhất để thêm trắc nghiệm

### Template trắc nghiệm nhanh:
```json
{
  "quiz": [
    {
      "id": "1",
      "question": "Câu hỏi",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": 0,
      "explanation": "Giải thích"
    }
  ],
  "trueFalseQuiz": [
    {
      "id": "1", 
      "question": "Đánh giá đúng/sai:",
      "statements": [
        { "text": "Khẳng định 1", "isTrue": true },
        { "text": "Khẳng định 2", "isTrue": false }
      ],
      "explanation": "Giải thích"
    }
  ],
  "shortAnswerQuiz": [
    {
      "id": "1",
      "question": "Câu hỏi",
      "correctAnswer": "đáp án",
      "explanation": "Giải thích",
      "hint": "Gợi ý"
    }
  ]
}
```

## Workflow khuyến nghị

1. **Tạo nội dung trong JSON** (dễ chỉnh sửa)
2. **Test LaTeX** trên trang web trước
3. **Copy vào TypeScript** khi hoàn thiện
4. **Backup** file cũ trước khi thay đổi lớn

## Công cụ hỗ trợ

- **LaTeX Editor**: [Overleaf](https://overleaf.com) để test công thức
- **JSON Validator**: [JSONLint](https://jsonlint.com) để kiểm tra cú pháp
- **MathJax Demo**: [MathJax Live Demo](https://mathjax.org) để test render