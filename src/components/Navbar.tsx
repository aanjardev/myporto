"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/credentials", label: "Credentials" },
    { href: "/work", label: "Work" },
    // { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href;
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "var(--canvas-light)",
        borderBottom: scrolled ? "1px solid var(--hairline-cloud)" : "1px solid transparent",
        boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.07)" : "none",
        transition: "border-color 0.25s, box-shadow 0.25s",
      }}
    >
      <div className="px-6 lg:px-0" style={{ maxWidth: 1152, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", height: 64, justifyContent: "space-between" }}>
          {/* Brand */}
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
              fontSize: 20,
              fontWeight: 700,
              color: "var(--canvas-dark)",
              letterSpacing: "-0.02em",
              flexShrink: 0,
            }}
          >
            Aanjar<span style={{ color: "var(--accent-navy-mid)" }}>.</span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            style={{
              alignItems: "center",
              gap: 4,
            }}
            className="hidden lg:flex"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  padding: "6px 14px",
                  borderRadius: "var(--r-md)",
                  fontSize: 13,
                  fontWeight: isActive(item.href) ? 700 : 500,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: isActive(item.href)
                    ? "var(--canvas-dark)"
                    : "var(--ink)",
                  backgroundColor: isActive(item.href)
                    ? "var(--canvas-press)"
                    : "transparent",
                  transition: "background 0.18s, color 0.18s",
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item.href)) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "var(--canvas-press)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.href)) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                  }
                }}
              >
                {item.label}
              </Link>
            ))}

            {/* CTA */}
            <Link
              href="/contact"
              className="btn-primary ml-4"
              style={{ padding: "8px 18px", textDecoration: "none" }}
            >
              Contact Me
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden"
            aria-label="Toggle menu"
            style={{
              padding: 8,
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--canvas-dark)",
            }}
          >
            {isOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav
            style={{
              paddingBottom: 16,
              borderTop: "1px solid var(--hairline-cloud)",
            }}
            className="lg:hidden"
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 2, paddingTop: 12 }}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    padding: "10px 14px",
                    borderRadius: "var(--r-md)",
                    fontSize: 13,
                    fontWeight: isActive(item.href) ? 700 : 500,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: isActive(item.href) ? "var(--canvas-dark)" : "var(--ink)",
                    backgroundColor: isActive(item.href) ? "var(--canvas-press)" : "transparent",
                  }}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="btn-primary"
                style={{
                  marginTop: 8,
                  justifyContent: "center",
                  textDecoration: "none",
                }}
              >
                Contact Me
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
