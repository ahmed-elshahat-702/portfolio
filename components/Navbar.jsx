"use client";

import { useToast } from "@/hooks/use-toast";
import useStore from "@/hooks/useStore";
import { cn } from "@/lib/utils";
import { Menu, PanelTopClose } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Square from "./Square";
import ThemeToggler from "./ThemeToggler";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";
const navLinks = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Projects",
    link: "/projects",
  },
  {
    title: "Resume",
    link: "/resume",
  },
  {
    title: "Contact",
    link: "/contact",
  },
];

const Navbar = () => {
  const { isFetchingUserData, userData, fetchUserData } = useStore();
  const { toast } = useToast();

  const [active, setActive] = useState("/");
  const [isCollapsed, setIsCollapsed] = useState(true);
  const path = usePathname();
  const router = useRouter();
  useEffect(() => {
    setActive(path);
  }, [path]);

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
    <header
      className={cn(
        "w-full py-6 px-4 md:px-10 shadow flex items-center justify-between max-lg:items-start max-lg:flex-col max-lg:gap-4 bg-background"
      )}
    >
      <div className="flex items-center justify-between max-lg:w-full">
        <div className="flex items-center gap-3">
          <ThemeToggler />
          <div className="flex items-center gap-1">
            <Square
              onDoubleClick={() => {
                router.push("/dashboard");
              }}
            />
            <Link
              href={"/"}
              className="flex items-center gap-1 max-sm:items-start max-sm:flex-col max-sm:gap-0"
            >
              <span className="font-bold sm:text-xl max-sm:text-md">
                {isFetchingUserData && !userData && (
                  <Skeleton className="w-[150px] h-[25px] rounded ml-1 max-sm:mb-1" />
                )}
                {!isFetchingUserData && userData && userData.name}
              </span>
              <div className="text-gray-500 font-bold sm:text-sm max-sm:text-xs mb-0 flex items-center justify-center">
                <span className="mx-1">/</span>
                {isFetchingUserData && !userData && (
                  <Skeleton className="w-[100px] h-[20px] rounded ml-1" />
                )}
                {!isFetchingUserData && userData && userData.job}
              </div>
            </Link>
          </div>
        </div>
        <div className="max-lg:block hidden">
          <Button
            variant="ghost"
            onClick={() => {
              setIsCollapsed(!isCollapsed);
            }}
          >
            {isCollapsed ? (
              <Menu className="text-main w-7 h-7" />
            ) : (
              <PanelTopClose className="text-main w-7 h-7" />
            )}
          </Button>
        </div>
      </div>
      <div
        className={cn(
          "transition flex items-center gap-3 max-lg:items-start max-lg:flex-col max-lg:gap-3",
          isCollapsed ? "max-lg:hidden" : "max-lg:flex max-lg:w-full"
        )}
      >
        <div className="w-full flex items-center gap-3 max-lg:flex-col">
          {navLinks.map((link, index) => (
            <React.Fragment key={index}>
              <Link
                href={link.link}
                onClick={() => setIsCollapsed(true)}
                className={cn(
                  "text-lg transition border-dashed hover:border-b-2 hover:border-main",
                  active === link.link
                    ? "text-main font-semibold border-b-2 border-main"
                    : "text-muted-foreground"
                )}
              >
                {link.title}
              </Link>
              {index !== navLinks.length - 1 && (
                <Separator className="w-0 h-0 lg:w-px lg:h-6" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
