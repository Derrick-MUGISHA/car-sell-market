"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/validation/auth.validation";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginMutationFn } from "@/lib/fetcher";
import { toast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";

const LoginDialog = () => {
  const { open, onClose } = useLoginDialog();
  const { onOpen: onRegisterOpen } = useRegisterDialog();

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: loginMutationFn,
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    mutate(values, {
      onSuccess: () => {
        queryClient.refetchQueries({
          queryKey: ["currentUser"]
        });

        toast({
          title: "Logged in successfully",
          description: "Welcome back!",
          variant: "success",
        });
        onClose();
      },
      onError: (error) => {
        toast({
          title: "Error logging in",
          description: "login failed, please try again",
          variant: "destructive",
        })
      }
    });
    // Add login logic
  };

  const handleRegisterOpen = () => {
    onClose();
    onRegisterOpen();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white/90 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-center">
            Sign in to your account
          </DialogTitle>
          <DialogDescription className="text-center">
            Don't have an account?{" "}
            <button
              className="text-primary font-semibold"
              onClick={handleRegisterOpen}
            >
              Registration
            </button>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Form fields */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="mail@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs mt-1" />
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
                    <Input
                      placeholder="**************"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Other form fields... */}

            <Button
            disabled={isPending}
            type="submit" className="w-full">
              { isPending && <Loader className="mr-2 h-4 w-4 animate-spin"/>}
              Login
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
