
import React from 'react';
import { Textarea } from '@/posts-manager/components/ui/textarea';
import { Label } from '@/posts-manager/components/ui/label';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  required?: boolean;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  label,
  placeholder,
  required = false
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={label} className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Textarea
        id={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[200px] resize-y"
        required={required}
      />
      <p className="text-xs text-muted-foreground">
        Rich text editor with HTML support (simplified version)
      </p>
    </div>
  );
};
