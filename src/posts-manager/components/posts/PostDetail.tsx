
import React from 'react';
import { Post } from '@/posts-manager/types/post';
import { Card, CardContent, CardHeader, CardTitle } from '@/posts-manager/components/ui/card';
import { Badge } from '@/posts-manager/components/ui/badge';
import { Button } from '@/posts-manager/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/posts-manager/components/ui/tabs';
import { ArrowLeft, Edit, Tag } from 'lucide-react';

interface PostDetailProps {
  post: Post;
  onEdit: (post: Post) => void;
  onBack: () => void;
}

export const PostDetail: React.FC<PostDetailProps> = ({
  post,
  onEdit,
  onBack
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Posts
        </Button>
        <Button onClick={() => onEdit(post)} className="flex items-center gap-2">
          <Edit className="h-4 w-4" />
          Edit Post
        </Button>
      </div>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="w-full h-64 md:h-96 overflow-hidden rounded-lg">
          <img
            src={post.featuredImage}
            alt="Featured"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Post Content */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <Tabs defaultValue="en" className="w-full">
                <TabsList>
                  <TabsTrigger value="en">English</TabsTrigger>
                  <TabsTrigger value="fr">Français</TabsTrigger>
                </TabsList>
                <TabsContent value="en" className="mt-4">
                  <CardTitle className="text-3xl">{post.title.en}</CardTitle>
                </TabsContent>
                <TabsContent value="fr" className="mt-4">
                  <CardTitle className="text-3xl">{post.title.fr}</CardTitle>
                </TabsContent>
              </Tabs>
            </div>
            <Badge variant={post.status === 'active' ? 'default' : 'secondary'}>
              {post.status}
            </Badge>
          </div>

          {/* Meta Information */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>Created: {post.createdAt.toLocaleDateString()}</span>
            <span>Updated: {post.updatedAt.toLocaleDateString()}</span>
            <span>Slug: {post.slug}</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Categories and Tags */}
          <div className="flex flex-wrap gap-4">
            {post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium">Categories:</span>
                {post.categories.map((category) => (
                  <Badge
                    key={category.id}
                    variant="secondary"
                    style={{ 
                      backgroundColor: category.color + '20', 
                      borderColor: category.color,
                      color: category.color 
                    }}
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
            )}

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium">Tags:</span>
                {post.tags.map((tag) => (
                  <Badge key={tag.id} variant="outline">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <Tabs defaultValue="en" className="w-full">
            <TabsList>
              <TabsTrigger value="en">English Content</TabsTrigger>
              <TabsTrigger value="fr">French Content</TabsTrigger>
            </TabsList>
            <TabsContent value="en" className="mt-6">
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content.en }}
              />
            </TabsContent>
            <TabsContent value="fr" className="mt-6">
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content.fr }}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
