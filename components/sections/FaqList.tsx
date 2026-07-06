import type { Faq } from "@/types/marketplace";

type FaqListProps = {
  faqs: Faq[];
};

export function FaqList({ faqs }: FaqListProps) {
  return (
    <div className="grid gap-3">
      {faqs.map((faq) => (
        <details key={faq.question} className="group rounded-lg border bg-card p-5 shadow-sm">
          <summary className="cursor-pointer list-none text-base font-semibold">
            <span className="flex items-center justify-between gap-4">
              {faq.question}
              <span className="text-primary transition group-open:rotate-45">+</span>
            </span>
          </summary>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
