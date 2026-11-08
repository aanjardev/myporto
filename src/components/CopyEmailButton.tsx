"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import styles from "@/app/contact/contact.module.css";

export default function CopyEmailButton({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => {
    if (status !== "copied") return;
    const timer = setTimeout(() => setStatus("idle"), 3000);
    return () => clearTimeout(timer);
  }, [status]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className={styles.copyControl}>
      <button type="button" className={styles.copyButton} onClick={copyEmail}>
        {status === "copied" ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
        {status === "copied" ? "Copied!" : "Copy email"}
      </button>
      <span role="status" className={styles.copyStatus}>
        {status === "copied" && "Email address copied."}
        {status === "error" && "Please select and copy the email address above."}
      </span>
    </div>
  );
}
