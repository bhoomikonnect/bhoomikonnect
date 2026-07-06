import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      "focus-ring flex min-h-28 w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground",
      className
    )}
    ref={ref}
    {...props}
  />
));

Textarea.displayName = "Textarea";

export { Textarea };
