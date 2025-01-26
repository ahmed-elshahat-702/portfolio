"use client";
import AddItemDialog from "@/components/AddItemDialog";
import LoadingSpinner from "@/components/LoadingSpinner";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import ProjectCard from "@/components/ProjectCard";
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
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import useStore from "@/hooks/useStore";
import { Plus } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const toast = useToast();

  const {
    isLoading,
    projects,
    experiences,
    education,
    skills,
    fetchProjects,
    fetchExperiences,
    fetchEducation,
    fetchSkills,
    addProject,
    addExperience,
    addEducation,
    addSkill,
  } = useStore();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("");

  const handleAddClick = (type) => {
    setDialogType(type);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogSave = async (data) => {
    try {
      switch (dialogType) {
        case "Project":
          await addProject(data);
          await fetchProjects();
          break;
        case "Experience":
          await addExperience(data);
          await fetchExperiences();
          break;
        case "Education":
          await addEducation(data);
          await fetchEducation();
          break;
        case "Skill":
          await addSkill(data);
          await fetchSkills();
          break;
        default:
          break;
      }

      setDialogOpen(false);
    } catch (error) {
      console.error("Save error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to save data",
      });
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      const fetchAllData = async () => {
        try {
          await Promise.all([
            fetchProjects(),
            fetchExperiences(),
            fetchEducation(),
            fetchSkills(),
          ]);
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to fetch data",
          });
        }
      };
      fetchAllData();
    }
  }, [status, fetchProjects, fetchExperiences, fetchEducation, fetchSkills]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-4">
        <LoadingSpinner size="lg" />
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading Dashboard</h2>
          <p className="text-muted-foreground">
            Please wait while we fetch your data...
          </p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Square />
              Access Denied
            </CardTitle>
            <CardDescription className="ml-6">
              Please sign in to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link
                href="/dashboard/signin"
                className={buttonVariants({
                  className: "w-full",
                })}
              >
                Sign in to Dashboard
              </Link>
              <div className="relative text-center">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>
              <Link
                href="/"
                className={buttonVariants({
                  variant: "secondary",
                  className: "w-full",
                })}
              >
                Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <AddItemDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onSave={handleDialogSave}
        type={dialogType}
      />
      <MaxWidthContainer className={"space-y-12"}>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="heading text-center flex flex-col gap-20 items-center">
          <div className="flex gap-2 items-baseline font-bold w-fit pl-4">
            <Square />
            <h1 className="text-4xl">Dashboard</h1>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Welcome, {session?.user?.name}</h1>
          <Button
            variant="destructive"
            onClick={() => {
              signOut();
            }}
          >
            Log out
          </Button>
        </div>
        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full h-fit grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="projects">
              Projects ({isLoading && <LoadingSpinner />}
              {projects && (
                <span className="text-main mx-1">{projects.length}</span>
              )}
              {!projects && !isLoading && 0})
            </TabsTrigger>
            <TabsTrigger value="experiences">
              Experiences ({isLoading && <LoadingSpinner />}
              {experiences && (
                <span className="text-main mx-1">{experiences.length}</span>
              )}
              {!experiences && !isLoading && 0})
            </TabsTrigger>
            <TabsTrigger value="education">
              Education ({isLoading && <LoadingSpinner />}
              {education && (
                <span className="text-main mx-1">{education.length}</span>
              )}
              {!education && !isLoading && 0})
            </TabsTrigger>
            <TabsTrigger value="skills">
              Skills ({isLoading && <LoadingSpinner />}
              {skills && (
                <span className="text-main mx-1">{skills.length}</span>
              )}
              {!skills && !isLoading && 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            {isLoading && (
              <div className="w-full h-full mt-20 flex items-center justify-center">
                <LoadingSpinner />
              </div>
            )}
            {projects && (
              <div className="w-full h-full">
                <Button
                  variant="gh</TabsContent>ost"
                  className="w-full my-4 border-2 border-dashed border-main"
                  onClick={() => handleAddClick("Project")}
                >
                  <span className="mx-2">
                    <Plus className="w-4 h-4" />
                  </span>
                  Add new project
                </Button>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 justify-items-center">
                  {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                  ))}
                </div>
              </div>
            )}
            {!projects && !isLoading && <div>There is no projects yet!</div>}
          </TabsContent>

          <TabsContent value="experiences">
            {isLoading && (
              <div className="w-full h-full mt-20 flex items-center justify-center">
                <LoadingSpinner />
              </div>
            )}
            {experiences && (
              <div className="w-full h-full">
                <Button
                  variant="ghost"
                  className="w-full my-4 border-2 border-dashed border-main"
                  onClick={() => handleAddClick("Experience")}
                >
                  <span className="mx-2">
                    <Plus className="w-4 h-4" />
                  </span>
                  Add new experience
                </Button>
                <div className="grid grid-cols-1 gap-6  justify-items-center">
                  {experiences.map((experience, index) => (
                    <ResumeCard key={index} data={experience} />
                  ))}
                </div>
              </div>
            )}
            {!experiences && !isLoading && (
              <div>There is no experiences yet!</div>
            )}
          </TabsContent>
          <TabsContent value="education">
            {isLoading && (
              <div className="w-full h-full mt-20 flex items-center justify-center">
                <LoadingSpinner />
              </div>
            )}
            {education && (
              <div className="w-full h-full">
                <Button
                  variant="ghost"
                  className="w-full my-4 border-2 border-dashed border-main"
                  onClick={() => handleAddClick("Education")}
                >
                  <span className="mx-2">
                    <Plus className="w-4 h-4" />
                  </span>
                  Add new education
                </Button>
                <div className="grid grid-cols-1 gap-6  justify-items-center">
                  {education.map((education, index) => (
                    <ResumeCard key={index} data={education} />
                  ))}
                </div>
              </div>
            )}
            {!education && !isLoading && <div>There is no education yet!</div>}
          </TabsContent>
          <TabsContent value="skills">
            {isLoading && (
              <div className="w-full h-full mt-20 flex items-center justify-center">
                <LoadingSpinner />
              </div>
            )}
            {skills && (
              <div className="w-full h-full">
                <Button
                  variant="ghost"
                  className="w-full my-4 border-2 border-dashed border-main"
                  onClick={() => handleAddClick("Skill")}
                >
                  <span className="mx-2">
                    <Plus className="w-4 h-4" />
                  </span>
                  Add new skill
                </Button>
                <div className="bg-background grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                  {skills.map((skill, index) => (
                    <SkillCard key={index} skill={skill} />
                  ))}
                </div>
              </div>
            )}
            {!skills && !isLoading && <div>There is no skills yet!</div>}
          </TabsContent>
        </Tabs>
      </MaxWidthContainer>
    </div>
  );
}
