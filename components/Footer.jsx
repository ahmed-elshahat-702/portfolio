"use client";
import { FaFacebook, FaGithub, FaYoutube } from "react-icons/fa";

import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
const footerItems = [
  {
    title: "Phone",
    content: "01144378220",
  },
  { title: "Gmail", content: "ahmedelshahat702@gmail.com" },
  {
    title: "Follow",
    content: [
      {
        icon: "facebook",
        link: "https://www.facebook.com/ahmed.bondoa.334/",
      },
      {
        icon: "github",
        link: "https://github.com/ahmed-elshahat-702",
      },
      {
        icon: "youtube",
        link: "https://www.youtube.com/channel/UCazreRiDvfJcIlzFKFiljYQ",
      },
    ],
  },
];

const Footer = () => {
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
    <footer
      className={`w-full min-h-24 py-6 px-10 border-t transition flex items-center justify-between
                 max-lg:flex-col max-lg:gap-6
    `}
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
            <Link href={"wix.com"} className="underline">
              Wix
            </Link>
          </div>
        </div>
      </div>
      <div
        className={` transition flex items-center gap-3
          max-sm:flex-col max-lg:gap-3
      `}
      >
        <div
          className="flex flex-col items-center
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
        <div
          className="flex flex-col items-center
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
        <div
          className="flex flex-col items-center
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
    </footer>
  );
};

export default Footer;
