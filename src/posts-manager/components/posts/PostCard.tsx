
import React from 'react';
import { Post } from '@/posts-manager/types/post';
import { Card, CardContent, CardHeader } from '@/posts-manager/components/ui/card';
import { Badge } from '@/posts-manager/components/ui/badge';
import { Button } from '@/posts-manager/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/posts-manager/components/ui/dropdown-menu';
import { Edit, File, Tag } from 'lucide-react';
import { getImageUrl } from '@/lib/cleanUrl';


interface PostCardProps {
  post: Post;
  onEdit: (post: Post) => void;
  onView: (post: Post) => void;
  onDelete: (postId: string) => void;
  language: 'en' | 'fr';
}
const API_HOST = import.meta.env.VITE_API_HOST || 'http://localhost:8000';



export const PostCard: React.FC<PostCardProps> = ({
  post,
  onEdit,
  onView,
  onDelete,
  language
}) => {
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, '').substring(0, 150) + '...';
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200">
      {post.featuredImage && (
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <img
            src={getImageUrl(post.featuredImage)}
            alt={post.title[language]}
            className="w-full h-full object-cover"
          />
          <Badge
            variant={post.status === 'active' ? 'default' : 'secondary'}
            className="absolute top-2 right-2"
          >
            {post.status}
          </Badge>
        </div>
      )}

      <CardHeader className="flex-shrink-0">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-lg font-semibold line-clamp-2 flex-1">
            {post.title[language]}
          </h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Edit className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className='bg-white'>
              <DropdownMenuItem onClick={() => onView(post)}>
                <File className="h-4 w-4 mr-2" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(post)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(post.id)}
                className="text-destructive"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <p className="text-sm text-muted-foreground mb-4 flex-1">
          {stripHtml(post.content[language])}
        </p>

        <div className="space-y-3">
          {/* Categories */}
          {post.categories.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.categories.map((category) => (
                <Badge
                  key={category.id}
                  variant="secondary"
                  className="text-xs"
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

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag.id} variant="outline" className="text-xs">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag.name}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{post.tags.length - 3} more
                </Badge>
              )}
            </div>
          )}

          <div className="text-xs text-muted-foreground pt-2 border-t">
            Created: {post.createdAt.toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
