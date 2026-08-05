import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Images, Sparkles } from "lucide-react";
import { interiorPortfolio } from "@/lib/interior-portfolio";

const recentProjects = interiorPortfolio.slice(0, 5);

export function RecentInteriorWork() {
  const featured = recentProjects[0];
  const supporting = recentProjects.slice(1);

  return (
    <section className="overflow-hidden border-y border-white/10 bg-slate-950 py-12 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:py-16" aria-labelledby="recent-interior-heading">
      <div className="container">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
              <Sparkles className="size-4" aria-hidden /> Recently added
            </p>
            <h2 id="recent-interior-heading" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Our latest interior work
            </h2>
            <p className="mt-3 max-w-xl leading-7 text-slate-300">
              Freshly completed kitchens, living spaces, bedrooms, storage, lighting, and custom details from our recent projects.
            </p>
          </div>
          <Link href="/interiors" className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/20 px-5 py-2.5 text-sm font-bold transition hover:border-emerald-300 hover:bg-emerald-300 hover:text-slate-950 sm:self-auto">
            View all interior work <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <Link href={`/interior-projects/${featured.slug}`} className="group relative min-h-[390px] overflow-hidden rounded-2xl sm:min-h-[520px]">
            <Image src={featured.images[0]} alt={featured.title} fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">{featured.category}</p>
              <h3 className="mt-2 max-w-lg text-2xl font-bold sm:text-3xl">{featured.title}</h3>
              <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white/85"><Images className="size-4" aria-hidden /> {featured.images.length} project photos</p>
            </div>
          </Link>

          <div className="grid grid-cols-2 gap-4">
            {supporting.map((project) => (
              <Link key={project.slug} href={`/interior-projects/${project.slug}`} className="group relative min-h-[185px] overflow-hidden rounded-2xl sm:min-h-[250px]">
                <Image src={project.images[0]} alt={project.title} fill sizes="(min-width: 1024px) 21vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">{project.category}</p>
                  <h3 className="mt-1 text-sm font-bold leading-snug sm:text-lg">{project.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
