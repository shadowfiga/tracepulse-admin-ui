import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Button } from "@/components/ui/button.tsx";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator.tsx";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/constants/app-routes.ts";
import useAccountStore from "@/store/account-store.ts";

const LoginPage: FC = () => {
  const { setAccount } = useAccountStore();
  const navigate = useNavigate();
  const form = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  async function onSubmit(values: LoginDto) {
    try {
      await accountService.login(values);
      const account = await accountService.my();
      setAccount(account);
      toast({
        title: "Success",
        description: "Successfully logged in.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong! Please try again later.",
        variant: "destructive",
      });
    }
  }

  return (
    <Card className="min-w-[520px]">
      <CardHeader className="flex flex-row space-x-2 items-center">
        <img
          src="/logo-128x128.webp"
          alt="Trace Pulse"
          title="Trace Pulse"
          className="w-16 h-16 rounded-xl"
        />
        <div className="flex flex-col">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Welcome to Trace Pulse! Please login to continue.
          </CardDescription>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="mt-2">
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
      <Separator />
      <CardFooter className="grid grid-cols-2 items-center justify-between mt-4">
        <a
          className="text-sm hover:underline cursor-pointer text-muted-foreground"
          onClick={() => navigate(AppRoutes.forgotPassword)}
        >
          Forgot password?
        </a>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          {!form.formState.isSubmitting && <span>Login</span>}
          {form.formState.isSubmitting && <Loader2 />}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;
