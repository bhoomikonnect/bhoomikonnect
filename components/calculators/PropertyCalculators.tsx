"use client";

import { useMemo, useState } from "react";
import { Calculator, RefreshCw, Ruler, WalletCards } from "lucide-react";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Mode = "emi" | "construction" | "area";

function money(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value || 0);
}

export function PropertyCalculators() {
  const [mode, setMode] = useState<Mode>("emi");
  const [loan, setLoan] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const [area, setArea] = useState(1800);
  const [floors, setFloors] = useState(2);
  const [quality, setQuality] = useState(2200);
  const [squareFeet, setSquareFeet] = useState(1200);

  const emi = useMemo(() => {
    const months = years * 12;
    const monthly = rate / 1200;
    if (!months || !monthly) return 0;
    return loan * monthly * Math.pow(1 + monthly, months) / (Math.pow(1 + monthly, months) - 1);
  }, [loan, rate, years]);
  const total = emi * years * 12;
  const constructionTotal = area * floors * quality;

  const tabs: Array<{ id: Mode; label: string; icon: typeof Calculator }> = [
    { id: "emi", label: "EMI", icon: WalletCards },
    { id: "construction", label: "Construction Cost", icon: Calculator },
    { id: "area", label: "Area Converter", icon: Ruler }
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
      <Card className="overflow-hidden">
        <div className="grid grid-cols-3 border-b bg-muted p-2" role="tablist" aria-label="Property calculators">
          {tabs.map((tab) => <button key={tab.id} type="button" onClick={() => setMode(tab.id)} className={`focus-ring flex min-h-12 items-center justify-center gap-2 rounded-md px-2 text-xs font-semibold sm:text-sm ${mode === tab.id ? "bg-background text-primary shadow-sm" : "text-muted-foreground"}`} aria-selected={mode === tab.id} role="tab"><tab.icon className="size-4 shrink-0" aria-hidden /><span>{tab.label}</span></button>)}
        </div>
        <div className="p-5 sm:p-6">
          {mode === "emi" ? <div><h2 className="text-2xl font-bold">Home loan EMI</h2><p className="mt-2 text-sm text-muted-foreground">Estimate monthly repayment. Lender terms may differ.</p><div className="mt-6 grid gap-4 sm:grid-cols-3"><label className="grid gap-2 text-sm font-semibold">Loan amount<Input type="number" min="0" value={loan} onChange={(event) => setLoan(Number(event.target.value))} /></label><label className="grid gap-2 text-sm font-semibold">Interest rate %<Input type="number" min="0" step="0.1" value={rate} onChange={(event) => setRate(Number(event.target.value))} /></label><label className="grid gap-2 text-sm font-semibold">Tenure years<Input type="number" min="1" max="40" value={years} onChange={(event) => setYears(Number(event.target.value))} /></label></div><div className="mt-6 grid gap-3 sm:grid-cols-3">{[["Monthly EMI", money(emi)], ["Total interest", money(total - loan)], ["Total payment", money(total)]].map(([label, value]) => <div key={label} className="rounded-md bg-muted p-4"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 text-xl font-bold">{value}</p></div>)}</div></div> : null}
          {mode === "construction" ? <div><h2 className="text-2xl font-bold">Construction cost estimate</h2><p className="mt-2 text-sm text-muted-foreground">A planning estimate based on built-up area, floors, and quality rate.</p><div className="mt-6 grid gap-4 sm:grid-cols-3"><label className="grid gap-2 text-sm font-semibold">Built-up area / floor<Input type="number" min="0" value={area} onChange={(event) => setArea(Number(event.target.value))} /></label><label className="grid gap-2 text-sm font-semibold">Floors<Input type="number" min="1" max="20" value={floors} onChange={(event) => setFloors(Number(event.target.value))} /></label><label className="grid gap-2 text-sm font-semibold">Price / sq.ft<select value={quality} onChange={(event) => setQuality(Number(event.target.value))} className="focus-ring min-h-11 rounded-md border bg-background px-3"><option value="1800">Essential ₹1,800</option><option value="2200">Standard ₹2,200</option><option value="2850">Premium ₹2,850</option></select></label></div><div className="mt-6 rounded-md bg-primary p-5 text-white"><p className="text-sm text-white/75">Estimated construction cost</p><p className="mt-1 text-3xl font-bold">{money(constructionTotal)}</p><p className="mt-2 text-xs text-white/75">Excludes land, approvals, unusual foundation conditions, design fees, and local taxes.</p></div></div> : null}
          {mode === "area" ? <div><h2 className="text-2xl font-bold">Area converter</h2><p className="mt-2 text-sm text-muted-foreground">Convert common Indian real-estate area units from square feet.</p><label className="mt-6 grid gap-2 text-sm font-semibold">Square feet<Input type="number" min="0" value={squareFeet} onChange={(event) => setSquareFeet(Number(event.target.value))} /></label><div className="mt-6 grid gap-3 sm:grid-cols-2">{[["Square yards", squareFeet / 9], ["Square metres", squareFeet / 10.7639], ["Acres", squareFeet / 43560], ["Cents", squareFeet / 435.6], ["Guntas", squareFeet / 1089]].map(([label, value]) => <div key={String(label)} className="rounded-md bg-muted p-4"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 text-xl font-bold">{Number(value).toLocaleString("en-IN", { maximumFractionDigits: 3 })}</p></div>)}</div></div> : null}
          <Button type="button" variant="ghost" size="sm" className="mt-5" onClick={() => { setLoan(5000000); setRate(8.5); setYears(20); setArea(1800); setFloors(2); setQuality(2200); setSquareFeet(1200); }}><RefreshCw className="size-4" aria-hidden /> Reset</Button>
        </div>
      </Card>
      <QuoteForm title="Request a detailed estimate" leadType={mode === "construction" ? "Construction Quote" : "General Contact"} source="Calculator" compact />
    </div>
  );
}
