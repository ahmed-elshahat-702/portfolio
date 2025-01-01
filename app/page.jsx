"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { FaFacebook, FaGithub, FaYoutube } from "react-icons/fa";
import axios from "axios";

const page = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const fetUserData = async () => {
      try {
        const response = await axios.get("/api/user-info");
        setUser(response.data[0]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetUserData();
  }, []);

  return (
    <div className="w-full min-h-dvh relative bg-muted/40">
      <div className="w-5/12 min-h-dvh max-sm:hidden bg-[#e6dace] dark:bg-muted"></div>
      <div className="card sm:w-[600px] sm:h-[450px] flex max-sm:flex-col sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:shadow-2xl">
        <div className="w-1/2 max-sm:w-full max-sm:h-1/2 bg-[#e6dace] dark:bg-muted flex flex-col justify-between items-center">
          <div className="h-full flex flex-col items-center justify-center gap-6 p-4 max-sm:py-20">
            <div className="img w-32 h-32 bg-background rounded-full flex items-center justify-center overflow-hidden">
              {!user ? (
                <Skeleton className="w-[110px] h-[110px] rounded-full " />
              ) : (
                <Image
                  src={user.profile}
                  width={130}
                  height={130}
                  alt="profile"
                />
              )}
            </div>
            <div className="name text-2xl font-bold capitalize">
              {!user ? (
                <Skeleton className="w-[160px] h-[30px] rounded dark:bg-background" />
              ) : (
                user.name
              )}
            </div>
            <div className="devider w-20 h-[2px] bg-white rounded"></div>
            <div className="job text-xl font-light uppercase">
              {!user ? (
                <Skeleton className="w-[120px] h-[25px] rounded dark:bg-background" />
              ) : (
                user.job
              )}
            </div>
          </div>
          <div className="social w-full bg-background flex justify-center py-2 text-foreground">
            {!user ? (
              <div className="flex items-center gap-2">
                <Skeleton className="w-[35px] h-[35px] rounded-full" />
                <Skeleton className="w-[35px] h-[35px] rounded-full" />
                <Skeleton className="w-[35px] h-[35px] rounded-full" />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href={user.facebook_link}>
                  <Button variant="ghost" className="p-2">
                    <FaFacebook className="text-2xl" />
                  </Button>
                </Link>
                <Link href={user.github_link}>
                  <Button variant="ghost" className="p-2">
                    <FaGithub className="text-2xl" />
                  </Button>
                </Link>
                <Link href={user.youtube_link}>
                  <Button variant="ghost" className="p-2">
                    <FaYoutube className="text-2xl" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="w-1/2 max-sm:w-full max-sm:h-1/2 bg-background flex flex-col justify-center gap-5 p-4 max-sm:py-20">
          <h1 className="font-bold text-6xl">Hello</h1>
          <h3 className="font-medium text-xl">Here's who I am & what I do</h3>
          <div className="flex gap-4">
            <Link href="/projects">
              <Button className="bg-blue-600 hover:bg-blue-800 dark:text-white rounded-full px-8">
                projects
              </Button>
            </Link>
            <Link href="/resume">
              <Button variant="outline" className="px-8 rounded-full">
                resume
              </Button>
            </Link>
          </div>
          <div>
            <p>Hello!</p>
            {!user ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
              </div>
            ) : (
              <p>{user.info}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
