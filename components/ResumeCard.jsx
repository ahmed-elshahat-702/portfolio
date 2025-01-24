import { Skeleton } from "./ui/skeleton";

const ResumeCard = ({ data }) => {
  return (
    <div className="bg-background shadow-sm h-fit w-full md:flex max-sm:p-4 p-8">
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
    </div>
  );
};

export default ResumeCard;
