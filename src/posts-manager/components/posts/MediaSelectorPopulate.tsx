import React, { useEffect, useState } from "react";
import { getAuth } from '@/admin/lib/localStorage';
import { cleanUrl, getImageUrl } from '@/lib/cleanUrl';

export interface MediaItem {
  id: number;
  // url: string;
  file_path: string; // Use file_path to match the API response
  alt_text?: string;
}

interface MediaSelectorProps {
  selectedMedia?: MediaItem | null;
  onSelect: (media: MediaItem) => void;
  isRequired?: boolean; // add isRequired prop
}

const API_HOST = import.meta.env.VITE_API_HOST || "http://localhost:8000";
const API_MEDIA = `${API_HOST}/api/media`;
const API_UPLOAD = `${API_HOST}/api/upload-media`;

export default function MediaSelectorPopulate({ selectedMedia, onSelect, isRequired = true }: MediaSelectorProps) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [altText, setAltText] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const auth = getAuth();
  const token = auth?.access_token;

  useEffect(() => {
    console.log("Fetching media with token:", token);
    if (!token) return;
    setLoading(true);
    fetch(`${API_MEDIA}?page=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        const processMedia = (arr: MediaItem[]) =>
          arr.map(item => ({ ...item, file_path: item.file_path }));
        if (Array.isArray(data)) {
          setMedia(processMedia(data));
          setTotalPages(1);
        } else {
          setMedia(processMedia(data.data || []));
          setTotalPages(data.last_page || 1);
          setPage(data.current_page || 1);
        }
      })
      .catch(() => setError("Failed to fetch media"))
      .finally(() => setLoading(false));
  }, [token, uploading, page]);

  // const getImageUrl = (imagePath: string) => {
  //   if (!imagePath) return "";
  //   if (imagePath.startsWith("http")) {
  //     return imagePath;
  //   }
  //   return `${API_HOST}${imagePath}`;
  // };
  return (
    <div className="max-w-lg mx-auto">
      <div className="border rounded-lg shadow-sm bg-white dark:bg-gray-900">
        {/* Tabs */}
        <div className="flex border-b">
          <button
            type="button"
            className={`flex-1 px-4 py-2 text-center font-medium transition-colors ${!showUpload ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50 dark:bg-blue-950' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            onClick={() => setShowUpload(false)}
            disabled={!showUpload}
          >
            Select Media
          </button>
          <button
            type="button"
            className={`flex-1 px-4 py-2 text-center font-medium transition-colors ${showUpload ? 'border-b-2 border-green-500 text-green-600 bg-green-50 dark:bg-green-950' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            onClick={() => setShowUpload(true)}
            disabled={showUpload}
          >
            Upload Media
          </button>
        </div>
        {/* Preview Section */}
        {!showUpload && selectedMedia && (
          <div className="p-4 border-b bg-gray-50 dark:bg-gray-800 flex flex-col items-center">
            {/* <img
              src={getImageUrl(selectedMedia.url)}
              alt={selectedMedia.alt_text || 'Selected media'}
              className="h-32 w-auto object-contain rounded shadow mb-2"
            /> */}
            <div className="text-xs text-gray-700 dark:text-gray-200 text-center truncate max-w-xs">
              {selectedMedia.file_path || 'No alt text'}
            </div>
          </div>
        )}
        {/* Input Group Content */}
        <div className="p-4">
          {showUpload ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label htmlFor="media-upload-file" className="bg-blue-600 text-white px-4 py-1 rounded cursor-pointer hover:bg-blue-700 transition-colors">
                  Choose File
                </label>
                <input
                  id="media-upload-file"
                  type="file"
                  name="file"
                  accept="image/*"
                  required={isRequired}
                  className="hidden"
                  onClick={e => (e.currentTarget.value = '')}
                />
                <span id="media-upload-filename" className="text-sm text-gray-700"></span>
              </div>
              {/* <input type="text" name="alt_text" placeholder="Alt text" value={altText} onChange={e => setAltText(e.target.value)} className="border rounded px-2 py-1" /> */}
              <button
                className="bg-green-600 text-white px-4 py-1 rounded"
                disabled={uploading}
                onClick={async () => {
                  const fileInput = document.getElementById('media-upload-file') as HTMLInputElement;
                  if (!fileInput.files || !fileInput.files[0]) return;
                  setUploading(true);
                  const formData = new FormData();
                  formData.append("file", fileInput.files[0]);
                  formData.append("alt_text", altText);
                  try {
                    await fetch(API_UPLOAD, {
                      method: "POST",
                      headers: { Authorization: `Bearer ${token}` },
                      body: formData,
                    });
                    setShowUpload(false); // Switch to select tab first
                    setAltText("");
                    setPage(1); // Optionally reset to first page
                  } catch {
                    setError("Upload failed");
                  } finally {
                    setUploading(false); // This will trigger refetch
                  }
                }}
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                {loading ? <div>Loading...</div> :
                  media.length === 0 ? <div className="col-span-3 text-center text-gray-400">No media found.</div> :
                    media.map(item => (
                      <div key={item.id} className={`border rounded p-1 cursor-pointer transition-all ${selectedMedia?.id === item.id ? 'border-blue-500 ring-2 ring-blue-400' : 'hover:border-blue-300'}`} onClick={() => onSelect(item)}>
                        <img src={getImageUrl(item.file_path)} alt={item.alt_text || "media"} className="h-20 w-full object-cover rounded" />
                        <div className="text-xs truncate text-center mt-1">{item.alt_text}</div>
                        {selectedMedia?.id === item.id && <div className="text-xs text-blue-600 font-semibold text-center">Selected</div>}
                      </div>
                    ))}
              </div>
              <div className="flex justify-center items-center gap-2 mt-2">
                <button type="button" className="px-2 py-1 rounded bg-gray-200" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
                <span className="text-xs">Page {page} of {totalPages}</span>
                <button type="button" className="px-2 py-1 rounded bg-gray-200" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
              </div>
            </>
          )}
          {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
        </div>
      </div>
    </div>
  );
}
