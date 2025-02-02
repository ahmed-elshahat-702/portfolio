import { Edit2, ExternalLink, LinkIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";

const ProjectCard = ({
  project,
  isAdmin,
  handleDeleteClick,
  handleUpdateClick,
}) => {
  return (
    <div className="bg-background shadow-sm w-full max-w-[600px] h-full flex flex-col justify-between relative">
      <div className="py-4">
        <div className="header border-l-8 border-main  p-2 flex flex-col gap-2">
          <h1 className="text-2xl max-sm:text-lg font-bold capitalize text-main">
            {!project ? (
              <Skeleton className="w-[250px] max-w-full h-[30px] rounded" />
            ) : (
              project.name
            )}
          </h1>
          <h3 className="max-sm:text-sm font-semibold lowercase text-main">
            {!project ? (
              <Skeleton className="w-[400px] max-w-full h-[25px] rounded" />
            ) : (
              <Link href={project.link} target="_blank">
                <div className="flex items-center space-x-2">
                  <span>
                    <LinkIcon className="w-4 h-4" />
                  </span>
                  <span>{project.link}</span>
                  <span>
                    <ExternalLink className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            )}
          </h3>
          <h5 className="text-sm">
            {!project ? (
              <Skeleton className="w-[250px] max-w-full h-[20px] rounded" />
            ) : (
              project.description
            )}
          </h5>
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
      {isAdmin ? (
        <div className="absolute right-2 top-2 flex items-center gap-1">
          <Button
            variant="ghost"
            className="p-2 h-fit"
            onClick={() => handleUpdateClick(project._id, project)}
          >
            <Edit2 className="w-4 h-4 text-main" />
          </Button>
          <Button
            variant="ghost"
            className="p-2 h-fit"
            onClick={() => handleDeleteClick(project._id)}
          >
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default ProjectCard;
