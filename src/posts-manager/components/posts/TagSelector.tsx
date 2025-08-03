
import React from 'react';
import { Tag } from '@/posts-manager/types/post';
import { Badge } from '@/posts-manager/components/ui/badge';
import { Button } from '@/posts-manager/components/ui/button';
import { Label } from '@/posts-manager/components/ui/label';
import { Plus, X } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/posts-manager/components/ui/popover';
import { Input } from '@/posts-manager/components/ui/input';

interface TagSelectorProps {
  selectedTags: Tag[];
  onTagsChange: (tags: Tag[]) => void;
  availableTags: Tag[];
}

export const TagSelector: React.FC<TagSelectorProps> = ({
  selectedTags,
  onTagsChange,
  availableTags,
}) => {
  const [newTagName, setNewTagName] = React.useState('');
  const [isCreating, setIsCreating] = React.useState(false);

  const handleAddTag = (tag: Tag) => {
    if (!selectedTags.find(t => t.id === tag.id)) {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const handleRemoveTag = (tagId: string) => {
    onTagsChange(selectedTags.filter(t => t.id !== tagId));
  };

  const handleCreateTag = () => {
    if (newTagName.trim()) {
      const newTag: Tag = {
        id: Date.now().toString(),
        name: newTagName.trim(),
        slug: newTagName.toLowerCase().replace(/\s+/g, '-')
      };
      handleAddTag(newTag);
      setNewTagName('');
      setIsCreating(false);
    }
  };

  const unselectedTags = availableTags.filter(
    tag => !selectedTags.find(selected => selected.id === tag.id)
  );

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Tags</Label>
      
      <div className="flex flex-wrap gap-2">
        {selectedTags.map((tag) => (
          <Badge
            key={tag.id}
            variant="outline"
            className="flex items-center gap-1 px-3 py-1"
          >
            {tag.name}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => handleRemoveTag(tag.id)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button type="button" variant="outline" size="sm" className="h-8">
            <Plus className="h-4 w-4 mr-1" />
            Add Tag
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4">
          <div className="space-y-3">
            <h4 className="font-medium">Select Tags</h4>
            
            <div className="max-h-32 overflow-y-auto space-y-1">
              {unselectedTags.map((tag) => (
                <Button
                  key={tag.id}
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start h-8"
                  onClick={() => handleAddTag(tag)}
                >
                  #{tag.name}
                </Button>
              ))}
            </div>

            <div className="border-t pt-3">
              {isCreating ? (
                <div className="flex gap-2">
                  <Input
                    placeholder="Tag name"
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    className="h-8"
                    onKeyPress={(e) => e.key === 'Enter' && handleCreateTag()}
                  />
                  <Button type="button" size="sm" onClick={handleCreateTag}>
                    Add
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsCreating(false);
                      setNewTagName('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full h-8"
                  onClick={() => setIsCreating(true)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Create New Tag
                </Button>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
