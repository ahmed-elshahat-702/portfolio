import { Trash2 } from "lucide-react";
import Square from "./Square";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const SkillCard = ({ skill, isAdmin, handleDeleteClick }) => {
  return skill ? (
    <>
      <div className="border p-1 font-semibold w-full flex items-center justify-between">
        <div className="pl-4 flex items-center gap-2">
          <Square />
          <h1>{skill.name}</h1>
        </div>
        {isAdmin ? (
          <Button
            variant="ghost"
            className="p-2 h-fit"
            onClick={() => handleDeleteClick(skill._id)}
          >
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
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
