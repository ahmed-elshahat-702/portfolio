"use client";
import EducationCard from "@/components/EducationCard";
import ExperienceCard from "@/components/ExperienceCard";
import SkillCard from "@/components/SkillCard";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [experiences, setExperiences] = useState();
  const [education, setEducation] = useState();
  const [skills, setSkills] = useState();

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await axios.get("/api/experiences");
        setExperiences(res.data);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    };

    const fetchEducation = async () => {
      try {
        const res = await axios.get("/api/education");
        setEducation(res.data);
      } catch (error) {
        console.error("Error fetching education:", error);
      }
    };
    const fetchSkills = async () => {
      try {
        const res = await axios.get("/api/skills");
        setSkills(res.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
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

          {education ? (
            education.map((education, index) => (
              <EducationCard key={index} education={education} />
            ))
          ) : (
            <EducationCard />
          )}
        </div>
        <div>
          <h1 className="font-bold text-2xl mb-4">Skills</h1>
          <div className="bg-background shadow-sm h-fit w-full p-8 grid grid-cols-3 max-sm:grid-cols-2 max-[350px]:grid-cols-1 gap-4">
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
