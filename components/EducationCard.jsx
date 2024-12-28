import React from "react";
import { Skeleton } from "./ui/skeleton";

const EducationCard = ({ education }) => {
  return (
    <div className="bg-background shadow-sm h-fit w-full md:flex p-8">
      <div className="md:flex-1 space-y-1">
        <h1 className="text-lg font-bold text-blue-600">
          {!education ? (
            <Skeleton className="w-[100px] h-[25px] rounded" />
          ) : (
            `${education.start_time} - ${education.end_time}`
          )}
        </h1>
        <h3 className="font-bold">
          {!education ? (
            <Skeleton className="w-[60px] h-[25px] rounded" />
          ) : (
            education.skill
          )}
        </h3>

        {!education ? (
          <Skeleton className="w-[80px] h-[20px] rounded" />
        ) : (
          <p>{education.level} </p>
        )}
        {!education ? (
          <Skeleton className="w-[80px] h-[20px] rounded" />
        ) : (
          <p className="text-blue-600 font-semibold">{education.site}</p>
        )}
      </div>
      <div className="pl-4 py-2 md:flex-1">
        {!education ? (
          <div className="flex flex-col gap-2">
            <Skeleton className="w-full h-[20px] rounded" />
            <Skeleton className="w-5/6 h-[20px] rounded" />
            <Skeleton className="w-full h-[20px] rounded" />
            <Skeleton className="w-4/6 h-[20px] rounded" />
            <Skeleton className="w-5/6 h-[20px] rounded" />
            <Skeleton className="w-full h-[20px] rounded" />
          </div>
        ) : (
          education.info
        )}
      </div>
    </div>
  );
};

export default EducationCard;
