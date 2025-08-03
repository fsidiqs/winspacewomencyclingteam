const API_HOST = import.meta.env.VITE_API_HOST || 'http://localhost:8000';


// Utility to clean up URLs that may have duplicate http(s) in them
export function cleanUrl(url: string): string {
  const secondHttp = url.indexOf('http', 1);
  return secondHttp !== -1 ? url.slice(secondHttp) : url;
}

export function getImageUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("http")) {
    return url;
  }
  // Ensure we don't double up on slashes or 'storage' in the path
  let cleanedUrl = url;
  if (cleanedUrl.startsWith("/")) {
    cleanedUrl = cleanedUrl.replace(/^\/+/, "");
  }
  if (cleanedUrl.startsWith("storage/")) {
    cleanedUrl = cleanedUrl.replace(/^storage\//, "");
  }
  return `${API_HOST}/storage/${cleanedUrl}`;
};

export function formatDateString(dateStr: string) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', timeZone: 'UTC' });
}
