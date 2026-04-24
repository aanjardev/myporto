"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-white border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-sm text-gray-400">
          © {currentYear} Aanjar Portfolio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
