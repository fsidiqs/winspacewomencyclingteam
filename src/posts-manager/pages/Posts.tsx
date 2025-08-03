import React from 'react';
import { Post, PostApiPayload } from '@/posts-manager/types/post';
import { mockPosts, mockTags } from '@/posts-manager/data/mockData';
import { PostCard } from '@/posts-manager/components/posts/PostCard';
import { PostDetail } from '@/posts-manager/components/posts/PostDetail';
import { Button } from '@/posts-manager/components/ui/button';
import { Input } from '@/posts-manager/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/posts-manager/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/posts-manager/components/ui/tabs';
import { Plus, File } from 'lucide-react';
import { toast } from '@/posts-manager/hooks/use-toast';
import { getAuth } from '@/admin/lib/localStorage';
import { apiRequest } from '@/admin/lib/api';
import { useNavigate } from 'react-router';

type ViewMode = 'list' | 'create' | 'edit' | 'detail';


const PostsPage: React.FC = () => {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [categories, setCategories] = React.useState<any[]>([]); // New state for categories
  const [viewMode, setViewMode] = React.useState<ViewMode>('list');
  const [selectedPost, setSelectedPost] = React.useState<Post | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<'all' | 'draft' | 'active'>('all');
  const [language, setLanguage] = React.useState<'en' | 'fr'>('en');
  const [page, setPage] = React.useState(1);
  const [limit] = React.useState(10);
  const [totalPages, setTotalPages] = React.useState(1);
  const [postToDelete, setPostToDelete] = React.useState<Post | null>(null);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content[language].toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreatePost = async (apiPayload: PostApiPayload, method: 'POST' | 'PUT', postId: string | null, token: string | undefined) => {
    try {
      const url = method === 'POST'
        ? `/api/posts`
        : `/api/posts/${postId}`;
      const result = await apiRequest(url, method, apiPayload, false, token);
      // Add the new post to the UI (simulate, since backend may not return full post)
      setPosts(prev => [
        {
          id: result.id || Date.now().toString(),
          title: { en: apiPayload.post_title_en, fr: apiPayload.post_title_fr },
          content: { en: apiPayload.content_en, fr: apiPayload.content_fr },
          featuredImage: apiPayload.photo,
          categories: [],
          tags: [],
          status: apiPayload.status === 'active' ? 'active' : 'draft',
          createdAt: new Date(),
          updatedAt: new Date(),
          slug: apiPayload.post_title_en.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        } as Post,
        ...prev
      ]);
      setViewMode('list');
      toast({
        title: 'Success',
        description: 'Post created successfully!',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create post',
        variant: 'destructive',
      });
    }
  };

  const handleEditPost = async (apiPayload: PostApiPayload, method: 'POST' | 'PUT', postId: string | null, token: string | undefined) => {
    if (!selectedPost) return;
    try {
      const url = `/api/posts/${postId}`;
      await apiRequest(url, 'PUT', apiPayload, false, token);
      // Update the post in the UI
      setPosts(prev => prev.map(p =>
        p.id === postId
          ? {
            ...p,
            title: { en: apiPayload.post_title_en, fr: apiPayload.post_title_fr },
            content: { en: apiPayload.content_en, fr: apiPayload.content_fr },
            featuredImage: apiPayload.photo,
            status: apiPayload.status === 'active' ? 'active' : 'draft',
            updatedAt: new Date(),
          } as Post
          : p
      ));
      setViewMode('list');
      setSelectedPost(null);
      toast({
        title: 'Success',
        description: 'Post updated successfully!',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update post',
        variant: 'destructive',
      });
    }
  };

  const handleDeletePost = (postId: string) => {
    setPostToDelete(posts.find(p => p.id === postId) || null);
  };
  const confirmDeletePost = () => {
    if (postToDelete) {
      setPosts(prev => prev.filter(p => p.id !== postToDelete.id));
      toast({
        title: "Success",
        description: "Post deleted successfully!",
      });
      setPostToDelete(null);
    }
  };
  const cancelDeletePost = () => setPostToDelete(null);

  const handleViewPost = (post: Post) => {
    setSelectedPost(post);
    setViewMode('detail');
  };

  const handleEditClick = (post: Post) => {
    setSelectedPost(post);
    setViewMode('edit');
  };

  const handleBack = () => {
    setViewMode('list');
    setSelectedPost(null);
  };

  // Move fetchCategories outside useEffect so it can be used as a prop
  const fetchCategories = async () => {
    try {
      const data = await apiRequest(`/api/categories`, 'GET');
      setCategories(Array.isArray(data) ? data : (data.data || []));
    } catch (error) {
      setCategories([]);
    }
  };

  React.useEffect(() => {
    const fetchLatestPosts = async () => {
      const auth = getAuth();
      const token = auth?.access_token;
      if (!token) return;
      try {
        const apiResponse = await apiRequest(`/api/posts/active-and-draft?limit=${limit}&page=${page}`, 'GET', undefined, false, token);
        const data = Array.isArray(apiResponse?.data) ? apiResponse.data : [];
        const mappedPosts = data.map((item: any) => ({
          id: item.id,
          title: { en: item.post_title_en || '', fr: item.post_title_fr || '' },
          content: { en: item.content_en || '', fr: item.content_fr || '' },
          featuredImage: item.photo,
          categories: [], // Adjust if you have categories
          tags: [], // Adjust if you have tags
          status: item.status === 'active' ? 'active' : 'draft',
          createdAt: new Date(item.created_at),
          updatedAt: new Date(item.updated_at),
          slug: (item.post_title_en || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        }));
        setPosts(mappedPosts);
        // Try to get total count from response
        const total = apiResponse.total || apiResponse.totalCount || apiResponse.count || (apiResponse.meta && apiResponse.meta.total) || 0;
        setTotalPages(total ? Math.ceil(total / limit) : 1);
      } catch (error) {
        const errMsg = (error instanceof Error) ? error.message : 'Failed to fetch posts';
        toast({
          title: 'Error',
          description: errMsg,
          variant: 'destructive',
        });
        setPosts([]);
        setTotalPages(1);
      }
    };
    fetchLatestPosts();
    fetchCategories();
  }, [page, limit]);

  // Navigation handlers
  const navigate = useNavigate();

  if (viewMode === 'create') {
    navigate('/admin/posts/create');
    return null;
  }

  if (viewMode === 'edit' && selectedPost) {
    navigate(`/admin/posts/${selectedPost.id}/edit`);
    return null;
  }

  if (viewMode === 'detail' && selectedPost) {
    return (
      <div className="container mx-auto px-4 py-8">
        <PostDetail
          post={selectedPost}
          onEdit={handleEditClick}
          onBack={handleBack}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Posts Management</h1>
          <p className="text-muted-foreground">Manage your blog posts with multi-language support</p>
        </div>
        <Button onClick={() => setViewMode('create')} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create New Post
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Select value={statusFilter} onValueChange={(value: 'all' | 'draft' | 'active') => setStatusFilter(value)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Posts</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
        <Tabs value={language} onValueChange={(value: string) => {
          if (value === 'en' || value === 'fr') setLanguage(value);
        }}>
          <TabsList>
            <TabsTrigger value="en">English</TabsTrigger>
            <TabsTrigger value="fr">Français</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <File className="h-5 w-5 text-blue-600" />
            <span className="font-medium">Total Posts</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">{posts.length}</p>
        </div>
        <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <File className="h-5 w-5 text-green-600" />
            <span className="font-medium">Active</span>
          </div>
          <p className="text-2xl font-bold text-green-600">
            {posts.filter(p => p.status === 'active').length}
          </p>
        </div>
        <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <File className="h-5 w-5 text-orange-600" />
            <span className="font-medium">Drafts</span>
          </div>
          <p className="text-2xl font-bold text-orange-600">
            {posts.filter(p => p.status === 'draft').length}
          </p>
        </div>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <File className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No posts found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || statusFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Get started by creating your first post'
            }
          </p>
          {!searchTerm && statusFilter === 'all' && (
            <Button onClick={() => setViewMode('create')}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Post
            </Button>
          )}
        </div>
      ) : (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={handleEditClick}
              onView={handleViewPost}
              onDelete={() => handleDeletePost(post.id)}
              language={language}
            />
          ))}
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <Button
            variant="outline"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <span>Page {page} of {totalPages}</span>
          <Button
            variant="outline"
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
        {/* Delete Confirmation Modal */}
        {postToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-lg font-semibold mb-4">Delete Post</h2>
              <p className="mb-6">Are you sure you want to delete <span className="font-bold">{postToDelete.title[language]}</span>? This action cannot be undone.</p>
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={cancelDeletePost}>Cancel</Button>
                <Button variant="destructive" onClick={confirmDeletePost}>Delete</Button>
              </div>
            </div>
          </div>
        )}
        </>
      )}
    </div>
  );
};

export default PostsPage;
