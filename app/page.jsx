"use client";

import MaxWidthContainer from "@/components/MaxWidthContainer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import useStore from "@/hooks/useStore";
import { cn } from "@/lib/utils";
import { Facebook, GithubIcon, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const page = () => {
  const { isFetchingUserData, userData, fetchUserData } = useStore();

  const { toast } = useToast();

  useEffect(() => {
    try {
      fetchUserData();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An Error occured during fetching projects",
      });
    }
  }, []);

  return (
    <MaxWidthContainer className="bg-secondary-pink dark:bg-muted/40 flex items-center justify-center max-sm:py-0 max-sm:bg-primary-pink max-sm:w-full max-sm:px-0">
      <div className="max-sm:w-full sm:w-10/12 md:w-2/3 h-[1000px] md:h-[450px] flex max-md:flex-col shadow sm:shadow-2xl">
        <div className="flex-1 max-md:w-full max-md:h-1/2 bg-secondary-pink sm:bg-primary-pink dark:bg-muted flex flex-col justify-between items-center">
          <div className="h-full flex flex-col items-center justify-center gap-6 p-4 max-md:py-10">
            {isFetchingUserData && !userData && (
              <Skeleton className="w-32 h-32 rounded-full dark:bg-background" />
            )}
            {!isFetchingUserData && userData && (
              <Avatar className="w-32 h-32">
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
            )}

            <div className="name text-2xl font-bold capitalize">
              {isFetchingUserData && !userData && (
                <Skeleton className="w-[160px] h-[30px] rounded dark:bg-background" />
              )}
              {!isFetchingUserData && userData && userData.name}
            </div>
            <div
              className="devider w-20 h-[2px] bg-white rounded"
              aria-hidden="true"
            />
            <div className="job text-xl font-light uppercase">
              {isFetchingUserData && !userData && (
                <Skeleton className="w-[120px] h-[25px] rounded dark:bg-background" />
              )}
              {!isFetchingUserData && userData && userData.job}
            </div>
          </div>
          <div className="social w-full h-fit bg-background flex justify-center py-2 text-foreground">
            {isFetchingUserData && !userData && (
              <div className="flex items-center gap-2">
                <Skeleton className="w-[35px] h-[35px] rounded-full" />
                <Skeleton className="w-[35px] h-[35px] rounded-full" />
                <Skeleton className="w-[35px] h-[35px] rounded-full" />
              </div>
            )}
            {!isFetchingUserData && userData && (
              <div className="flex items-center gap-2">
                <Link
                  className={cn(buttonVariants({ variant: "ghost" }), "p-2")}
                  href={userData.facebook_link}
                >
                  <Facebook className="text-2xl" />
                </Link>
                <Separator className="w-px h-4" />
                <Link
                  className={cn(buttonVariants({ variant: "ghost" }))}
                  href={userData.github_link}
                >
                  <GithubIcon className="text-2xl" />
                </Link>
                <Separator className="w-px h-4" />
                <Link
                  className={cn(buttonVariants({ variant: "ghost" }))}
                  href={userData.youtube_link}
                >
                  <Youtube className="text-2xl" />
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 max-md:w-full max-md:h-1/2 bg-background flex flex-col justify-center gap-5 p-4">
          <h1 className="font-bold text-3xl md:text-5xl lg:text-6xl">Hello</h1>
          <h3 className="font-medium text-base md:text-lg lg:text-xl">
            Here's who I am & what I do
          </h3>
          <div className="w-full flex gap-4">
            <Link
              href="/projects"
              className={cn(
                buttonVariants(),
                "flex-1 bg-main hover:bg-main-hover dark:text-white rounded-full"
              )}
            >
              projects
            </Link>
            <Link
              href="/resume"
              className={cn(
                buttonVariants({
                  variant: "secondary",
                }),
                "flex-1 rounded-full"
              )}
            >
              resume
            </Link>
          </div>
          <div>
            <p>Hello!</p>
            {isFetchingUserData && !userData && (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
              </div>
            )}
            {!isFetchingUserData && userData && <p>{userData.info}</p>}
          </div>
        </div>
      </div>
    </MaxWidthContainer>
  );
};

export default page;
