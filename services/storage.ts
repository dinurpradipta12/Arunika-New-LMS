
import { AppState, Course, LMSConfig } from '../types';

const STORAGE_KEY = 'arunika_lms_state_v2';

const INITIAL_CONFIG: LMSConfig = {
  logo: 'https://cdn-icons-png.flaticon.com/512/3222/3222800.png',
  brandName: 'Arunika Academy',
  heroTitle: 'Belajar Kreatif, Tanpa Batas!',
  heroSubtitle: 'Platform LMS profesional untuk masa depan yang lebih cerah dengan kurikulum terpadu.',
};

const DEFAULT_MENTOR = {
  name: 'Arunika Mentor',
  role: 'Senior Educator',
  bio: 'Berpengalaman lebih dari 10 tahun di industri kreatif dan edukasi teknologi.',
  photo: 'https://i.pravatar.cc/150?u=arunika',
  website: 'https://arunika.edu',
  socials: {
    twitter: '@arunika',
    linkedin: 'arunika-academy'
  }
};

const INITIAL_COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'Dasar Pemrograman Web',
    description: 'Pelajari dasar-dasar HTML, CSS, dan JavaScript dengan cara yang menyenangkan.',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    isPublic: true,
    createdAt: Date.now(),
    mentor: { ...DEFAULT_MENTOR },
    assets: [
      { id: 'a1', name: 'Cheat Sheet HTML/CSS', type: 'link', url: '#' }
    ],
    lessons: [
      {
        id: 'lesson-1-1',
        title: 'Pengenalan HTML',
        type: 'video',
        videoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU',
        content: 'HTML adalah bahasa standar untuk membuat halaman web.',
        order: 0
      },
      {
        id: 'lesson-1-2',
        title: 'Materi Text: Dasar Tag',
        type: 'text',
        content: 'Berikut adalah daftar tag dasar HTML yang harus Anda ketahui...',
        order: 1
      }
    ]
  }
];

export const loadState = (): AppState => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse saved state", e);
    }
  }
  return {
    config: INITIAL_CONFIG,
    courses: INITIAL_COURSES
  };
};

export const saveState = (state: AppState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};
