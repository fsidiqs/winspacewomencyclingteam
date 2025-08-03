import ResetPasswordForm from "@/admin/components/auth/ResetPasswordForm";
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import ForgotPasswordForm from "@/admin/components/auth/ResetPasswordForm";

export default function ForgotPassword() {
  return (
    <>
      <PageMeta
        title="Forgot Password | TailAdmin - React.js Admin Dashboard Template"
        description="Reset your password for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthLayout>
        <ForgotPasswordForm />
      </AuthLayout>
    </>
  );
}
