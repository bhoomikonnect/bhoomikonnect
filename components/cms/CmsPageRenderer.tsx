import Link from "next/link";
import { ArrowRight, CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { FaqList } from "@/components/sections/FaqList";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CmsPageRecord, CmsPageSection } from "@/types/cms";

function paragraphs(body: string) {
  return body.split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean);
}

function splitItem(item: string) {
  const [first, ...rest] = item.split("|");
  return [first?.trim() || "", rest.join("|").trim()] as const;
}

function SectionHeader({ section }: { section: CmsPageSection }) {
  return (
    <div className="max-w-3xl">
      {section.eyebrow ? <p className="text-sm font-bold uppercase text-primary">{section.eyebrow}</p> : null}
      {section.heading ? <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{section.heading}</h2> : null}
      {paragraphs(section.body).map((paragraph) => <p key={paragraph} className="mt-4 text-base leading-7 text-muted-foreground">{paragraph}</p>)}
    </div>
  );
}

function Cta({ section, variant = "default" }: { section: CmsPageSection; variant?: "default" | "accent" }) {
  return section.cta_label && section.cta_url ? <Link href={section.cta_url} className={buttonVariants({ variant, size: "lg" })}>{section.cta_label}<ArrowRight className="size-4" aria-hidden /></Link> : null;
}

export function CmsPageRenderer({ page }: { page: CmsPageRecord }) {
  const hasHero = page.sections[0]?.block_type === "hero";
  return (
    <>
      {!hasHero ? <section className="border-b bg-muted/45 py-10"><div className="container"><p className="text-sm font-bold text-primary">BhoomiKonnect</p><h1 className="mt-3 text-4xl font-bold sm:text-5xl">{page.title}</h1></div></section> : null}
      {page.sections.map((section, index) => {
        if (section.block_type === "hero") return (
          <section key={section.id} className="relative min-h-[520px] overflow-hidden bg-slate-950 text-white sm:min-h-[600px]" style={section.image ? { backgroundImage: `linear-gradient(90deg, rgba(2, 18, 20, .86), rgba(2, 18, 20, .35)), url(${section.image})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}>
            <div className="container flex min-h-[520px] items-center py-14 sm:min-h-[600px]"><div className="max-w-3xl">{section.eyebrow ? <p className="text-sm font-bold uppercase text-amber-300">{section.eyebrow}</p> : null}<h1 className="mt-3 text-4xl font-bold sm:text-6xl">{section.heading || page.title}</h1>{paragraphs(section.body).map((paragraph) => <p key={paragraph} className="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">{paragraph}</p>)}<div className="mt-7"><Cta section={section} variant="accent" /></div></div></div>
          </section>
        );
        if (section.block_type === "text") return <section key={section.id} className={cn("py-12 sm:py-16", index % 2 ? "bg-muted/35" : "bg-background")}><div className="container"><SectionHeader section={section} /><div className="mt-7 grid gap-3 sm:grid-cols-2">{section.items.map((item) => <p key={item} className="flex items-start gap-2 text-sm leading-6"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-secondary" aria-hidden />{item}</p>)}</div><div className="mt-7"><Cta section={section} /></div></div></section>;
        if (section.block_type === "image") return <section key={section.id} className="py-12 sm:py-16"><div className="container grid gap-7 lg:grid-cols-2 lg:items-center"><div className="aspect-[4/3] rounded-lg bg-muted bg-cover bg-center" role="img" aria-label={section.image_alt || section.heading || page.title} style={section.image ? { backgroundImage: `url(${section.image})` } : undefined} /><div><SectionHeader section={section} /><div className="mt-7"><Cta section={section} /></div></div></div></section>;
        if (section.block_type === "cta") return <section key={section.id} className="bg-primary py-12 text-primary-foreground"><div className="container flex flex-col gap-6 md:flex-row md:items-center md:justify-between"><div className="max-w-3xl">{section.eyebrow ? <p className="text-sm font-bold uppercase text-amber-200">{section.eyebrow}</p> : null}<h2 className="mt-2 text-3xl font-bold">{section.heading}</h2><p className="mt-3 leading-7 text-teal-50">{section.body}</p></div><Cta section={section} variant="accent" /></div></section>;
        if (section.block_type === "statistics") return <section key={section.id} className="border-y bg-slate-950 py-12 text-white"><div className="container"><SectionHeader section={section} /><dl className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{section.items.map((item) => { const [label, value] = splitItem(item); return <div key={item} className="border-l-2 border-accent pl-4"><dd className="text-3xl font-bold">{value || label}</dd><dt className="mt-1 text-sm text-slate-300">{value ? label : "BhoomiKonnect"}</dt></div>; })}</dl></div></section>;
        if (section.block_type === "faq") { const faqs = section.items.map((item) => { const [question, answer] = splitItem(item); return { question, answer }; }).filter((item) => item.question && item.answer); return <section key={section.id} className="bg-muted/35 py-12 sm:py-16"><div className="container"><SectionHeader section={section} /><div className="mt-8 max-w-4xl"><FaqList faqs={faqs} /></div></div></section>; }
        if (section.block_type === "gallery") return <section key={section.id} className="py-12 sm:py-16"><div className="container"><SectionHeader section={section} /><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{section.items.map((image, imageIndex) => <div key={`${image}-${imageIndex}`} className="aspect-[4/3] rounded-lg bg-muted bg-cover bg-center" role="img" aria-label={`${section.image_alt || section.heading || page.title} ${imageIndex + 1}`} style={{ backgroundImage: `url(${image})` }} />)}</div></div></section>;
        if (section.block_type === "contact") return <section key={section.id} className="py-12 sm:py-16"><div className="container grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"><SectionHeader section={section} /><div className="flex flex-wrap gap-2"><Link href="/contact" className={buttonVariants({ variant: "default" })}><Mail className="size-4" aria-hidden /> Enquire now</Link><Link href="tel:+919000000000" className={buttonVariants({ variant: "outline" })}><Phone className="size-4" aria-hidden /> Call</Link><Link href="/cities" className={buttonVariants({ variant: "ghost" })}><MapPin className="size-4" aria-hidden /> Locations</Link></div></div></section>;
        return null;
      })}
    </>
  );
}
