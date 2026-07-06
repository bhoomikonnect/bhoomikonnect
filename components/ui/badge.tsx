import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-sm border px-2.5 py-1 text-xs font-semibold",
  {
    variants: {
      variant: {
        default: "border-primary/20 bg-primary/10 text-primary dark:bg-primary/20 dark:text-teal-100",
        secondary: "border-secondary/20 bg-secondary/10 text-secondary dark:bg-secondary/20 dark:text-green-100",
        accent: "border-accent/30 bg-accent/15 text-amber-800 dark:text-amber-100",
        outline: "bg-background text-foreground",
        muted: "border-transparent bg-muted text-muted-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
