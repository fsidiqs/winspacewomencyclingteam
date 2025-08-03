import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { apiRequest } from "../../../admin/lib/api";
import { getAuth } from "../../../admin/lib/localStorage";
import ComponentCard from "../../../admin/components/common/ComponentCard";
import Label from "../../../admin/components/form/Label";
import Input from "../../../admin/components/form/input/InputField";
import DatePicker from "../../../admin/components/form/date-picker";
import MediaSelector, { MediaItem } from "@/posts-manager/components/posts/MediaSelector";


export default function EditRidersPage() {
  const { riderId } = useParams<{ riderId: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    date_of_birth: "",
    nationality: "",
    photo: "",
    bio: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  useEffect(() => {
    async function fetchRider() {
      setFetching(true);
      setError(null);
      try {
        const auth = getAuth();
        const token = auth?.access_token;
        const data = await apiRequest(`/api/riders/${riderId}`, "GET", undefined, false, token);
        setForm({
          name: data.name || "",
          date_of_birth: data.date_of_birth || "",
          nationality: data.nationality || "",
          photo: data.photo || "",
          bio: (data.info && data.info.bio) || "",
        });
        if (data.photo) {
          setSelectedMedia({ id: 0, file_path: data.photo, alt_text: data.name });
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch rider data");
      } finally {
        setFetching(false);
      }
    }
    fetchRider();
  }, [riderId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (dates: any, currentDateString: string) => {
    setForm((prev) => ({ ...prev, date_of_birth: currentDateString }));
  };

  const handleSelectMedia = (media: MediaItem) => {
    setSelectedMedia(media);
    setForm((prev) => ({ ...prev, photo: media.file_path }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const auth = getAuth();
      const token = auth?.access_token;
      await apiRequest(
        `/api/riders/${riderId}`,
        "PUT",
        { ...form, },
        false,
        token
      );
      setSuccess(true);
      setTimeout(() => navigate("/admin/riders"), 1200);
    } catch (err: any) {
      setError(err.message || "Failed to update rider");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="p-8 text-center text-gray-500">Loading rider data...</div>;
  }

  return (
    <ComponentCard title="Edit Rider">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" name="name" value={form.name} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="date_of_birth">Date of Birth</Label>
          <DatePicker
            id="date_of_birth"
            label=""
            placeholder="Select a date"
            onChange={handleDateChange}
            key={form.date_of_birth || undefined}
            defaultDate={form.date_of_birth}
          />
        </div>
        <div>
          <Label htmlFor="nationality">Nationality</Label>
          <Input type="text" id="nationality" name="nationality" value={form.nationality} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="photo">Photo</Label>
          <MediaSelector selectedMedia={selectedMedia} onSelect={handleSelectMedia} />
          {selectedMedia && (
            <div className="mt-2">
              <img src={selectedMedia.file_path} alt={selectedMedia.alt_text || "Selected photo"} className="h-24 rounded" />
            </div>
          )}
        </div>
        <div>
          <Label htmlFor="bio">Bio</Label>
          <textarea id="bio" name="bio" value={form.bio} onChange={handleChange} className="w-full border rounded p-2 min-h-[80px]" />
        </div>
       
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-600">Rider updated successfully!</div>}
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Rider"}
        </button>
      </form>
    </ComponentCard>
  );
}
