import React from "react";
import { Skeleton } from "./ui/skeleton";

const SkillCard = ({ skill }) => {
  return skill ? (
    <div className=" font-semibold w-fit pl-4 flex items-center gap-2">
      <div className="w-4 h-4 bg-blue-600"></div>
      <h1>{skill.text}</h1>
    </div>
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
