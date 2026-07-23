import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { publicContactLinks, publicEnv } from "@/lib/env";

export function FloatingActions() {
  if (!publicEnv.phone && !publicEnv.whatsapp) return null;

  return (
    <div className="global-floating-actions fixed bottom-4 right-4 z-40 flex flex-col gap-2 print:hidden">
      {publicEnv.phone ? <a href={publicContactLinks.phone} aria-label="Call BhoomiKonnect" title="Call now" className="grid size-12 place-items-center rounded-full border bg-background text-primary shadow-panel transition hover:-translate-y-0.5">
        <Phone className="size-5" aria-hidden />
      </a> : null}
      {publicEnv.whatsapp ? <Link href={publicContactLinks.whatsapp} target="_blank" aria-label="Chat on WhatsApp" title="WhatsApp" className="grid size-12 place-items-center rounded-full bg-secondary text-white shadow-panel transition hover:-translate-y-0.5">
        <MessageCircle className="size-5" aria-hidden />
      </Link> : null}
    </div>
  );
}
