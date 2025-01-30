"use client";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import ResumeCard from "@/components/ResumeCard";
import SkillCard from "@/components/SkillCard";
import Square from "@/components/Square";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useStore from "@/hooks/useStore";

import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const page = () => {
  const {
    isFetchingExperiences,
    isFetchingEducation,
    isFetchingSkills,
    experiences,
    fetchExperiences,
    education,
    fetchEducation,
    skills,
    fetchSkills,
  } = useStore();
  const { toast } = useToast();

  useEffect(() => {
    try {
      fetchExperiences();
      fetchEducation();
      fetchSkills();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An Error occured during fetching data",
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
            <BreadcrumbPage>Resume</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
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
          {isFetchingExperiences && !experiences && <ResumeCard />}

          {!isFetchingExperiences &&
            experiences &&
            experiences.map((experience, index) => (
              <ResumeCard key={index} data={experience} />
            ))}

          {!isFetchingExperiences && !experiences && (
            <div className="flex items-center justify-center">
              <p>there is no experiences</p>
            </div>
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
          {isFetchingEducation && !education && <ResumeCard />}

          {!isFetchingEducation &&
            education &&
            education.map((education, index) => (
              <ResumeCard key={index} data={education} />
            ))}

          {!isFetchingEducation && !education && (
            <div className="flex items-center justify-center">
              <p>there is no education</p>
            </div>
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
          {isFetchingSkills && !skills && <SkillCard />}

          {!isFetchingSkills &&
            skills &&
            skills.map((skill, index) => (
              <SkillCard key={index} skill={skill} />
            ))}

          {!isFetchingSkills && !skills && (
            <div className="flex items-center justify-center">
              <p>there is no skills</p>
            </div>
          )}
        </div>
      </div>
    </MaxWidthContainer>
  );
};

export default page;
