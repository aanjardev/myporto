"use client";
import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") ?? "/admin";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push(from);
    } else {
      const data = await res.json();
      setError(data.error ?? "Login gagal");
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#0c1f3f",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24, fontFamily: "var(--font-body)",
    }}>
      <div aria-hidden style={{ position: "fixed", top: "-20%", right: "-10%", width: 600, height: 600, background: "radial-gradient(circle, rgba(45,90,142,0.4) 0%, transparent 65%)", borderRadius: "50%", pointerEvents: "none" }} />
      <div aria-hidden style={{ position: "fixed", bottom: "-15%", left: "-5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(8,23,46,1) 0%, transparent 65%)", borderRadius: "50%", pointerEvents: "none" }} />

      <div style={{
        background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.10)", borderRadius: 20,
        padding: "40px 36px", width: "100%", maxWidth: 400, position: "relative",
      }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(255,255,255,0.10)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 16, border: "1px solid rgba(255,255,255,0.15)" }}>
            <Lock style={{ width: 24, height: 24, color: "#fff" }} />
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "#fff", margin: 0 }}>Admin Login</h1>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, marginTop: 6 }}>Masukkan password untuk melanjutkan</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.7)", marginBottom: 8 }}>Password</label>
            <div style={{ position: "relative" }}>
              <input
                id="admin-password"
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoFocus
                style={{
                  width: "100%", padding: "12px 44px 12px 14px",
                  background: "rgba(255,255,255,0.07)", border: `1px solid ${error ? "#f87171" : "rgba(255,255,255,0.15)"}`,
                  borderRadius: 10, color: "#fff", fontSize: 15, fontFamily: "inherit",
                  outline: "none", boxSizing: "border-box",
                }}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", border: "none", background: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", padding: 0, display: "flex" }}>
                {showPass ? <EyeOff style={{ width: 16, height: 16 }} /> : <Eye style={{ width: 16, height: 16 }} />}
              </button>
            </div>
            {error && <p style={{ fontSize: 13, color: "#f87171", marginTop: 6 }}>{error}</p>}
          </div>

          <button
            type="submit"
            id="admin-login-btn"
            disabled={loading || !password}
            style={{
              width: "100%", padding: "13px", borderRadius: 10, border: "none",
              background: loading || !password ? "rgba(255,255,255,0.15)" : "#2d5a8e",
              color: "#fff", fontSize: 15, fontWeight: 700,
              cursor: loading || !password ? "not-allowed" : "pointer",
              fontFamily: "var(--font-display)", letterSpacing: "0.02em",
            }}
          >
            {loading ? "Masuk..." : "Masuk ke Admin"}
          </button>
        </form>
      </div>
    </div>
  );
}
