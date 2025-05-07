import { Course } from '../types';

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Machine Learning',
    description: 'A comprehensive introduction to machine learning concepts and applications.',
    objectives: [
      'Understand basic ML concepts',
      'Implement simple algorithms',
      'Evaluate model performance',
      'Apply ML to real-world problems'
    ],
    createdAt: new Date('2023-10-15'),
    updatedAt: new Date('2023-11-20'),
    modules: [
      {
        id: 'm1',
        title: 'Fundamentals of Machine Learning',
        order: 0,
        content: [
          {
            id: 'c1',
            type: 'text',
            content: 'Machine learning is a subset of artificial intelligence that focuses on building systems that learn from data.',
            order: 0
          },
          {
            id: 'c2',
            type: 'image',
            content: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            order: 1
          }
        ]
      },
      {
        id: 'm2',
        title: 'Supervised Learning',
        order: 1,
        content: [
          {
            id: 'c3',
            type: 'text',
            content: 'Supervised learning involves training a model on labeled data to make predictions or decisions.',
            order: 0
          }
        ]
      }
    ],
    coverImage: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '2',
    title: 'Web Development Fundamentals',
    description: 'Learn the core concepts of modern web development including HTML, CSS, and JavaScript.',
    objectives: [
      'Build responsive websites',
      'Understand web development principles',
      'Create interactive web applications',
      'Deploy websites to production'
    ],
    createdAt: new Date('2023-09-05'),
    updatedAt: new Date('2023-12-01'),
    modules: [
      {
        id: 'm3',
        title: 'HTML Basics',
        order: 0,
        content: [
          {
            id: 'c4',
            type: 'text',
            content: 'HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser.',
            order: 0
          }
        ]
      }
    ],
    coverImage: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '3',
    title: 'Data Science Essentials',
    description: 'Master the fundamental concepts and tools needed for data science and analysis.',
    objectives: [
      'Understand data processing workflows',
      'Apply statistical methods',
      'Create data visualizations',
      'Draw insights from complex datasets'
    ],
    createdAt: new Date('2023-11-10'),
    updatedAt: new Date('2023-12-05'),
    modules: [
      {
        id: 'm4',
        title: 'Introduction to Data Science',
        order: 0,
        content: [
          {
            id: 'c5',
            type: 'text',
            content: 'Data science combines domain expertise, programming skills, and knowledge of mathematics and statistics to extract meaningful insights from data.',
            order: 0
          }
        ]
      }
    ],
    coverImage: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '4',
    title: 'Digital Marketing Masterclass',
    description: 'Learn modern digital marketing strategies and tools to grow your online presence.',
    objectives: [
      'Develop effective marketing strategies',
      'Master social media marketing',
      'Understand SEO principles',
      'Create compelling content'
    ],
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2023-12-15'),
    modules: [
      {
        id: 'm5',
        title: 'Digital Marketing Fundamentals',
        order: 0,
        content: [
          {
            id: 'c6',
            type: 'text',
            content: 'Digital marketing encompasses all marketing efforts that use electronic devices or the internet to connect with current and prospective customers.',
            order: 0
          }
        ]
      }
    ],
    coverImage: 'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '5',
    title: 'UX Design Principles',
    description: 'Master the fundamentals of user experience design and create user-centered products.',
    objectives: [
      'Understand user-centered design',
      'Conduct user research',
      'Create effective wireframes',
      'Design intuitive interfaces'
    ],
    createdAt: new Date('2023-11-25'),
    updatedAt: new Date('2023-12-10'),
    modules: [
      {
        id: 'm6',
        title: 'Introduction to UX Design',
        order: 0,
        content: [
          {
            id: 'c7',
            type: 'text',
            content: 'User experience design is the process of creating products that provide meaningful and relevant experiences to users.',
            order: 0
          }
        ]
      }
    ],
    coverImage: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '6',
    title: 'Business Analytics',
    description: 'Learn to make data-driven business decisions using analytics tools and techniques.',
    objectives: [
      'Analyze business data',
      'Create meaningful reports',
      'Make data-driven decisions',
      'Present insights effectively'
    ],
    createdAt: new Date('2023-12-05'),
    updatedAt: new Date('2023-12-20'),
    modules: [
      {
        id: 'm7',
        title: 'Introduction to Business Analytics',
        order: 0,
        content: [
          {
            id: 'c8',
            type: 'text',
            content: 'Business analytics involves the skills, technologies, and practices for continuous iterative exploration and investigation of past business performance.',
            order: 0
          }
        ]
      }
    ],
    coverImage: 'https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

export const mockAIResponses = {
  generate: {
    content: 'Machine learning algorithms build mathematical models based on sample data, known as "training data," in order to make predictions or decisions without being explicitly programmed to perform the task.',
    suggestions: [
      'Add a section on types of machine learning',
      'Include examples of real-world applications',
      'Consider adding a diagram illustrating the process'
    ]
  },
  enhance: {
    content: 'Machine learning is a transformative field of artificial intelligence that enables systems to automatically learn and improve from experience without being explicitly programmed. By leveraging statistical techniques, ML algorithms build mathematical models based on sample data (known as "training data") to make predictions or decisions. This data-driven approach has revolutionized various industries, from healthcare and finance to transportation and entertainment.',
    suggestions: [
      'Add specific examples from different industries',
      'Include key historical milestones in ML development',
      'Mention ethical considerations and challenges'
    ]
  }
};