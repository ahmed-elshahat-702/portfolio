import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full px-3 py-2 outline-none transition bg-secondary border border-b-2 border-input text-base placeholder:text-muted-foreground focus:border-b-main focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
