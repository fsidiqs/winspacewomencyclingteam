export interface Category {
  id: string;
  name: string;
  slug: string;
  color?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface PostContent {
  en: string;
  fr: string;
}

export interface PostTitle {
  en: string;
  fr: string;
}

export interface Post {
  id: string;
  title: PostTitle;
  content: PostContent;
  featuredImage?: string;
  categories: Category[];
  tags: Tag[];
  status: 'draft' | 'active';
  createdAt: Date;
  updatedAt: Date;
  slug: string;
}

export interface CreatePostData {
  title: PostTitle;
  content: PostContent;
  featuredImage?: string;
  categoryIds: string[];
  tagIds: string[];
  status: 'draft' | 'active';
}

// Backend API post payload type
export interface PostApiPayload {
  post_title_en: string;
  post_title_fr: string;
  content_en: string;
  content_fr: string;
  status: string; // 'active' or 'draft'
  photo: string;
  categories?: number[]; // Add categories as optional array of numbers for API payload
}
