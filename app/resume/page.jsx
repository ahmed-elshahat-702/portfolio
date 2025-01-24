"use client";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import ResumeCard from "@/components/ResumeCard";
import SkillCard from "@/components/SkillCard";
import Square from "@/components/Square";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";

const page = () => {
  const toast = useToast();
  const [experiences, setExperiences] = useState(null);
  const [education, setEducation] = useState(null);
  const [skills, setSkills] = useState(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await axios.get("/api/experiences");
        setExperiences(res.data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          message: "Failed to fetch experiences",
        });
      }
    };

    const fetchEducation = async () => {
      try {
        const res = await axios.get("/api/education");
        setEducation(res.data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          message: "Failed to fetch education",
        });
      }
    };
    const fetchSkills = async () => {
      try {
        const res = await axios.get("/api/skills");
        setSkills(res.data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          message: "Failed to fetch skills",
        });
      }
    };

    fetchExperiences();
    fetchEducation();
    fetchSkills();
  }, []);
  return (
    <MaxWidthContainer className={"space-y-12"}>
      <div className="heading text-center flex flex-col gap-20 items-center">
        <div className="flex gap-2 items-baseline font-bold w-fit pl-4">
          <Square />
          <h1 className="text-4xl">Resume</h1>
        </div>
      </div>
      <div className="experiences">
        <h1 className="font-bold text-2xl mb-4 flex items-center gap-1">
          <span className="text-main">"</span>
          Experiences
          <span className="text-main">"</span>
        </h1>
        <div className="flex flex-col gap-2">
          {experiences ? (
            experiences.map((experiences, index) => (
              <ResumeCard key={index} data={experiences} />
            ))
          ) : (
            <ResumeCard />
          )}
        </div>
      </div>
      <div>
        <h1 className="font-bold text-2xl mb-4 flex items-center gap-1">
          <span className="text-main">"</span>
          Education
          <span className="text-main">"</span>
        </h1>
        <div className="flex flex-col gap-2">
          {education ? (
            education.map((education, index) => (
              <ResumeCard key={index} data={education} />
            ))
          ) : (
            <ResumeCard />
          )}
        </div>
      </div>
      <div>
        <h1 className="font-bold text-2xl mb-4 flex items-center gap-1">
          <span className="text-main">"</span>
          Skills
          <span className="text-main">"</span>
        </h1>
        <div className="bg-background shadow-sm h-fit w-full p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {skills ? (
            skills.map((skill, index) => (
              <SkillCard key={index} skill={skill} />
            ))
          ) : (
            <SkillCard />
          )}
        </div>
      </div>
    </MaxWidthContainer>
  );
};

export default page;
