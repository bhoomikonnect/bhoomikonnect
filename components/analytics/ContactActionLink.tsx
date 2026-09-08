"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

type ContactActionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  channel: "call" | "whatsapp";
  source: string;
  propertySlug?: string;
  children: ReactNode;
};

/** Records an anonymous contact-intent event before opening the phone or WhatsApp app. */
export function ContactActionLink({ channel, source, propertySlug, children, onClick, ...props }: ContactActionLinkProps) {
  function track() {
    void fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        name: "Anonymous visitor",
        phone: "0000000000",
        source,
        leadType: channel === "call" ? "Call Click" : "WhatsApp Click",
        propertySlug,
        sourcePage: window.location.pathname,
        message: `Visitor selected the ${channel === "call" ? "Call" : "WhatsApp"} action.`,
        consent: false,
        website: "",
        metadata: {
          contactChannel: channel === "call" ? "Phone call" : "WhatsApp",
          pageTitle: document.title,
          pageUrl: window.location.href,
          referrer: document.referrer || "Direct visit"
        }
      })
    });
  }

  return <a {...props} onClick={(event) => { track(); onClick?.(event); }}>{children}</a>;
}
