"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import ThemeToggler from "./ThemeToggler";
import { Skeleton } from "./ui/skeleton";
const navLinks = [
  {
    title: "About Me",
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
  const [active, setActive] = useState("/");
  const [isCollapsed, setIsCollapsed] = useState(true);
  const path = usePathname();
  useEffect(() => {
    setActive(path);
  }, [path]);

  const [user, setUser] = useState();

  useEffect(() => {
    const fetUserData = async () => {
      const res = await fetch("/user.json");
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setUser(data);
    };
    fetUserData();
  }, []);

  return (
    <header
      className={`w-full min-h-2 py-6 px-10 shadow transition flex items-center justify-between
                max-lg:items-start max-lg:flex-col max-lg:gap-6 bg-background
      ${isCollapsed ? "" : ""}
    `}
    >
      <div className="flex items-center justify-between max-lg:w-full">
        <div className="flex items-center gap-3">
          <ThemeToggler />
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-blue-600"></div>
            <Link
              href={"/"}
              className="flex items-center gap-1 max-sm:items-start max-sm:flex-col max-sm:gap-0"
            >
              <span className="font-bold text-xl">
                {!user ? (
                  <Skeleton className="w-[150px] h-[25px] rounded ml-1" />
                ) : (
                  user.name
                )}
              </span>
              <div className="text-gray-500 font-bold text-sm mb-0 flex items-center justify-center">
                /{" "}
                {!user ? (
                  <Skeleton className="w-[100px] h-[20px] rounded ml-1" />
                ) : (
                  user.job
                )}
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
            <div
              className="relative w-10 h-1 bg-blue-600 rounded-full 
            before:content-[''] before:absolute before:w-1/2 before:h-1 before:-top-3 before:left-0 before:bg-blue-600 before:rounded-full
            after:content-[''] after:absolute after:w-1/2 after:h-1 after:top-3 after:right-0 after:bg-blue-600 after:rounded-full
            "
            ></div>
          </Button>
        </div>
      </div>
      <div
        className={` transition flex items-center gap-3
        max-lg:items-start  max-lg:flex-col max-lg:gap-3
        ${isCollapsed ? "max-lg:hidden" : "max-lg:flex"}
      `}
      >
        <div className="flex items-center max-lg:items-start gap-3 max-lg:flex-col">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.link}
              className={`
          text-lg transition
          ${
            active === link.link
              ? "text-blue-600 font-semibold border-b"
              : "text-gray-500 hover:border-b"
          }
          `}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
