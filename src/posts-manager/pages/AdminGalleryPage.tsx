import React, { useCallback, useEffect, useState } from "react";
import { apiRequestWithAuth } from "@/admin/lib/api";
import { Skeleton } from "@/posts-manager/components/ui/skeleton";
import DropzoneComponent from "@/admin/components/form/form-elements/DropZone";
import { getImageUrl } from "@/lib/cleanUrl";


interface MediaItem {
   id: number;
   image_path: string;
   caption: string | null;
}

export default function AdminGalleryPage() {
   const [media, setMedia] = useState<MediaItem[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [caption, setCaption] = useState("");
   const [uploading, setUploading] = useState(false);
   const [menuOpen, setMenuOpen] = useState<number | null>(null);

   const fetchMedia = useCallback(() => {
      setLoading(true);
      apiRequestWithAuth(`/api/get-gallery`, "GET")
         .then((response) => {
            const mediaData =
               response && typeof response === "object"
                  ? Object.values(response)
                  : [];
            setMedia(mediaData as MediaItem[]);
            setError(null);
         })
         .catch((err) => {
            setError(err.message || "Failed to load gallery");
         })
         .finally(() => setLoading(false));
   }, []);

   useEffect(() => {
      fetchMedia();
   }, [fetchMedia]);

   const handleDrop = (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
         return;
      }
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("image", file);
      formData.append("caption", caption);

      setUploading(true);
      apiRequestWithAuth(`/api/post-gallery`, "POST", formData, true)
         .then(() => {
            setCaption("");
            fetchMedia();
         })
         .catch((err) => {
            setError(err.message || "Failed to upload image");
         })
         .finally(() => setUploading(false));
   };

   const handleDelete = (id: number) => {
      apiRequestWithAuth(`/api/gallery/${id}`, "DELETE")
         .then(() => {
            fetchMedia();
         })
         .catch((err) => {
            setError(err.message || "Failed to delete image");
         });
   };



   return (
      <div className="max-w-6xl mx-auto px-4 py-8">
         <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
               Upload New Image
            </h2>
            <div className="mb-4">
               <label
                  htmlFor="caption"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
               >
                  Caption
               </label>
               <input
                  type="text"
                  id="caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter a caption for the image"
               />
            </div>
            <DropzoneComponent onDrop={handleDrop} />
            {uploading && (
               <div className="mt-4 text-center text-blue-500">
                  Uploading...
               </div>
            )}
         </div>

         <h1 className="text-3xl font-bold mb-6 text-center">Gallery</h1>
         {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
               {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-square w-full h-64" />
               ))}
            </div>
         ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
         ) : media.length === 0 ? (
            <div className="text-center text-gray-500">No media found.</div>
         ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
               {media.map((item) => (
                  <div
                     key={item.id}
                     className="relative bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                  >
                     <img
                        src={getImageUrl(item.image_path)}
                        alt={item.caption || "Gallery image"}
                        className="w-full h-64 object-cover"
                        loading="lazy"
                     />
                     <button
                        type="button"
                        onClick={() => setMenuOpen(item.id)}
                        className="absolute top-2 right-2 z-20 bg-gray-700 bg-opacity-60 text-white rounded-full p-1 hover:bg-opacity-80 focus:outline-none"
                        aria-label="Open menu"
                     >
                        <svg
                           className="w-6 h-6"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <circle cx="12" cy="6" r="1.5" />
                           <circle cx="12" cy="12" r="1.5" />
                           <circle cx="12" cy="18" r="1.5" />
                        </svg>
                     </button>
                     {menuOpen === item.id && (
                        <div className="absolute top-10 right-2 z-30 bg-white rounded shadow border w-32">
                           <button
                              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                              onClick={() => {
                                 handleDelete(item.id);
                                 setMenuOpen(null);
                              }}
                           >
                              Delete
                           </button>
                           <button
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setMenuOpen(null)}
                           >
                              Cancel
                           </button>
                        </div>
                     )}
                     {item.caption && (
                        <div className="p-2 text-center text-sm text-gray-700">
                           {item.caption}
                        </div>
                     )}
                  </div>
               ))}
            </div>
         )}
      </div>
   );
}
