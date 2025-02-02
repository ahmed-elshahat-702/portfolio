import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full outline-none transition bg-secondary border border-b-2 border-input px-3 py-2 text-base file:border-0 file:bg-main file:text-main-foreground file:px-2 file:py-px file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-b-main focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
