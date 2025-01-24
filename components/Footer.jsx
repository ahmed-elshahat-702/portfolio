"use client";

import { cn } from "@/lib/utils";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { buttonVariants } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { Separator } from "./ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Facebook, Github, Youtube } from "lucide-react";

const Footer = () => {
  const toast = useToast();

  const [user, setUser] = useState();

  useEffect(() => {
    const fetUserData = async () => {
      try {
        const res = await axios.get("/api/user-info");
        setUser(res.data[0]);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          message: "Error fetching user data",
        });
      }
    };
    fetUserData();
  }, []);

  return (
    <footer
      className="w-full bg-background min-h-24 py-6 px-10  transition flex items-center justify-between
                 max-lg:flex-col max-lg:gap-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1 max-lg:items-center">
          <div className="flex items-center gap-1 capitalize">
            © 2023 by{" "}
            {!user ? (
              <Skeleton className="w-[100px] h-[20px] rounded" />
            ) : (
              user.name
            )}
            .
          </div>
          <div className="flex gap-1">
            <p>desingned by</p>
            <Link href={"wix.com"} className="underline text-main">
              Wix
            </Link>
          </div>
        </div>
      </div>
      <Separator className="max-lg:h-px max-lg:w-28 w-0 h-0" />
      <div
        className="transition flex items-center gap-3
          max-sm:flex-col max-lg:gap-3"
      >
        <div
          className="px-4 max-sm:py-2 flex flex-col items-center
                 gap-3"
        >
          <h3 className="font-semibold">Phone</h3>
          <div>
            {!user ? (
              <Skeleton className="w-[160px] h-[20px] rounded" />
            ) : (
              user.phone_number
            )}
          </div>
        </div>
        <Separator className="h-px w-28 sm:w-px sm:h-10" />

        <div
          className="px-4 max-sm:py-2 flex flex-col items-center
                 gap-3"
        >
          <h3 className="font-semibold">Gmail</h3>
          <div>
            {!user ? (
              <Skeleton className="w-[200px] h-[20px] rounded" />
            ) : (
              user.email
            )}
          </div>
        </div>
        <Separator className="h-px w-28 sm:w-px sm:h-10" />
        <div
          className="px-4 max-sm:py-2 flex flex-col items-center
                 gap-3"
        >
          <h3 className="font-semibold">Follow</h3>
          {!user ? (
            <div className="flex items-center gap-2">
              <Skeleton className="w-[35px] h-[35px] rounded-full" />
              <Skeleton className="w-[35px] h-[35px] rounded-full" />
              <Skeleton className="w-[35px] h-[35px] rounded-full" />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                className={cn(buttonVariants({ variant: "ghost" }), "p-2")}
                href={user.facebook_link}
              >
                <Facebook className="text-2xl" />
              </Link>
              <Separator className="w-px h-4" />

              <Link
                className={cn(buttonVariants({ variant: "ghost" }), "p-2")}
                href={user.github_link}
              >
                <Github className="text-2xl" />
              </Link>
              <Separator className="w-px h-4" />
              <Link
                className={cn(buttonVariants({ variant: "ghost" }), "p-2")}
                href={user.youtube_link}
              >
                <Youtube className="text-2xl" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
