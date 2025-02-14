import { Edit2, Trash2 } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";

const ResumeCard = ({
  data,
  isAdmin,
  handleDeleteClick,
  handleUpdateClick,
}) => {
  return (
    <div className="bg-background shadow-sm h-fit w-full md:flex max-sm:p-4 p-8 relative">
      <div className="md:flex-1 space-y-1">
        <h1 className="text-lg font-bold text-main">
          {!data ? (
            <Skeleton className="w-[100px] h-[25px] rounded" />
          ) : (
            `${data.start_time} - ${data.end_time}`
          )}
        </h1>
        <h3 className="font-bold">
          {!data ? (
            <Skeleton className="w-[60px] h-[25px] rounded" />
          ) : (
            data.skill
          )}
        </h3>

        {!data ? (
          <Skeleton className="w-[80px] h-[20px] rounded" />
        ) : (
          <p>{data.level} </p>
        )}
        {!data ? (
          <Skeleton className="w-[80px] h-[20px] rounded" />
        ) : (
          <p className="text-main font-semibold">{data.site}</p>
        )}
      </div>
      <div className="py-2 md:flex-1">
        {!data ? (
          <div className="flex flex-col gap-2">
            <Skeleton className="w-full h-[20px] rounded" />
            <Skeleton className="w-5/6 h-[20px] rounded" />
            <Skeleton className="w-full h-[20px] rounded" />
            <Skeleton className="w-4/6 h-[20px] rounded" />
            <Skeleton className="w-5/6 h-[20px] rounded" />
            <Skeleton className="w-full h-[20px] rounded" />
          </div>
        ) : (
          data.description
        )}
      </div>
      {isAdmin ? (
        <div className="absolute right-2 top-2 flex items-center gap-1">
          <Button
            variant="ghost"
            className="p-2 h-fit"
            onClick={() => handleUpdateClick(data._id, data)}
          >
            <Edit2 className="w-4 h-4 text-main" />
          </Button>
          <Button
            variant="ghost"
            className="p-2 h-fit"
            onClick={() => handleDeleteClick(data._id)}
          >
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default ResumeCard;
