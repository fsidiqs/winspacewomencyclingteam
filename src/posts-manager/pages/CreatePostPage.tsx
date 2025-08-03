import React from 'react';
import { CreatePostForm } from '../components/posts/CreatePostForm';

const CreatePostPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <CreatePostForm />
    </div>
  );
};

export default CreatePostPage;
