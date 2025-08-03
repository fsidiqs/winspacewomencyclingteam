import { useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { Link } from "react-router";

export default function UpdatePasswordCard() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const API_HOST = import.meta.env.VITE_API_HOST || 'http://localhost:8000';

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_HOST}/api/user/update-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
          new_password_confirmation: confirmPassword,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to update password");
      }
      setSuccess("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
              <svg className="fill-current text-gray-400 dark:text-gray-500" width="40" height="40" viewBox="0 0 24 24"><path d="M12 17a2 2 0 0 1-2-2v-2a2 2 0 0 1 4 0v2a2 2 0 0 1-2 2zm6-2v-2a6 6 0 1 0-12 0v2a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4zm-8-2a4 4 0 1 1 8 0v2H6v-2z"/></svg>
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                Update Password
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Change your account password.
                </p>
              </div>
            </div>
            <div className="flex items-center order-2 gap-2 grow xl:order-3 xl:justify-end">
             
              <Link
                to="/update-password"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-brand-500 bg-brand-500 px-4 py-3 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 hover:text-white dark:bg-brand-400 dark:hover:bg-brand-500 lg:inline-flex lg:w-auto"
              >
                <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18"><path fillRule="evenodd" clipRule="evenodd" d="M12 2a2 2 0 0 1 2 2v2h-1V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v2H4V4a2 2 0 0 1 2-2h6zm-6 4V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2h-6zm8 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8h10zm-1 0H5v8a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V8z"/></svg>
                Go to Update Password Page
              </Link>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
