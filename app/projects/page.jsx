"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import ProjectCard from "@/components/ProjectCard";
import Square from "@/components/Square";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useToast } from "@/hooks/use-toast";
import useStore from "@/hooks/useStore";
import { useEffect } from "react";

const page = () => {
  const { isFetchingProjects, projects, fetchProjects } = useStore();
  const toast = useToast();

  useEffect(() => {
    try {
      fetchProjects();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An Error occured during fetching projects",
      });
    }
  }, []);
  return (
    <MaxWidthContainer className={"space-y-12"}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Projects</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="heading text-center flex flex-col gap-10 items-center">
        <div className="flex gap-2 items-center justify-center font-bold w-full">
          <Square />
          <h1 className="text-4xl">Projects</h1>(
          {isFetchingProjects && !projects && <LoadingSpinner />}
          {!isFetchingProjects && projects && (
            <div className="text-3xl flex items-center gap-1">
              <span className="text-main">"</span>
              {projects.length}
              <span className="text-main">"</span>
            </div>
          )}
          {!isFetchingProjects && !projects && <span>0</span>})
        </div>
        <p className="max-w-3xl">
          I specialize in front-end development, driven by a passion for
          creating engaging digital experiences. My skills encompass HTML5,
          CSS3, JavaScript, and various frameworks like React, Next.js an
          more.... I focus on mboth the technical and design aspects of web
          development, ensuring user-centered, visually appealing, and intuitive
          interfaces. I hope you like it
        </p>
      </div>

      {isFetchingProjects && !projects && (
        <div className="flex flex-col items-center">
          <ProjectCard />
        </div>
      )}

      {!isFetchingProjects && projects && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 justify-items-center">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      )}

      {!isFetchingProjects && !projects && (
        <div className="flex items-center justify-center">
          <p>there is no projects</p>
        </div>
      )}
    </MaxWidthContainer>
  );
};

export default page;
