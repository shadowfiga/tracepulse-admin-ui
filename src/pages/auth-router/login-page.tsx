import { FC } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LoginDto,
  loginSchema,
} from "@/service/account-service/dto/login-dto.ts";
import accountService from "@/service/account-service/account-service.ts";
import { toast } from "@/components/ui/use-toast.ts";
import { FormField, FormMessage } from "@/components/ui/form";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";

const LoginPage: FC = () => {
  const form = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  async function onSubmit(values: LoginDto) {
    try {
      await accountService.login(values);
      toast({
        title: "Success",
        description: "Form created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong, please try again later",
        variant: "destructive",
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
