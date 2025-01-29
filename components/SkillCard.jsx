import { cn } from "@/lib/utils";
import { Edit2, Trash2 } from "lucide-react";
import Square from "./Square";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const SkillCard = ({
  skill,
  isAdmin,
  handleDeleteClick,
  handleUpdateClick,
}) => {
  return skill ? (
    <>
      <div
        className={cn(
          "font-semibold w-full flex items-center justify-between",
          isAdmin ? "border p-1" : null
        )}
      >
        <div className="pl-4 flex items-center gap-2">
          <Square />
          <h1>{skill.name}</h1>
        </div>
        {isAdmin ? (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              className="p-2 h-fit"
              onClick={() => handleUpdateClick(skill._id, skill)}
            >
              <Edit2 className="w-4 h-4 text-main" />
            </Button>
            <Button
              variant="ghost"
              className="p-2 h-fit"
              onClick={() => handleDeleteClick(skill._id)}
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        ) : null}
      </div>
    </>
  ) : (
    <>
      <Skeleton className="w-5/6 h-[25px] rounded" />
      <Skeleton className="w-3/6 h-[25px] rounded" />
      <Skeleton className="w-4/6 h-[25px] rounded" />
      <Skeleton className="w-2/6 h-[25px] rounded" />
      <Skeleton className="w-5/6 h-[25px] rounded" />
      <Skeleton className="w-3/6 h-[25px] rounded" />
      <Skeleton className="w-4/6 h-[25px] rounded" />
      <Skeleton className="w-2/6 h-[25px] rounded" />
      <Skeleton className="w-4/6 h-[25px] rounded" />
    </>
  );
};

export default SkillCard;
