"use client";

import { useState } from "react";
import { useSiteContent } from "@/components/content-provider";
import { ViewportReveal } from "@/components/viewport-reveal";

export function AdminLoginPage() {
  const { dictionary, locale } = useSiteContent();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <section className="section page-intro">
      <ViewportReveal className="container auth-shell">
        <div className="auth-copy">
          <p className="section-kicker">{dictionary.nav.admin}</p>
          <h1>{dictionary.admin.loginTitle}</h1>
          <p className="lead-text">{dictionary.admin.loginSubtitle}</p>
        </div>

        <form
          className="auth-card"
          onSubmit={async (event) => {
            event.preventDefault();
            setMessage("");
            setLoading(true);

            const formData = new FormData(event.currentTarget);
            const response = await fetch("/api/admin/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: String(formData.get("email") ?? ""),
                password: String(formData.get("password") ?? ""),
              }),
            });

            if (response.ok) {
              const nextPath = new URL(window.location.href).searchParams.get("next");
              window.location.href = nextPath || `/${locale}/admin`;
              return;
            }

            const payload = (await response.json().catch(() => ({}))) as {
              message?: string;
            };
            setMessage(payload.message ?? "Unable to sign in.");
            setLoading(false);
          }}
        >
          <label>
            {dictionary.admin.email}
            <input name="email" type="email" autoComplete="username" required />
          </label>
          <label>
            {dictionary.admin.password}
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </label>
          <button className="button-primary" type="submit" disabled={loading}>
            {loading ? dictionary.admin.signingIn : dictionary.admin.signIn}
          </button>
          {message ? <p className="success-note">{message}</p> : null}
        </form>
      </ViewportReveal>
    </section>
  );
}