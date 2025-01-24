import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const LoadingSpinner = ({ className }) => {
  return <Loader2 className={cn("animate-spin text-main", className)} />;
};

export default LoadingSpinner;
