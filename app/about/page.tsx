import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Building2, Handshake, HeartHandshake, Home, Lightbulb, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { createMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = createMetadata({
  title: "About BhoomiKonnect | From Land to Dream Home",
  description: "Discover BhoomiKonnect's mission to connect property buyers, owners, developers, and home-service professionals through one trusted platform.",
  path: "/about",
  keywords: ["about BhoomiKonnect", "property and home services", "trusted property platform"]
});

const promises = [
  {
    title: "Trust at every step",
    icon: ShieldCheck,
    copy: "We aim to bring clearer property information, dependable professionals, and transparent conversations into every customer journey."
  },
  {
    title: "Everything in one place",
    icon: Home,
    copy: "Property discovery, construction, architecture, interiors, renovation, maintenance, and materials should work as one connected experience."
  },
  {
    title: "The right people, connected",
    icon: Handshake,
    copy: "We connect customers with developers, designers, contractors, service professionals, and suppliers suited to their requirements."
  },
  {
    title: "Decisions made simpler",
    icon: Lightbulb,
    copy: "Useful details, real project work, clear service scopes, and direct enquiries help customers move forward with confidence."
  }
];

const journey = [
  { label: "Find", text: "Explore suitable properties, projects, and trusted professionals." },
  { label: "Plan", text: "Share your needs and understand the right path for your budget and goals." },
  { label: "Create", text: "Move into construction, interiors, renovation, or other home services." },
  { label: "Care", text: "Continue with maintenance, improvements, and reliable support after completion." }
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b bg-emerald-950 py-14 text-white sm:py-20">
        <div className="absolute -left-20 top-0 size-72 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute -right-20 bottom-0 size-80 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="container relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">About BhoomiKonnect</p>
            <h1 className="mt-4 max-w-4xl text-balance text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              From Land to Dream Home — Everything Under One Roof
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-emerald-50/80">
              BhoomiKonnect exists to make the complete property journey easier, more connected, and more trustworthy—from finding the right place to creating a home that truly feels yours.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-6 shadow-2xl backdrop-blur sm:p-8">
            <HeartHandshake className="size-10 text-amber-300" aria-hidden />
            <p className="mt-5 text-xs font-bold uppercase tracking-widest text-emerald-300">Our motto</p>
            <h2 className="mt-2 text-2xl font-bold">One connection for every property need.</h2>
            <p className="mt-4 leading-7 text-emerald-50/75">
              Customers should not have to search across disconnected places for property, construction, design, materials, and maintenance. BhoomiKonnect brings these needs together through one dependable point of connection.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container">
          <SectionHeading eyebrow="What we stand for" title="A simpler and more confident property experience." description="Our work is guided by practical values that put customer clarity, useful connections, and dependable service first." />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {promises.map((promise) => (
              <Card key={promise.title} className="h-full p-5 transition hover:-translate-y-1 hover:shadow-lift">
                <span className="grid size-12 place-items-center rounded-lg bg-primary/10 text-primary"><promise.icon className="size-6" aria-hidden /></span>
                <h2 className="mt-5 text-lg font-bold">{promise.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{promise.copy}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y bg-emerald-50/70 py-12 dark:bg-emerald-950/20 sm:py-16">
        <div className="container grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <SectionHeading eyebrow="The complete journey" title="We stay relevant beyond the property search." description="BhoomiKonnect is designed to support the stages that come before and after a property decision." />
          <div className="grid gap-4 sm:grid-cols-2">
            {journey.map((item, index) => (
              <div key={item.label} className="rounded-xl border bg-background p-5 shadow-sm">
                <div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-full bg-primary text-sm font-bold text-white">{index + 1}</span><h3 className="text-xl font-bold">{item.label}</h3></div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container rounded-2xl bg-slate-950 px-6 py-10 text-white sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-2xl">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-300"><BadgeCheck className="size-4" /> Start your journey</p>
            <h2 className="mt-3 text-3xl font-bold">Let&apos;s turn your property requirement into the right next step.</h2>
            <p className="mt-3 leading-7 text-slate-300">Tell us whether you are looking for a property, interior work, construction support, renovation, or another home service.</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 lg:mt-0">
            <Link href="/projects" className={cn(buttonVariants({ variant: "secondary" }), "rounded-full")}>Explore projects <Building2 className="size-4" /></Link>
            <Link href="/contact" className={cn(buttonVariants({ variant: "outline" }), "rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white")}>Contact us <ArrowRight className="size-4" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
