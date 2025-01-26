"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import Square from "@/components/Square";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Signin() {
  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
        callbackUrl: "/dashboard",
      });
      if (res?.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Invalid username or password",
        });
      }
      if (res?.ok) {
        toast({
          variant: "default",
          title: "Success",
          description: "Signed in successfully",
        });
        router.push("/dashboard");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MaxWidthContainer className={"flex flex-col items-center  gap-12"}>
      <div className="flex gap-2 items-baseline font-bold w-fit pl-4 mt-8">
        <Square />
        <h1 className="text-4xl">Sign in</h1>
      </div>
      <Card className=" w-full sm:w-96 p-2 font-bold">
        <CardHeader>
          <CardTitle>Dashboard Signin</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 font-bold"
          >
            <div className="space-y-2">
              <div className="space-y-2">
                <Label htmlFor="username">
                  Username <span className="text-red-600">*</span>
                </Label>
                <Input id="username" {...form.register("username")} />
                {form.formState.errors.username && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.username.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">
                  Password <span className="text-red-600">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...form.register("password")}
                  />
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 hover:bg-transparent"
                  >
                    {showPassword ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                {form.formState.errors.password && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <Button
                type="submit"
                className="w-full bg-main hover:bg-main-hover dark:text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner className="mx-4 text-main-foreground" />{" "}
                    Signing you in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
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
          </form>
        </CardContent>
      </Card>
    </MaxWidthContainer>
  );
}
