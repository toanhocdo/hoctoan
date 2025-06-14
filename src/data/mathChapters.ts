import { Chapter } from '../types/MathTopic';

export const mathChapters: Chapter[] = [
  {
    id: 'chuong-1',
    title: 'Chương 1: Phân thức đại số',
    description: 'Khái niệm và các phép toán với phân thức đại số',
    lessons: [
      {
        id: 'phan-thuc-dai-so',
        title: 'Phân thức đại số',
        description: 'Khái niệm và tính chất cơ bản',
        theory: {
          title: 'Lý thuyết về Phân thức đại số',
          content: [
            'Phân thức đại số là biểu thức có dạng $\\frac{A}{B}$, trong đó $A$ và $B$ là các đa thức, $B \\neq 0$.',
            'Hai phân thức $\\frac{A}{B}$ và $\\frac{C}{D}$ được gọi là bằng nhau nếu $A \\cdot D = B \\cdot C$.',
            'Tính chất cơ bản: $\\frac{A}{B} = \\frac{A \\cdot M}{B \\cdot M}$ với $M \\neq 0$.',
            'Để rút gọn phân thức, ta chia cả tử và mẫu cho nhân tử chung của chúng.'
          ],
          formulas: [
            '$\\frac{A}{B} = \\frac{C}{D} \\Leftrightarrow A \\cdot D = B \\cdot C$',
            '$\\frac{A}{B} = \\frac{A \\cdot M}{B \\cdot M}$ (với $M \\neq 0$)',
            '$\\frac{A}{B} + \\frac{C}{B} = \\frac{A+C}{B}$',
            '$\\frac{A}{B} - \\frac{C}{B} = \\frac{A-C}{B}$',
            '$\\frac{A}{B} \\times \\frac{C}{D} = \\frac{A \\cdot C}{B \\cdot D}$',
            '$\\frac{A}{B} \\div \\frac{C}{D} = \\frac{A}{B} \\times \\frac{D}{C} = \\frac{A \\cdot D}{B \\cdot C}$'
          ]
        },
        flashcards: [
          {
            id: '1',
            question: 'Phân thức đại số là gì?',
            answer: 'Phân thức đại số là biểu thức có dạng $\\frac{A}{B}$, trong đó $A$ và $B$ là các đa thức, $B \\neq 0$.'
          },
          {
            id: '2',
            question: 'Khi nào hai phân thức bằng nhau?',
            answer: 'Hai phân thức $\\frac{A}{B}$ và $\\frac{C}{D}$ bằng nhau khi $A \\cdot D = B \\cdot C$.'
          },
          {
            id: '3',
            question: 'Tính chất cơ bản của phân thức?',
            answer: '$\\frac{A}{B} = \\frac{A \\cdot M}{B \\cdot M}$ với $M \\neq 0$.'
          }
        ],
        examples: [
          {
            id: '1',
            title: 'Rút gọn phân thức',
            problem: 'Rút gọn phân thức: $\\frac{x^2 - 4}{x^2 + 4x + 4}$',
            solution: [
              'Bước 1: Phân tích tử số: $x^2 - 4 = (x - 2)(x + 2)$',
              'Bước 2: Phân tích mẫu số: $x^2 + 4x + 4 = (x + 2)^2$',
              'Bước 3: Rút gọn: $\\frac{(x - 2)(x + 2)}{(x + 2)^2} = \\frac{x - 2}{x + 2}$',
              'Đáp số: $\\frac{x - 2}{x + 2}$ với điều kiện $x \\neq -2$'
            ]
          }
        ],
        quiz: [
          {
            id: '1',
            question: 'Phân thức nào sau đây bằng với phân thức $\\frac{x}{x+1}$?',
            options: [
              '$\\frac{x^2}{x^2+1}$',
              '$\\frac{2x}{2x+2}$',
              '$\\frac{x^2}{x^2+x}$',
              '$\\frac{x-1}{x}$'
            ],
            correctAnswer: 2,
            explanation: '$\\frac{x^2}{x^2+x} = \\frac{x^2}{x(x+1)} = \\frac{x}{x+1}$'
          }
        ],
        trueFalseQuiz: [
          {
            id: '1',
            question: 'Xét tính đúng sai của các khẳng định sau về phân thức đại số:',
            statements: [
              { text: 'Phân thức $\\frac{x+1}{x-1}$ xác định với mọi $x \\in \\mathbb{R}$', isTrue: false },
              { text: 'Hai phân thức $\\frac{2x}{4}$ và $\\frac{x}{2}$ luôn bằng nhau', isTrue: true },
              { text: 'Phân thức $\\frac{0}{x^2+1}$ bằng 0 với mọi $x$', isTrue: true },
              { text: 'Điều kiện xác định của $\\frac{1}{x^2-4}$ là $x \\neq \\pm 2$', isTrue: true }
            ],
            explanation: 'a) Sai vì $x = 1$ làm mẫu bằng 0. b) Đúng theo tính chất cơ bản. c) Đúng vì tử bằng 0, mẫu khác 0. d) Đúng vì $x^2-4 = (x-2)(x+2) \\neq 0$'
          }
        ],
        shortAnswerQuiz: [
          {
            id: '1',
            question: 'Rút gọn phân thức $\\frac{x^2-9}{x+3}$ (với $x \\neq -3$)',
            correctAnswer: 'x-3',
            explanation: '$\\frac{x^2-9}{x+3} = \\frac{(x-3)(x+3)}{x+3} = x-3$',
            hint: 'Phân tích tử số thành nhân tử'
          }
        ],
        homework: [
          {
            id: '1',
            title: 'Bài tập về nhà - Phân thức đại số',
            description: 'Thực hiện các bài tập sau và nộp bài làm',
            problems: [
              'Rút gọn các phân thức sau: a) $\\frac{x^2-1}{x^2+2x+1}$ b) $\\frac{2x^2-8}{x^2-4x+4}$',
              'Tìm điều kiện xác định của: $\\frac{x+1}{x^2-5x+6}$',
              'Thực hiện phép tính: $\\frac{1}{x-1} + \\frac{2}{x+1}$'
            ]
          }
        ]
      },
      {
        id: 'phep-cong-tru',
        title: 'Phép cộng và trừ phân thức',
        description: 'Quy tắc cộng trừ phân thức đại số',
        theory: {
          title: 'Phép cộng và trừ phân thức đại số',
          content: [
            'Để cộng (trừ) hai phân thức cùng mẫu, ta cộng (trừ) các tử và giữ nguyên mẫu.',
            'Để cộng (trừ) hai phân thức khác mẫu, ta quy đồng mẫu rồi thực hiện phép cộng (trừ).',
            'Mẫu chung thường chọn là BCNN của các mẫu thức.',
            'Sau khi thực hiện phép tính, ta rút gọn kết quả nếu có thể.'
          ],
          formulas: [
            '$\\frac{A}{M} + \\frac{B}{M} = \\frac{A+B}{M}$',
            '$\\frac{A}{M} - \\frac{B}{M} = \\frac{A-B}{M}$',
            '$\\frac{A}{B} + \\frac{C}{D} = \\frac{AD + BC}{BD}$',
            '$\\frac{A}{B} - \\frac{C}{D} = \\frac{AD - BC}{BD}$'
          ]
        },
        flashcards: [
          {
            id: '1',
            question: 'Quy tắc cộng hai phân thức cùng mẫu?',
            answer: 'Cộng các tử và giữ nguyên mẫu: $\\frac{A}{M} + \\frac{B}{M} = \\frac{A+B}{M}$'
          }
        ],
        examples: [],
        quiz: [],
        trueFalseQuiz: [],
        shortAnswerQuiz: [],
        homework: []
      }
    ]
  },
  {
    id: 'chuong-2',
    title: 'Chương 2: Phương trình bậc nhất',
    description: 'Giải và biện luận phương trình bậc nhất một ẩn',
    lessons: [
      {
        id: 'phuong-trinh-bac-nhat',
        title: 'Phương trình bậc nhất một ẩn',
        description: 'Khái niệm và cách giải',
        theory: {
          title: 'Phương trình bậc nhất một ẩn',
          content: [
            'Phương trình bậc nhất một ẩn $x$ có dạng $ax + b = 0$, với $a, b$ là số thực và $a \\neq 0$.',
            'Nghiệm của phương trình $ax + b = 0$ là $x = -\\frac{b}{a}$.',
            'Hai phương trình được gọi là tương đương nếu chúng có cùng tập nghiệm.'
          ],
          formulas: [
            '$ax + b = 0$ (với $a \\neq 0$) $\\Rightarrow x = -\\frac{b}{a}$',
            '$ax + b = cx + d \\Leftrightarrow (a-c)x = d-b$'
          ]
        },
        flashcards: [],
        examples: [],
        quiz: [],
        trueFalseQuiz: [],
        shortAnswerQuiz: [],
        homework: []
      }
    ]
  },
  {
    id: 'chuong-3',
    title: 'Chương 3: Bất phương trình bậc nhất',
    description: 'Giải và biểu diễn nghiệm bất phương trình',
    lessons: []
  },
  {
    id: 'chuong-4',
    title: 'Chương 4: Hàm số bậc nhất',
    description: 'Khái niệm và đồ thị hàm số bậc nhất',
    lessons: []
  },
  {
    id: 'chuong-5',
    title: 'Chương 5: Tam giác đồng dạng',
    description: 'Định lý và ứng dụng tam giác đồng dạng',
    lessons: []
  },
  {
    id: 'chuong-6',
    title: 'Chương 6: Hình lăng trụ đứng',
    description: 'Tính chất và thể tích hình lăng trụ',
    lessons: []
  },
  {
    id: 'chuong-7',
    title: 'Chương 7: Hình chóp đều',
    description: 'Diện tích và thể tích hình chóp',
    lessons: []
  },
  {
    id: 'chuong-8',
    title: 'Chương 8: Thống kê',
    description: 'Thu thập và xử lý dữ liệu thống kê',
    lessons: []
  }
];