
import { Category, Tag, Post } from '@/posts-manager/types/post';

export const mockCategories: Category[] = [
  { id: '1', name: 'Technology', slug: 'technology', color: '#3B82F6' },
  { id: '2', name: 'Design', slug: 'design', color: '#8B5CF6' },
  { id: '3', name: 'Business', slug: 'business', color: '#10B981' },
  { id: '4', name: 'Lifestyle', slug: 'lifestyle', color: '#F59E0B' },
  { id: '5', name: 'Travel', slug: 'travel', color: '#EF4444' }
];

export const mockTags: Tag[] = [
  { id: '1', name: 'React', slug: 'react' },
  { id: '2', name: 'TypeScript', slug: 'typescript' },
  { id: '3', name: 'UI/UX', slug: 'ui-ux' },
  { id: '4', name: 'Web Development', slug: 'web-development' },
  { id: '5', name: 'Frontend', slug: 'frontend' },
  { id: '6', name: 'JavaScript', slug: 'javascript' },
  { id: '7', name: 'CSS', slug: 'css' },
  { id: '8', name: 'Performance', slug: 'performance' }
];

export const mockPosts: Post[] = [
  {
    id: '1',
    title: {
      en: 'Getting Started with React and TypeScript',
      fr: 'Commencer avec React et TypeScript'
    },
    content: {
      en: '<p>React with TypeScript provides excellent developer experience...</p>',
      fr: '<p>React avec TypeScript offre une excellente expérience développeur...</p>'
    },
    featuredImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    categories: [mockCategories[0], mockCategories[1]],
    tags: [mockTags[0], mockTags[1], mockTags[4]],
    status: 'active',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    slug: 'getting-started-react-typescript'
  },
  {
    id: '2',
    title: {
      en: 'Modern UI Design Principles',
      fr: 'Principes de conception UI moderne'
    },
    content: {
      en: '<p>Modern UI design focuses on user experience and accessibility...</p>',
      fr: '<p>La conception UI moderne se concentre sur l\'expérience utilisateur et l\'accessibilité...</p>'
    },
    featuredImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
    categories: [mockCategories[1]],
    tags: [mockTags[2], mockTags[6]],
    status: 'draft',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-12'),
    slug: 'modern-ui-design-principles'
  }
];
