"use client";

import { Button } from "@/components/ui/button";
import "./form.css";
import { useEffect } from "react";

const page = () => {
  //   useEffect(() => {
  //     const fetchEmail = async () => {
  //       fetch("http://localhost:1337/api/email", {
  //         method: "POST",
  //       })
  //         .then((response) => response.json())
  //         .then((res) => {
  //           console.log(res);
  //         });
  //     };
  //     fetchEmail();
  //   }, []);

  return (
    <div className="w-full min-h-full bg-[#e6dace] dark:bg-muted/40 flex flex-col items-center p-8 max-sm:px-4">
      <div className="w-[700px] mx-auto h-full max-lg:w-5/6 max-sm:w-full flex flex-col gap-20">
        <div className="heading text-center flex flex-col gap-20 items-center">
          <div className="flex gap-2 items-baseline font-bold w-fit pl-4">
            <div className="w-4 h-4 bg-blue-600"></div>
            <h1 className="text-4xl">Contact</h1>
          </div>
        </div>
        <form className="bg-background shadow p-12 capitalize font-bold flex flex-col gap-5">
          <div className="flex max-md:flex-col gap-4">
            <div className="input-div md:flex-1">
              <label htmlFor="fristName">
                frist name <span className="reqiured">*</span>
              </label>
              <input type="text" id="fristName" />
            </div>
            <div className="input-div md:flex-1">
              <label htmlFor="lastName">
                last name <span className="reqiured">*</span>
              </label>
              <input type="text" id="lastName" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="input-div">
              <label htmlFor="email">
                email <span className="reqiured">*</span>
              </label>
              <input type="email" id="email" />
            </div>
            <div className="input-div">
              <label htmlFor="subject">subject</label>
              <input type="text" id="subject" />
            </div>
            <div className="input-div">
              <label htmlFor="message">message</label>
              <textarea
                rows="4"
                id="message"
                className="w-full mt-3"
                style={{ resize: "none" }}
              ></textarea>
            </div>
          </div>
          <div>
            <Button className="bg-blue-600 hover:bg-blue-800 rounded-full px-8">
              send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
