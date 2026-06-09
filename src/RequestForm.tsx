"use client";

import { FormEvent, useMemo, useState } from "react";

const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "you@example.com";

export function RequestForm() {
  const [productName, setProductName] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [copied, setCopied] = useState(false);

  const requestText = useMemo(() => {
    return [
      "Launch visibility check request",
      "",
      `Product name: ${productName || "(not provided)"}`,
      `Product URL: ${productUrl || "(not provided)"}`,
      `Category / buyer: ${category || "(not provided)"}`,
      `Contact email: ${email || "(not provided)"}`,
      "",
      "Notes:",
      notes || "(not provided)",
      "",
      "Please check:",
      "- Google brand search",
      "- intent keywords",
      "- launch pages and directories",
      "- Reddit / community demand",
      "- AI recommendation visibility",
      "- obvious missing visibility surfaces"
    ].join("\n");
  }, [category, email, notes, productName, productUrl]);

  const mailtoHref = useMemo(() => {
    const subject = `Launch visibility check: ${productName || productUrl || "new product"}`;
    return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(requestText)}`;
  }, [productName, productUrl, requestText]);

  const gmailHref = useMemo(() => {
    const subject = `Launch visibility check: ${productName || productUrl || "new product"}`;
    const params = new URLSearchParams({
      view: "cm",
      fs: "1",
      to: SUPPORT_EMAIL,
      su: subject,
      body: requestText
    });

    return `https://mail.google.com/mail/?${params.toString()}`;
  }, [productName, productUrl, requestText]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.location.href = mailtoHref;
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
          <h2>Send me your product URL</h2>
          <p>I will check where your product is visible, missing, or accidentally replaced by someone else.</p>
        </div>
        <div className="mail-icon">✉</div>
      </div>

      <label className="field">
        <span>Product name</span>
        <input value={productName} onChange={(event) => setProductName(event.target.value)} placeholder="Example: Lockscreen Todo" />
      </label>

      <label className="field">
        <span>Product URL</span>
        <input required type="url" value={productUrl} onChange={(event) => setProductUrl(event.target.value)} placeholder="https://yourproduct.com" />
      </label>

      <div className="field-grid">
        <label className="field">
          <span>Category or buyer</span>
          <input value={category} onChange={(event) => setCategory(event.target.value)} placeholder="AI tool for marketers..." />
        </label>

        <label className="field">
          <span>Your email</span>
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
        </label>
      </div>

      <label className="field">
        <span>Anything I should know?</span>
        <textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Just launched, Product Hunt page missing, AI tools do not mention us..." />
      </label>

      <div className="button-row">
        <button type="submit">Open email draft</button>
        <a className="secondary" href={gmailHref} target="_blank" rel="noreferrer">Open Gmail draft</a>
        <button className="secondary" type="button" onClick={copyRequest}>{copied ? "Copied" : "Copy request"}</button>
      </div>

      <p className="helper">Pure frontend MVP: this opens an email or Gmail draft. The sender still needs to press Send.</p>
    </form>
  );
}
