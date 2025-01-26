import { cn } from "@/lib/utils";

const MaxWidthContainer = ({ children, className }) => {
  return (
    <div
      className={cn(
        "min-h-screen max-w-full w-sm sm:w-lg md:w-2xl xl:w-4xl mx-auto max-sm:px-4 py-8",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthContainer;
