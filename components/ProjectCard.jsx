import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-background shadow h-fit w-full">
      <div className="py-4">
        <div className="header border-l-8 border-blue-600 text-blue-600 pl-2 flex flex-col gap-2">
          <h1 className="text-2xl max-sm:text-lg font-bold capitalize">
            {!project ? (
              <Skeleton className="w-[250px] h-[30px] rounded" />
            ) : (
              project.name
            )}
          </h1>
          <h3 className="max-sm:text-sm font-bold lowercase">
            {!project ? (
              <Skeleton className="w-[400px] h-[25px] rounded" />
            ) : (
              <Link href={project.link}>{project.link}</Link>
            )}
          </h3>
        </div>
        <div className="px-4 py-2 max-sm:text-sm">
          {!project ? (
            <div className="flex flex-col gap-2">
              <Skeleton className="w-full h-[20px] rounded" />
              <Skeleton className="w-4/6 h-[20px] rounded" />
            </div>
          ) : (
            project.info
          )}
        </div>
      </div>
      {!project ? (
        <div className="flex flex-col gap-2">
          <Skeleton className="w-full h-[300px]" />
        </div>
      ) : (
        <Image
          src={project.image}
          alt="website image"
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
          width={700}
          height={300}
        />
      )}
    </div>
  );
};

export default ProjectCard;
