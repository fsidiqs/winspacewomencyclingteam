import React from 'react';
import { Category } from '@/posts-manager/types/post';
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
import { apiRequest } from '@/admin/lib/api';
import { getAuth } from '@/admin/lib/localStorage';


interface CategorySelectorProps {
  categories: Category[];
  selectedCategories: Category[];
  onCategoriesChange: (categories: Category[]) => void;
  availableCategories: Category[];
  onCategoryCreated?: () => void; // Optional callback
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategories,
  onCategoriesChange,
  availableCategories,
  onCategoryCreated,
}) => {
  const [newCategoryName, setNewCategoryName] = React.useState('');
  const [isCreating, setIsCreating] = React.useState(false);
  const [creating, setCreating] = React.useState(false);

  const handleAddCategory = (category: Category) => {
    if (!selectedCategories.find(c => c.id === category.id)) {
      onCategoriesChange([...selectedCategories, category]);
    }
  };

  const handleRemoveCategory = (categoryId: string) => {
    onCategoriesChange(selectedCategories.filter(c => c.id !== categoryId));
  };

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    setCreating(true);
    try {
      const auth = getAuth();
      const token = auth?.access_token;
      const data = await apiRequest(`/api/categories`, 'POST', {
        name: newCategoryName.trim(),
        description: 'All about cycling',
      }, false, token);
      const newCategory: Category = {
        id: data.id?.toString() || Date.now().toString(),
        name: data.name || newCategoryName.trim(),
        slug: data.slug || newCategoryName.toLowerCase().replace(/\s+/g, '-'),
        color: '#6B7280',
      };
      handleAddCategory(newCategory);
      setNewCategoryName('');
      setIsCreating(false);
      if (onCategoryCreated) onCategoryCreated(); // Refetch categories
    } catch (e) {
      // Optionally show error
    } finally {
      setCreating(false);
    }
  };

  const unselectedCategories = availableCategories.filter(
    cat => !selectedCategories.find(selected => selected.id === cat.id)
  );

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Categories</Label>
      
      <div className="flex flex-wrap gap-2">
        {selectedCategories.map((category) => (
          <Badge
            key={category.id}
            variant="secondary"
            className="flex items-center gap-1 px-3 py-1"
            style={{ backgroundColor: category.color + '20', borderColor: category.color }}
          >
            {category.name}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => handleRemoveCategory(category.id)}
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
            Add Category
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4">
          <div className="space-y-3">
            <h4 className="font-medium">Select Categories</h4>
            
            <div className="max-h-32 overflow-y-auto space-y-1">
              {unselectedCategories.map((category) => (
                <Button
                  key={category.id}
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start h-8"
                  onClick={() => handleAddCategory(category)}
                >
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: category.color }}
                  />
                  {category.name}
                </Button>
              ))}
            </div>

            <div className="border-t pt-3">
              {isCreating ? (
                <div className="flex gap-2">
                  <Input
                    placeholder="Category name"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="h-8"
                    onKeyPress={(e) => e.key === 'Enter' && handleCreateCategory()}
                  />
                  <Button type="button" size="sm" onClick={handleCreateCategory}>
                    Add
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsCreating(false);
                      setNewCategoryName('');
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
                  Create New Category
                </Button>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
