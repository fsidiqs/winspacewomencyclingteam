import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Post, CreatePostData, PostApiPayload, Category, Tag } from '@/posts-manager/types/post';
import { Button } from '@/posts-manager/components/ui/button';
import { Input } from '@/posts-manager/components/ui/input';
import { Label } from '@/posts-manager/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/posts-manager/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/posts-manager/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/posts-manager/components/ui/select';
import { CategorySelector } from './CategorySelector';
import { TagSelector } from './TagSelector';
import MediaSelector, { MediaItem } from './MediaSelector';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getImageUrl } from '@/lib/cleanUrl';
import { apiRequest, apiRequestWithAuth } from '@/admin/lib/api';
import { toast } from '@/posts-manager/hooks/use-toast';
import { mockTags } from '@/posts-manager/data/mockData';

const DEFAULT = `<h1 dir="auto" style="text-align: center">Rich Text Editor</h1>`;

interface EditPostFormProps {
  postId?: string;
}

export const EditPostForm: React.FC<EditPostFormProps> = ({ postId }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CreatePostData>({
    title: { en: '', fr: '' },
    content: { en: '', fr: '' },
    featuredImage: '',
    categoryIds: [],
    tagIds: [],
    status: 'draft',
  });
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [featuredMedia, setFeaturedMedia] = useState<MediaItem | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const [postData, categoryData] = await Promise.all([
          apiRequest(`/api/posts/${postId}`, 'GET'),
          apiRequest(`/api/categories`, 'GET'),
        ]);
        if (!postData) {
          setNotFound(true);
          return;
        }
        setFormData({
          title: { en: postData.post_title_en || '', fr: postData.post_title_fr || '' },
          content: { en: postData.content_en || '', fr: postData.content_fr || '' },
          featuredImage: postData.photo || '',
          categoryIds: postData.categories ? postData.categories.map((c: any) => c.id.toString()) : [],
          tagIds: postData.tags ? postData.tags.map((t: any) => t.id.toString()) : [],
          status: postData.status || 'draft',
        });
        setSelectedCategories(postData.categories || []);
        setSelectedTags(postData.tags || []);
        setFeaturedMedia(postData.photo ? { file_path: postData.photo, alt_text: '', id: 0 } : null);
        setCategories(Array.isArray(categoryData) ? categoryData : (categoryData.data || []));
      } catch (error: any) {
        toast({ title: 'Error', description: error.message || 'Failed to fetch post or categories', variant: 'destructive' });
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    if (postId) fetchData();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.en.trim() || !formData.title.fr.trim()) {
      toast({ title: 'Error', description: 'Title is required in both languages', variant: 'destructive' });
      return;
    }
    if (!formData.content.en.trim() || !formData.content.fr.trim()) {
      toast({ title: 'Error', description: 'Content is required in both languages', variant: 'destructive' });
      return;
    }
    try {
      const apiPayload: PostApiPayload = {
        post_title_en: formData.title.en,
        post_title_fr: formData.title.fr,
        content_en: formData.content.en,
        content_fr: formData.content.fr,
        status: formData.status === 'active' ? 'active' : formData.status,
        photo: (featuredMedia ? featuredMedia.file_path : formData.featuredImage) || '',
        categories: selectedCategories.map(c => Number(c.id)),
      };
      await apiRequestWithAuth(`/api/posts/${postId}`, 'PUT', apiPayload, false);
      toast({ title: 'Success', description: 'Post updated successfully!' });
      navigate('/admin/posts');
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'Failed to update post', variant: 'destructive' });
    }
  };

  const handleCategoryCreated = async () => {
    setLoading(true);
    try {
      const data = await apiRequest(`/api/categories`, 'GET');
      setCategories(Array.isArray(data) ? data : (data.data || []));
    } catch {
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (notFound) return <div className="p-8 text-center">Post not found.</div>;

  return (
    <Card className="mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Edit Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Featured Image */}
          <div className="space-y-2">
            <Label htmlFor="featuredImage">Featured Image</Label>
            <MediaSelector selectedMedia={featuredMedia} onSelect={setFeaturedMedia as (media: MediaItem) => void} />
            {featuredMedia && (
              <div className="mt-2">
                <img
                  src={getImageUrl(featuredMedia.file_path)}
                  alt={featuredMedia.alt_text || 'Preview'}
                  className="w-full h-auto object-contain rounded-lg border"
                />
              </div>
            )}
          </div>

          {/* Titles */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Post Titles</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title-en">Title (English) *</Label>
                <Input
                  id="title-en"
                  value={formData.title.en}
                  onChange={e => setFormData({ ...formData, title: { ...formData.title, en: e.target.value } })}
                  placeholder="Enter English title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title-fr">Title (French) *</Label>
                <Input
                  id="title-fr"
                  value={formData.title.fr}
                  onChange={e => setFormData({ ...formData, title: { ...formData.title, fr: e.target.value } })}
                  placeholder="Entrez le titre français"
                  required
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Post Content</Label>
            <Tabs defaultValue="en" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="en">English Content</TabsTrigger>
                <TabsTrigger value="fr">French Content</TabsTrigger>
              </TabsList>
              <TabsContent value="en" className="mt-4">
                <ReactQuill
                  theme="snow"
                  value={formData.content.en}
                  onChange={value => setFormData({ ...formData, content: { ...formData.content, en: value } })}
                  style={{ minHeight: 200, marginBottom: 8 }}
                  modules={{
                    toolbar: [
                      [{ 'font': [] }],
                      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                      [{ 'size': ['small', false, 'large', 'huge'] }],
                      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
                      [{ 'color': [] }, { 'background': [] }],
                      [{ 'script': 'sub'}, { 'script': 'super' }],
                      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
                      [{ 'align': [] }],
                      ['link', 'image', 'video'],
                      ['clean'],
                    ],
                  }}
                />
                <div className="text-gray-400 text-xs mt-1">Write your post content in English...</div>
              </TabsContent>
              <TabsContent value="fr" className="mt-4">
                <ReactQuill
                  theme="snow"
                  value={formData.content.fr}
                  onChange={value => setFormData({ ...formData, content: { ...formData.content, fr: value } })}
                  style={{ minHeight: 200, marginBottom: 8 }}
                  modules={{
                    toolbar: [
                      [{ 'font': [] }],
                      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                      [{ 'size': ['small', false, 'large', 'huge'] }],
                      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
                      [{ 'color': [] }, { 'background': [] }],
                      [{ 'script': 'sub'}, { 'script': 'super' }],
                      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
                      [{ 'align': [] }],
                      ['link', 'image', 'video'],
                      ['clean'],
                    ],
                  }}
                />
                <div className="text-gray-400 text-xs mt-1">Rédigez le contenu de votre article en français...</div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Categories and Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CategorySelector
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoriesChange={setSelectedCategories}
              availableCategories={categories}
              onCategoryCreated={handleCategoryCreated}
            />
            <TagSelector
              selectedTags={selectedTags}
              onTagsChange={setSelectedTags}
              availableTags={mockTags}
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: 'draft' | 'active') => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="active">Active</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-6 border-t">
            <Button type="submit" className="px-8">
              Update Post
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate('/admin/posts')}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
