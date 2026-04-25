"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  href: string;
}

export default function Breadcrumbs() {
  const pathname = usePathname();

  // Generate breadcrumb items based on pathname
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = pathname.split("/").filter(Boolean);

    const breadcrumbs: BreadcrumbItem[] = [{ name: "Home", href: "/" }];

    let currentPath = "";

    paths.forEach((path, index) => {
      currentPath += `/${path}`;

      // Format name: capitalize first letter, replace hyphens with spaces
      let name = path
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      // Special cases for specific routes
      if (path === "projects") name = "Projects";
      if (path === "work") name = "Work Experience";
      if (path === "credentials") name = "Credentials";
      if (path === "contact") name = "Contact";

      breadcrumbs.push({
        name,
        href: currentPath,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on home page
  if (pathname === "/") return null;

  return (
    <nav
      className="py-3 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-100"
      aria-label="Breadcrumb"
    >
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center flex-wrap gap-1 text-sm">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <li key={item.href} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                )}

                {isLast ? (
                  <span className="text-gray-600 font-medium">
                    {index === 0 ? (
                      <Home className="w-4 h-4 inline mr-1" />
                    ) : null}
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-[#1E3A5F] transition-colors flex items-center gap-1"
                  >
                    {index === 0 ? <Home className="w-4 h-4" /> : null}
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
