import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  return (
    <section className="py-10 sm:py-14">
      <div className="container">
        <div className="grid gap-8 rounded-lg bg-slate-950 p-6 text-white shadow-lift sm:p-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-sm bg-white/10 px-3 py-1 text-sm font-semibold">
              <Mail className="size-4" aria-hidden /> Buyer intelligence
            </p>
            <h2 className="mt-4 text-3xl font-bold">Get curated project alerts before they become noisy.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              City launches, price movement, approval updates, and handpicked verified developer releases.
            </p>
          </div>
          <form action="/register" className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <Input type="email" name="email" placeholder="Email address" className="border-white/15 bg-white/10 text-white placeholder:text-slate-400" />
            <Button type="submit" variant="accent" size="lg">
              Join alerts
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
