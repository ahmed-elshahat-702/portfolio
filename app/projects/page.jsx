"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import ProjectCard from "@/components/ProjectCard";
import Square from "@/components/Square";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";

const page = () => {
  const [projects, setProjects] = useState();
  const toast = useToast();

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await axios.get("/api/projects");
        setProjects(res.data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          message: "Error fetching projects",
        });
      }
    }
    fetchProjects();
  }, []);
  return (
    <MaxWidthContainer className={"space-y-12"}>
      <div className="heading text-center flex flex-col gap-10 items-center">
        <div className="flex gap-2 items-center justify-center font-bold w-full">
          <Square />
          <h1 className="text-4xl">Projects</h1>(
          {!projects ? (
            <LoadingSpinner />
          ) : (
            <div className="text-3xl flex items-center gap-1">
              <span className="text-main">"</span>
              {projects.length}
              <span className="text-main">"</span>
            </div>
          )}
          )
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

      {projects ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 justify-items-center">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <ProjectCard />
        </div>
      )}
    </MaxWidthContainer>
  );
};

export default page;
