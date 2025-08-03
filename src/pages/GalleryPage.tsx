import React, { useEffect, useState } from "react";
import { apiRequestWithAuth } from "../admin/lib/api";


interface MediaItem {
  id: number;
  title?: string;
  url: string;
  // Add more fields if needed
}

const GalleryPage: React.FC = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMedia() {
      setLoading(true);
      setError(null);
      try {
        const data = await apiRequestWithAuth(`/api/media`, "GET");
        setMedia(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch gallery");
      } finally {
        setLoading(false);
      }
    }
    fetchMedia();
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Gallery</h1>
      {loading ? (
        <div className="text-center text-gray-500 py-10">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-10">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {media.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
              <img
                src={item.url}
                alt={item.title || `Media ${item.id}`}
                className="w-full h-56 object-cover"
              />
              {item.title && (
                <div className="p-2 text-center text-gray-700 font-medium border-t">
                  {item.title}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
