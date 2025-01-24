import { cn } from "@/lib/utils";

const Square = ({ className, ...props }) => {
  return (
    <div
      className={cn("w-4 h-4 bg-main", className)}
      aria-hidden="true"
      {...props}
    />
  );
};

export default Square;
