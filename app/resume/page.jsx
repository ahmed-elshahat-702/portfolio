"use client";
import EducationCard from "@/components/EducationCard";
import ExperienceCard from "@/components/ExperienceCard";
import SkillCard from "@/components/SkillCard";
import React, { useEffect, useState } from "react";

const page = () => {
  const [experiences, setExperiences] = useState();
  const [educations, setEducations] = useState();
  const [skills, setSkills] = useState();

  useEffect(() => {
    const fetchExperiences = async () => {
      const res = await fetch("/experiences.json");
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setExperiences(data);
    };

    const fetchEducation = async () => {
      const res = await fetch("/educations.json");
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setEducations(data);
    };
    const fetchSkills = async () => {
      const res = await fetch("/skills.json");
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setSkills(data);
    };

    fetchExperiences();
    fetchEducation();
    fetchSkills();
  }, []);
  return (
    <div className="w-full min-h-full bg-[#e6dace] dark:bg-muted/40 flex flex-col items-center p-8 max-sm:px-4">
      <div className="w-[700px] mx-auto h-full max-lg:w-5/6 max-sm:w-full flex flex-col gap-20">
        <div className="heading text-center flex flex-col gap-20 items-center">
          <div className="flex gap-2 items-baseline font-bold w-fit pl-4">
            <div className="w-4 h-4 bg-blue-600"></div>
            <h1 className="text-4xl">Resume</h1>
          </div>
        </div>
        <div className="experiences">
          <h1 className="font-bold text-2xl mb-4">Experiences</h1>
          {experiences ? (
            experiences.map((experience, index) => (
              <ExperienceCard key={index} experience={experience} />
            ))
          ) : (
            <ExperienceCard />
          )}
        </div>
        <div>
          <h1 className="font-bold text-2xl mb-4">Education</h1>

          {educations ? (
            educations.map((education, index) => (
              <EducationCard key={index} education={education} />
            ))
          ) : (
            <EducationCard />
          )}
        </div>
        <div>
          <h1 className="font-bold text-2xl mb-4">Skills</h1>
          <div className="bg-background shadow h-fit w-full p-8 grid grid-cols-3 max-sm:grid-cols-2 max-[350px]:grid-cols-1 gap-4">
            {skills ? (
              skills.map((skill, index) => (
                <SkillCard key={index} skill={skill} />
              ))
            ) : (
              <SkillCard />
            )}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
