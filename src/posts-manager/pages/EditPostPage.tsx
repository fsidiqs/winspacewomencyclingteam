import React from 'react';
import { useParams } from 'react-router';
import { EditPostForm } from '../components/posts/EditPostForm';

const EditPostPage: React.FC = () => {
  const { postId } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <EditPostForm postId={postId} />
    </div>
  );
};

export default EditPostPage;
