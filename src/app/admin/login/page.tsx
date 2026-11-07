import { Suspense } from "react";
import AdminLoginPage from "./LoginForm";

export default function LoginPage() {
  return (
    <Suspense>
      <AdminLoginPage />
    </Suspense>
  );
}
