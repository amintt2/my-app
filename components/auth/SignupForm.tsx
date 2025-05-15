"use client"

import * as React from "react"
// import { useRouter } from "next/navigation" // Removed unused import
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import Link from "next/link"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type SignupFormValues = z.infer<typeof formSchema>;

export function SignupForm() {
  const supabase = createClient();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignupFormValues) {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.name, // You can add other metadata here
          },
          // emailRedirectTo: `${window.location.origin}/auth/callback`, // If email confirmation is on
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        toast.error(signUpError.message);
        setIsLoading(false);
      } else if (data.user && data.user.identities && data.user.identities.length === 0) {
        // This case can happen if user already exists but is not confirmed (e.g. social auth linking)
        // Or if email confirmation is required and user needs to confirm.
        // For Supabase, if user exists with this email and is unconfirmed, it might resend confirmation.
        setSuccessMessage("Please check your email to confirm your account. If you've signed up before, try logging in or check your spam folder for the confirmation email.");
        toast.info("Confirmation email sent (if applicable). Check your inbox.");
        setIsLoading(false);
      } else if (data.user) {
        setSuccessMessage("Signup successful! You may need to confirm your email before logging in.");
        toast.success("Signup successful! Please check your email for a confirmation link (if required).");
        // Optionally redirect or wait for user to confirm email then log in.
        // router.push("/auth/login"); 
        setIsLoading(false); // Keep user on page to see success/confirmation message
      } else {
         // Fallback for unexpected cases, e.g., user is null but no error
        setError("Signup failed due to an unexpected issue. Please try again.");
        toast.error("Signup failed. Please try again.");
        setIsLoading(false);
      }
    } catch (err: unknown) {
      console.error("Signup submission error:", err);
      let errorMessage = "An unexpected error occurred during signup.";
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }
      setError(errorMessage);
      toast.error(errorMessage);
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-sm">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && (
          <p className="text-sm font-medium text-destructive">{error}</p>
        )}
        {successMessage && (
          <p className="text-sm font-medium text-green-600">{successMessage}</p>
        )}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing Up..." : "Sign Up"}
        </Button>
        <FormDescription className="text-center text-xs">
          Already have an account?{" "}
          <Link href="/auth/login" className="underline hover:text-primary">
            Sign in here
          </Link>
        </FormDescription>
      </form>
    </Form>
  );
} 