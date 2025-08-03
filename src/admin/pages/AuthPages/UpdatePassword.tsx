import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";
import UpdatePasswordForm from "@/admin/components/auth/UpdatePasswordForm";

export default function UpdatePassword() {
  return (
    <>
      <PageMeta
        title="Winspacewomencyclingteam SignIn Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthLayout>
        <UpdatePasswordForm />
      </AuthLayout>
    </>
  );
}
