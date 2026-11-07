"use client";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";
  const isLoginPage = pathname.startsWith("/admin/login");

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f0f2f5" }}>
      <AdminSidebar />
      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minHeight: "100vh" }}>
        {children}
      </main>
    </div>
  );
}
