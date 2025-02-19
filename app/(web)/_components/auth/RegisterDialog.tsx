"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signupSchema } from "@/validation/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRegisterDialog } from "@/hooks/use-register.dialog";
import { useLoginDialog } from "@/hooks/use-login.dialog";

const RegisterDialog = () => {
  const { open, onClose } = useRegisterDialog();
  const { onOpen } = useLoginDialog();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signupSchema>) => {
    console.log(values);
    // Add registration logic
  };

  const handleLoginOpen = () => {
    onClose();
    onOpen();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
     <DialogContent className="sm:max-w-[425px] bg-white/90 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-center">Create an account</DialogTitle>
          <DialogDescription className="text-center">
            Already have an account?{" "}
            <button className="text-primary font-semibold" onClick={handleLoginOpen}>
              Sign in
            </button>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Form fields */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Derrick" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs mt-1" />
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
                    <Input placeholder="mail@example.com" type="email" {...field} />
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
                    <Input placeholder="**************" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="**************" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Other form fields... */}
            
            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;