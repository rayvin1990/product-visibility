"use client";

import { FormEvent, useMemo, useState } from "react";

const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "";

export function RequestForm() {
  const [productName, setProductName] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [category, setCategory] = useState("");
  const [offerTier, setOfferTier] = useState("$199 readiness audit");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [website, setWebsite] = useState("");
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const requestText = useMemo(() => {
    return [
      "AI visibility snapshot request",
      "",
      `Product name: ${productName || "(not provided)"}`,
      `Product URL: ${productUrl || "(not provided)"}`,
      `Category / buyer / market: ${category || "(not provided)"}`,
      `Interested in: ${offerTier}`,
      `Contact email: ${email || "(not provided)"}`,
      "",
      "Notes:",
      notes || "(not provided)",
      "",
      "Please check:",
      "- AI recommendation visibility",
      "- competitor mentions in buyer-intent prompts",
      "- cited sources and missing source gaps",
      "- category, comparison, and alternative page gaps",
      "- obvious repair actions for this week"
    ].join("\n");
  }, [category, email, notes, offerTier, productName, productUrl]);

  const mailtoHref = useMemo(() => {
    if (!SUPPORT_EMAIL) {
      return "";
    }

    const subject = `AI visibility snapshot: ${productName || productUrl || "new product"}`;
    return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(requestText)}`;
  }, [productName, productUrl, requestText]);

  const gmailHref = useMemo(() => {
    if (!SUPPORT_EMAIL) {
      return "";
    }

    const subject = `AI visibility snapshot: ${productName || productUrl || "new product"}`;
    const params = new URLSearchParams({
      view: "cm",
      fs: "1",
      to: SUPPORT_EMAIL,
      su: subject,
      body: requestText
    });

    return `https://mail.google.com/mail/?${params.toString()}`;
  }, [productName, productUrl, requestText]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/visibility-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productName,
          productUrl,
          category,
          offerTier,
          email,
          notes,
          website
        })
      });

      const data = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !data.ok) {
        setStatus("error");
        setMessage(data.message || "Could not submit directly. Please use Gmail draft or email draft below.");
        return;
      }

      setStatus("success");
      setMessage(data.message || "Thanks. I will review your product and AI visibility gaps.");
    } catch {
      setStatus("error");
      setMessage("Could not submit directly. Please use Gmail draft or email draft below.");
    }
  }

  async function copyRequest() {
    await navigator.clipboard.writeText(requestText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <form id="request" className="form-card" onSubmit={submit}>
      <div className="form-head">
        <div>
          <h2>Request an AI visibility snapshot</h2>
          <p>I will check whether AI answers recommend you, ignore you, or replace you with competitors.</p>
        </div>
        <div className="mail-icon">@</div>
      </div>

      <label className="field">
        <span>Product name</span>
        <input
          value={productName}
          onChange={(event) => setProductName(event.target.value)}
          placeholder="Example: Lockscreen Todo"
        />
      </label>

      <label className="field">
        <span>Product URL</span>
        <input
          required
          type="url"
          value={productUrl}
          onChange={(event) => setProductUrl(event.target.value)}
          placeholder="https://yourproduct.com"
        />
      </label>

      <div className="field-grid">
        <label className="field">
          <span>Category or buyer</span>
          <input
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            placeholder="B2B analytics tool for finance teams..."
          />
        </label>

        <label className="field">
          <span>Interested in</span>
          <select value={offerTier} onChange={(event) => setOfferTier(event.target.value)}>
            <option>$49 mini snapshot</option>
            <option>$199 readiness audit</option>
            <option>$499 repair pack</option>
            <option>Not sure yet</option>
          </select>
        </label>
      </div>

      <label className="field">
        <span>Your email</span>
        <input
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
        />
      </label>

      <label className="field">
        <span>Anything I should know?</span>
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Competitors show up in ChatGPT, we have comparison pages missing, or we need a category visibility check..."
        />
      </label>

      <label className="hidden-field" aria-hidden="true">
        <span>Website</span>
        <input
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </label>

      <div className="button-row">
        <button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Submitting..." : "Try direct submit"}
        </button>
        {SUPPORT_EMAIL ? (
          <>
            <a className="secondary" href={gmailHref} target="_blank" rel="noreferrer">
              Open Gmail draft
            </a>
            <a className="secondary" href={mailtoHref}>
              Open email draft
            </a>
          </>
        ) : null}
        <button className="secondary" type="button" onClick={copyRequest}>
          {copied ? "Copied" : "Copy request"}
        </button>
      </div>

      {message ? <p className={`form-message ${status}`}>{message}</p> : null}

      <p className="helper">
        The first pass is manual and agent-assisted. If direct submit is not configured, use Gmail draft or email draft.
      </p>
    </form>
  );
}
