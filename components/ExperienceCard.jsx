import React from "react";
import { Skeleton } from "./ui/skeleton";

const ExperienceCard = ({ experience }) => {
  return (
    <div className="bg-background shadow-sm h-fit w-full md:flex max-sm:p-4 p-8">
      <div className="md:flex-1 space-y-1">
        <h1 className="text-lg font-bold text-blue-600">
          {!experience ? (
            <Skeleton className="w-[100px] h-[25px] rounded" />
          ) : (
            `${experience.start_time} - ${experience.end_time}`
          )}
        </h1>
        <h3 className="font-bold">
          {!experience ? (
            <Skeleton className="w-[60px] h-[25px] rounded" />
          ) : (
            experience.skill
          )}
        </h3>

        {!experience ? (
          <Skeleton className="w-[80px] h-[20px] rounded" />
        ) : (
          <p>{experience.level} </p>
        )}
        {!experience ? (
          <Skeleton className="w-[80px] h-[20px] rounded" />
        ) : (
          <p className="text-blue-600 font-semibold">{experience.site}</p>
        )}
      </div>
      <div className="py-2 md:flex-1">
        {!experience ? (
          <div className="flex flex-col gap-2">
            <Skeleton className="w-full h-[20px] rounded" />
            <Skeleton className="w-5/6 h-[20px] rounded" />
            <Skeleton className="w-full h-[20px] rounded" />
            <Skeleton className="w-4/6 h-[20px] rounded" />
            <Skeleton className="w-5/6 h-[20px] rounded" />
            <Skeleton className="w-full h-[20px] rounded" />
          </div>
        ) : (
          experience.info
        )}
      </div>
    </div>
  );
};

export default ExperienceCard;
