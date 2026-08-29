"use client";

import { useMemo, useState } from "react";
import { Braces, CheckCircle2, Database, Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { adminFieldCount, adminFieldModules } from "@/lib/admin-fields";
import { cn } from "@/lib/utils";

export function AdminFieldExplorer() {
  const [query, setQuery] = useState("");
  const [activeModule, setActiveModule] = useState("all");

  const visibleModules = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return adminFieldModules
      .filter((module) => activeModule === "all" || module.id === activeModule)
      .map((module) => {
        if (!normalizedQuery) return module;

        const moduleMatches = [module.label, module.description, ...module.collections]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

        const sections = module.sections
          .map((section) => ({
            ...section,
            fields: moduleMatches
              ? section.fields
              : section.fields.filter((field) => field.toLowerCase().includes(normalizedQuery))
          }))
          .filter((section) => section.fields.length > 0);

        return { ...module, sections };
      })
      .filter((module) => module.sections.length > 0);
  }, [activeModule, query]);

  const visibleFieldCount = visibleModules.reduce(
    (total, module) => total + module.sections.reduce((moduleTotal, section) => moduleTotal + section.fields.length, 0),
    0
  );

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <Badge variant="secondary">
            <Database className="size-3" aria-hidden /> Schema reference
          </Badge>
          <h2 className="mt-3 text-2xl font-bold">CMS field explorer</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            Search the fields available to editors across the Directus collections and Supabase data model.
          </p>
        </div>
        <div className="flex gap-2 text-sm">
          <Badge variant="outline">{adminFieldModules.length} groups</Badge>
          <Badge variant="outline">{adminFieldCount} fields</Badge>
        </div>
      </div>

      <div className="sticky top-20 z-20 border-y bg-background/95 py-4 backdrop-blur">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search fields, modules, or collection names"
            aria-label="Search admin fields"
            className="focus-ring h-11 w-full rounded-md border bg-background pl-10 pr-11 text-sm outline-none"
          />
          {query ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setQuery("")}
              aria-label="Clear field search"
              title="Clear search"
              className="absolute right-0.5 top-0.5"
            >
              <X className="size-4" aria-hidden />
            </Button>
          ) : null}
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Admin field groups">
          <button
            type="button"
            role="tab"
            aria-selected={activeModule === "all"}
            onClick={() => setActiveModule("all")}
            className={cn(
              "focus-ring min-h-9 shrink-0 rounded-md border px-3 text-xs font-semibold transition-colors",
              activeModule === "all" ? "border-primary bg-primary text-primary-foreground" : "bg-background hover:bg-muted"
            )}
          >
            All fields
          </button>
          {adminFieldModules.map((module) => (
            <button
              key={module.id}
              type="button"
              role="tab"
              aria-selected={activeModule === module.id}
              onClick={() => setActiveModule(module.id)}
              className={cn(
                "focus-ring min-h-9 shrink-0 rounded-md border px-3 text-xs font-semibold transition-colors",
                activeModule === module.id ? "border-primary bg-primary text-primary-foreground" : "bg-background hover:bg-muted"
              )}
            >
              {module.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted-foreground" aria-live="polite">
        Showing <span className="font-semibold text-foreground">{visibleFieldCount}</span> field{visibleFieldCount === 1 ? "" : "s"} in {visibleModules.length} group{visibleModules.length === 1 ? "" : "s"}.
      </p>

      {visibleModules.length ? (
        <div className="grid gap-5">
          {visibleModules.map((module) => (
            <Card key={module.id} className="overflow-hidden">
              <div className="border-b bg-muted/50 p-5 sm:flex sm:items-start sm:justify-between sm:gap-5">
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-bold">
                    <Braces className="size-5 text-primary" aria-hidden /> {module.label}
                  </h3>
                  <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">{module.description}</p>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-0 sm:justify-end">
                  {module.collections.map((collection) => (
                    <code key={collection} className="rounded-sm border bg-background px-2 py-1 text-xs text-muted-foreground">
                      {collection}
                    </code>
                  ))}
                </div>
              </div>
              <div className="grid gap-0 sm:grid-cols-2 xl:grid-cols-3">
                {module.sections.map((section) => (
                  <section key={section.label} className="border-b p-5 sm:border-r">
                    <h4 className="text-sm font-bold">{section.label}</h4>
                    <ul className="mt-3 grid gap-2">
                      {section.fields.map((field) => (
                        <li key={field} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-secondary" aria-hidden />
                          <span>{field}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid min-h-52 place-items-center rounded-lg border border-dashed p-8 text-center">
          <div>
            <Search className="mx-auto size-6 text-muted-foreground" aria-hidden />
            <p className="mt-3 font-semibold">No matching fields</p>
            <p className="mt-1 text-sm text-muted-foreground">Try a broader term or choose all fields.</p>
          </div>
        </div>
      )}
    </div>
  );
}
