"use client";

import { Button } from "@/components/ui/button";
import "./form.css";
import emailjs from "@emailjs/browser";
import { useState, useRef } from "react";
import Swal from "sweetalert2";
import LoadingSpinner from "@/components/LoadingSpinner";

const Page = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const form = useRef();

  const validateForm = () => {
    let formErrors = {};
    let valid = true;

    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^\S+@\S+\.\S+$/;
    const messageRegex = /^.{10,500}$/;

    if (!nameRegex.test(firstName.trim())) {
      formErrors.firstName = "First name is invalid";
      valid = false;
    }

    if (!nameRegex.test(lastName.trim())) {
      formErrors.lastName = "Last name is invalid";
      valid = false;
    }

    if (!emailRegex.test(email.trim())) {
      formErrors.email = "Email is invalid";
      valid = false;
    }

    if (!subject.trim()) {
      formErrors.subject = "Subject is required";
      valid = false;
    }

    if (!messageRegex.test(message.trim())) {
      formErrors.message = "Message must be between 10 and 500 characters";
      valid = false;
    }

    setErrors(formErrors);
    return valid;
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setSubmitting(true);
      await emailjs
        .send(
          "service_utirkmo",
          "template_40szeo8",
          {
            from_name: `${firstName} ${lastName}`,
            email: email,
            to_name: "ahmed",
            subject: subject,
            message: message,
          },
          "Y-Y5Q_Spy2YLvI5eA"
        )
        .then(
          () => {
            Swal.fire({
              icon: "success",
              title: "Email Sent!",
              text: "Your email has been sent successfully.",
              confirmButtonText: "OK",
            });
            setTimeout(() => {
              setFirstName("");
              setLastName("");
              setEmail("");
              setSubject("");
              setMessage("");
            }, 1000);
          },
          (error) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "An error occurred while sending the email.",
              confirmButtonText: "OK",
            });
          }
        )
        .finally(() => {
          setSubmitting(false);
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill out the form correctly.",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="w-full min-h-full bg-[#e6dace] dark:bg-muted/40 flex flex-col items-center p-8 max-sm:px-4">
      <div className="w-[700px] mx-auto h-full max-lg:w-5/6 max-sm:w-full flex flex-col gap-20">
        <div className="heading text-center flex flex-col gap-20 items-center">
          <div className="flex gap-2 items-baseline font-bold w-fit pl-4">
            <div className="w-4 h-4 bg-blue-600"></div>
            <h1 className="text-4xl">Contact</h1>
          </div>
        </div>
        <form
          ref={form}
          className="bg-background shadow p-12 capitalize font-bold flex flex-col gap-5"
          onSubmit={sendEmail}
        >
          <div className="flex max-md:flex-col gap-4">
            <div className="input-div md:flex-1">
              <label htmlFor="firstName">
                First Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    firstName: "",
                  }));
                }}
              />
              {errors.firstName && (
                <span className="error">{errors.firstName}</span>
              )}
            </div>
            <div className="input-div md:flex-1">
              <label htmlFor="lastName">
                Last Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    lastName: "",
                  }));
                }}
              />
              {errors.lastName && (
                <span className="error">{errors.lastName}</span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="input-div">
              <label htmlFor="email">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: "",
                  }));
                }}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="input-div">
              <label htmlFor="subject">
                Subject <span className="required">*</span>
              </label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    subject: "",
                  }));
                }}
              />
              {errors.subject && (
                <span className="error">{errors.subject}</span>
              )}
            </div>
            <div className="input-div">
              <label htmlFor="message">
                Message <span className="required">*</span>
              </label>
              <textarea
                rows="4"
                id="message"
                className="w-full mt-3"
                style={{ resize: "none" }}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    message: "",
                  }));
                }}
              ></textarea>
              <div className="flex items-center justify-between">
                {errors.message && (
                  <span className="error">{errors.message}</span>
                )}
                <div>
                  <span className="text-sm text-gray-500">
                    {message.length}/500
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Button
              className="bg-blue-600 hover:bg-blue-800 text-white rounded-full px-8"
              type="submit"
              disabled={submitting}
            >
              {submitting ? (
                <div className="flex items-center justify-center gap-3">
                  <LoadingSpinner />
                  Sending...
                </div>
              ) : (
                "Send"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
