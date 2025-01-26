"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import Square from "@/components/Square";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2)
    .regex(/^[A-Za-z\s]+$/, "Invalid first name"),
  lastName: z
    .string()
    .min(2)
    .regex(/^[A-Za-z\s]+$/, "Invalid last name"),
  email: z.string().email(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10).max(500),
});

const ContactPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formRef.current,
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        }
      );

      toast({
        variant: "default",
        title: "Success",
        description: "Email sent successfully, thank you for your message",
      });

      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Failed to send your email. Please try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormField = (name, label, type = "text", options = {}) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={options.className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {type === "textarea" ? (
              <Textarea {...field} rows={4} className="resize-none" />
            ) : (
              <Input {...field} type={type} />
            )}
          </FormControl>
          <FormMessage />
          {type === "textarea" && (
            <div className="flex justify-end">
              <span className="text-sm text-gray-500">
                {field.value.length}/500
              </span>
            </div>
          )}
        </FormItem>
      )}
    />
  );

  return (
    <MaxWidthContainer className="space-y-12">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Contact</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="text-center">
        <div className="flex gap-2 items-baseline font-bold w-fit pl-4 mx-auto">
          <Square />
          <h1 className="text-4xl">Contact</h1>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          ref={formRef}
          className="bg-background shadow-sm p-8 capitalize font-bold flex flex-col gap-5"
        >
          <div className="flex max-md:flex-col md:items-center gap-4">
            {renderFormField("firstName", "First Name", "text", {
              className: "md:flex-1",
            })}
            {renderFormField("lastName", "Last Name", "text", {
              className: "md:flex-1",
            })}
          </div>

          {renderFormField("email", "Email", "email")}
          {renderFormField("subject", "Subject")}
          {renderFormField("message", "Message", "textarea")}

          <Button
            className="bg-main hover:bg-main-hover text-white"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-3">
                <LoadingSpinner className="text-main-foreground" />
                Sending...
              </div>
            ) : (
              "Send"
            )}
          </Button>
        </form>
      </Form>
    </MaxWidthContainer>
  );
};

export default ContactPage;
