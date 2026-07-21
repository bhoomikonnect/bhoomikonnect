import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { publicEnv } from "@/lib/env";

export function FloatingActions() {
  return (
    <div className="global-floating-actions fixed bottom-4 right-4 z-40 flex flex-col gap-2 print:hidden">
      <a href={`tel:${publicEnv.phone.replace(/\s/g, "")}`} aria-label="Call BhoomiKonnect" title="Call now" className="grid size-12 place-items-center rounded-full border bg-background text-primary shadow-panel transition hover:-translate-y-0.5">
        <Phone className="size-5" aria-hidden />
      </a>
      <Link href={`https://wa.me/${publicEnv.whatsapp}`} target="_blank" aria-label="Chat on WhatsApp" title="WhatsApp" className="grid size-12 place-items-center rounded-full bg-secondary text-white shadow-panel transition hover:-translate-y-0.5">
        <MessageCircle className="size-5" aria-hidden />
      </Link>
    </div>
  );
}
