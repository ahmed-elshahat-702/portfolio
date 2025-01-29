"use client";
import AddItemDialog from "@/components/dashboard/AddItemDialog";
import DeleteItemDialog from "@/components/dashboard/DeleteItemDialog";
import UpdateItemDialog from "@/components/dashboard/UpdateItemsDialog";
import LoadingSpinner from "@/components/LoadingSpinner";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import ProjectCard from "@/components/ProjectCard";
import ResumeCard from "@/components/ResumeCard";
import SkillCard from "@/components/SkillCard";
import Square from "@/components/Square";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Edit2, Plus } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const toast = useToast();

  const {
    isFetchingUserData,
    isFetchingProjects,
    isFetchingExperiences,
    isFetchingEducation,
    isFetchingSkills,
    userData,
    projects,
    experiences,
    education,
    skills,
    fetchUserData,
    fetchProjects,
    fetchExperiences,
    fetchEducation,
    fetchSkills,
    addProject,
    addExperience,
    addEducation,
    addSkill,
    deleteProject,
    deleteExperience,
    deleteEducation,
    deleteSkill,
    updateProject,
    updateExperience,
    updateEducation,
    updateSkill,
  } = useStore();

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addDialogType, setAddDialogType] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteDialogType, setDeleteDialogType] = useState("");
  const [deleteDialogId, setDeleteDialogId] = useState("");
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [updateDialogType, setUpdateDialogType] = useState("");
  const [updateDialogId, setUpdateDialogId] = useState("");
  const [initialData, setInitialData] = useState("");

  const handleAddClick = (type) => {
    setAddDialogType(type);
    setAddDialogOpen(true);
  };

  const handleDeleteClick = ({ type, id }) => {
    setDeleteDialogType(type);
    setDeleteDialogId(id);
    setDeleteDialogOpen(true);
  };

  const handleUpdateClick = ({ type, id, initialData }) => {
    setInitialData(initialData);
    setUpdateDialogType(type);
    setUpdateDialogId(id);
    setUpdateDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleUpdateDialogClose = () => {
    setInitialData("");
    setUpdateDialogOpen(false);
  };

  const handleDialogAdd = async (data) => {
    try {
      switch (addDialogType) {
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

      setAddDialogOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to save data",
      });
    }
  };

  const handleDialogDelete = async (id) => {
    try {
      switch (deleteDialogType) {
        case "Project":
          await deleteProject(id);
          await fetchProjects();
          break;
        case "Experience":
          await deleteExperience(id);
          await fetchExperiences();
          break;
        case "Education":
          await deleteEducation(id);
          await fetchEducation();
          break;
        case "Skill":
          await deleteSkill(id);
          await fetchSkills();
          break;
        default:
          break;
      }

      setDeleteDialogOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to save data",
      });
    }
  };

  const handleDialogUpdate = async (id, data) => {
    try {
      switch (updateDialogType) {
        case "Project":
          await updateProject(id, data);
          await fetchProjects();
          break;
        case "Experience":
          await updateExperience(id, data);
          await fetchExperiences();
          break;
        case "Education":
          await updateEducation(id, data);
          await fetchEducation();
          break;
        case "Skill":
          await updateSkill(id, data);
          await fetchSkills();
          break;
        default:
          break;
      }

      setUpdateDialogOpen(false);
    } catch (error) {
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
            fetchUserData(),
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
  }, [
    status,
    fetchUserData,
    fetchProjects,
    fetchExperiences,
    fetchEducation,
    fetchSkills,
  ]);

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
        open={addDialogOpen}
        onClose={handleAddDialogClose}
        onSave={handleDialogAdd}
        type={addDialogType}
      />
      <DeleteItemDialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        onDelete={handleDialogDelete}
        type={deleteDialogType}
        id={deleteDialogId}
      />
      <UpdateItemDialog
        open={updateDialogOpen}
        onClose={handleUpdateDialogClose}
        onUpdate={handleDialogUpdate}
        type={updateDialogType}
        id={updateDialogId}
        initialData={initialData}
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
        <Tabs defaultValue="user-data" className="w-full">
          <TabsList className="grid w-full h-fit grid-cols-2 sm:grid-cols-5">
            <TabsTrigger value="user-data">
              User data {isFetchingUserData && <LoadingSpinner />}
            </TabsTrigger>
            <TabsTrigger value="projects">
              Projects ({isFetchingProjects && <LoadingSpinner />}
              {projects && (
                <span className="text-main mx-1">{projects.length}</span>
              )}
              {!projects && !isFetchingProjects && 0})
            </TabsTrigger>
            <TabsTrigger value="experiences">
              Experiences ({isFetchingExperiences && <LoadingSpinner />}
              {experiences && (
                <span className="text-main mx-1">{experiences.length}</span>
              )}
              {!experiences && !isFetchingExperiences && 0})
            </TabsTrigger>
            <TabsTrigger value="education">
              Education ({isFetchingEducation && <LoadingSpinner />}
              {education && (
                <span className="text-main mx-1">{education.length}</span>
              )}
              {!education && !isFetchingEducation && 0})
            </TabsTrigger>
            <TabsTrigger value="skills">
              Skills ({isFetchingSkills && <LoadingSpinner />}
              {skills && (
                <span className="text-main mx-1">{skills.length}</span>
              )}
              {!skills && !isFetchingSkills && 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="user-data">
            {isFetchingUserData && (
              <div className="w-full h-full mt-20 flex items-center justify-center">
                <LoadingSpinner />
              </div>
            )}
            {userData && (
              <div className="w-full h-full flex flex-col items-center gap-6 py-8 ">
                <div className="flex items-center gap-4">
                  <h1 className="text-lg font-semibold">Avatar:</h1>
                  <div className="relative rouded-full ">
                    <Avatar className="w-32 h-32 relative">
                      <AvatarImage
                        src={userData.avatar ?? "/images/avatar.png"}
                        alt="avatar"
                      />
                      <AvatarFallback>
                        <Image
                          src="/images/avatar.png"
                          alt="avatar"
                          fill
                          className="object-cover"
                        />
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      className="absolute bottom-0 right-0 rounded-full"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <h1 className="text-lg font-semibold">Name:</h1>
                  <p className="text-2xl font-bold capitalize">
                    {userData.name}
                  </p>
                  <Button size="icon" className="rounded-full w-7 h-7">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <h1 className="text-lg font-semibold">Job:</h1>
                  <p className="job text-xl font-light uppercase">
                    {userData.job}
                  </p>
                  <Button size="icon" className="rounded-full w-7 h-7">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="w-full flex items-center flex-col gap-4">
                  <div className="flex items-center gap-2 p-2 border-b-2">
                    <h1 className="text-lg font-semibold">Social links</h1>
                    <Button size="icon" className="rounded-full w-7 h-7">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="w-fit flex flex-col gap-2">
                    <div className="md:flex items-start gap-4">
                      <h1 className="font-semibold">Facebook:</h1>
                      <Link
                        href={userData.facebook_link}
                        className="max-md:text-sm"
                      >
                        {userData.facebook_link}
                      </Link>
                    </div>
                    <div className="md:flex items-start gap-4">
                      <h1 className="font-semibold">Github:</h1>
                      <Link
                        href={userData.github_link}
                        className="max-md:text-sm"
                      >
                        {userData.github_link}
                      </Link>
                    </div>
                    <div className="md:flex items-start gap-4">
                      <h1 className="font-semibold">Youtube:</h1>
                      <Link
                        href={userData.youtube_link}
                        className="max-md:text-sm"
                      >
                        {userData.youtube_link}
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="max-w-lg flex flex-col gap-4 items-center">
                  <div className="flex items-center gap-2 p-2 border-b-2">
                    <h1 className="text-lg font-semibold">Info</h1>
                    <Button size="icon" className="rounded-full w-7 h-7">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-center">{userData.info}</p>
                </div>
              </div>
            )}
            {!userData && !isFetchingUserData && (
              <div>There is no user data yet!</div>
            )}
          </TabsContent>

          <TabsContent value="projects">
            {isFetchingProjects && (
              <div className="w-full h-full mt-20 flex items-center justify-center">
                <LoadingSpinner />
              </div>
            )}
            {projects && (
              <div className="w-full h-full">
                <Button
                  variant="ghost"
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
                    <ProjectCard
                      key={index}
                      project={project}
                      isAdmin={true}
                      handleDeleteClick={(id) => {
                        handleDeleteClick({
                          type: "Project",
                          id: id,
                        });
                      }}
                      handleUpdateClick={(id, initialData) => {
                        handleUpdateClick({
                          type: "Project",
                          id: id,
                          initialData: initialData,
                        });
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            {!projects && !isFetchingProjects && (
              <div>There is no projects yet!</div>
            )}
          </TabsContent>

          <TabsContent value="experiences">
            {isFetchingExperiences && (
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
                    <ResumeCard
                      key={index}
                      data={experience}
                      isAdmin={true}
                      handleDeleteClick={(id) => {
                        handleDeleteClick({
                          type: "Experience",
                          id: id,
                        });
                      }}
                      handleUpdateClick={(id, initialData) => {
                        handleUpdateClick({
                          type: "Experience",
                          id: id,
                          initialData: initialData,
                        });
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            {!experiences && !isFetchingExperiences && (
              <div>There is no experiences yet!</div>
            )}
          </TabsContent>
          <TabsContent value="education">
            {isFetchingEducation && (
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
                    <ResumeCard
                      key={index}
                      data={education}
                      isAdmin={true}
                      handleDeleteClick={(id) => {
                        handleDeleteClick({
                          type: "Education",
                          id: id,
                        });
                      }}
                      handleUpdateClick={(id, initialData) => {
                        handleUpdateClick({
                          type: "Education",
                          id: id,
                          initialData: initialData,
                        });
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            {!education && !isFetchingEducation && (
              <div>There is no education yet!</div>
            )}
          </TabsContent>
          <TabsContent value="skills">
            {isFetchingSkills && (
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
                    <SkillCard
                      key={index}
                      skill={skill}
                      isAdmin={true}
                      handleDeleteClick={(id) => {
                        handleDeleteClick({
                          type: "Skill",
                          id: id,
                        });
                      }}
                      handleUpdateClick={(id, initialData) => {
                        handleUpdateClick({
                          type: "Skill",
                          id: id,
                          initialData: initialData,
                        });
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            {!skills && !isFetchingSkills && <div>There is no skills yet!</div>}
          </TabsContent>
        </Tabs>
      </MaxWidthContainer>
    </div>
  );
}
