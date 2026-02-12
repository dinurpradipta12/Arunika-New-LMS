
export type LessonType = 'video' | 'text';

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  videoUrl?: string;
  content: string;
  description: string; // New field for rich text description
  order: number;
}

export interface LearningAsset {
  id: string;
  name: string;
  type: 'file' | 'link';
  url: string;
}

export interface Mentor {
  name: string;
  role: string;
  bio: string;
  photo: string;
  website: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  lessons: Lesson[];
  assets: LearningAsset[];
  mentor: Mentor;
  isPublic: boolean;
  createdAt: number;
}

export interface LMSConfig {
  logo: string;
  brandName: string;
  heroTitle: string;
  heroSubtitle: string;
  supabaseUrl?: string;
  supabaseKey?: string;
}

export interface AppState {
  courses: Course[];
  config: LMSConfig;
}
