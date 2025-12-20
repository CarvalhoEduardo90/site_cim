
export enum Page {
  Home = 'home',
  Enrollment = 'enrollment',
  Gallery = 'gallery',
  News = 'news',
  Events = 'events',
  StudentPortal = 'student-portal'
}

export interface NavItem {
  label: string;
  page: Page;
  icon?: string;
}

export interface NewsCard {
  id: number;
  category: string;
  date: string;
  title: string;
  description: string;
  imageUrl: string;
  fullContent?: string;
}

export interface GalleryAlbum {
  id: number;
  title: string;
  theme: string;
  year: string;
  edition: '1' | '2'; // 1 para Janeiro, 2 para Julho
  location: string;
  category: 'Kids' | 'Teen' | 'Adultos';
  photoCount: number;
  images: string[];
}

export interface SemadecEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  link: string; // Link direto para Google Forms ou página externa
}

export interface ProgramDetails {
  title: string;
  age: string;
  theme: string;
  vision: string;
  objective: string;
  imageUrl: string;
}
