"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import ProjectCard from "@/components/ProjectCard";
import { useEffect, useState } from "react";

const page = () => {
  const [projects, setProjects] = useState();

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("/projects.json");
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setProjects(data);
    };
    fetchProjects();
  }, []);
  return (
    <div className="w-full min-h-full bg-[#e6dace] dark:bg-muted/40 flex flex-col items-center p-8 max-sm:px-4">
      <div className="w-[700px] mx-auto h-full max-lg:w-5/6 max-sm:w-full flex flex-col gap-20">
        <div className="heading text-center flex flex-col gap-20 items-center">
          <div className="flex gap-2 items-center font-bold w-fit pl-4">
            <div className="w-4 h-4 bg-blue-600"></div>
            <h1 className="text-4xl">Projects</h1>(
            {!projects ? (
              <LoadingSpinner />
            ) : (
              <span className="text-3xl">{projects.length}</span>
            )}
            )
          </div>
          <p>
            I specialize in front-end development, driven by a passion for
            creating engaging digital experiences. My skills encompass HTML5,
            CSS3, JavaScript, and various frameworks like React, Next.js an
            more.... I focus on mboth the technical and design aspects of web
            development, ensuring user-centered, visually appealing, and
            intuitive interfaces. I hope you like it
          </p>
        </div>
        {projects ? (
          projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))
        ) : (
          <ProjectCard />
        )}
      </div>
    </div>
  );
};

export default page;
