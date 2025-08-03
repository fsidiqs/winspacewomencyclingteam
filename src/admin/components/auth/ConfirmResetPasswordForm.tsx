import { useState } from "react";
import { useNavigate } from "react-router";
import Label from "@/admin/components/form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

export default function ConfirmResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const API_HOST = import.meta.env.VITE_API_HOST || 'http://localhost:8000';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await fetch(`${API_HOST}/api/reset-password/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          code,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      setSuccess("Password updated successfully. Redirecting to sign in...");
      setTimeout(() => navigate("/wos-connect"), 2000);
    } catch (err: any) {
      setError(err.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto">
        <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
          Update Password
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enter your email, code, and new password.
        </p>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <Label>Email <span className="text-error-500">*</span></Label>
              <Input placeholder="info@gmail.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <Label>Code <span className="text-error-500">*</span></Label>
              <Input placeholder="Enter code" value={code} onChange={e => setCode(e.target.value)} />
            </div>
            <div>
              <Label>New Password <span className="text-error-500">*</span></Label>
              <Input type="password" placeholder="New password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div>
              <Label>Confirm Password <span className="text-error-500">*</span></Label>
              <Input type="password" placeholder="Confirm password" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} />
            </div>
            {error && <div className="text-error-500 text-sm">{error}</div>}
            {success && <div className="text-green-600 text-sm">{success}</div>}
            <div>
              <Button className="w-full" size="sm" disabled={loading}>
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
