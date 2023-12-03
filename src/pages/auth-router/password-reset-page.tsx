import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import accountService from "@/service/account-service/account-service.ts";
import { toast } from "@/components/ui/use-toast.ts";
import {
  PasswordResetDto,
  passwordResetSchema,
} from "@/service/account-service/dto/password-reset-dto.ts";
import { AppRoutes } from "@/constants/app-routes.ts";

const PasswordResetPage: FC = () => {
  const navigate = useNavigate();
  const form = useForm<PasswordResetDto>({
    resolver: zodResolver(passwordResetSchema),
    mode: "onSubmit",
    defaultValues: {
      password: "",
      passwordRepeat: "",
      token: "",
    },
  });

  async function onSubmit(values: PasswordResetDto) {
    try {
      await accountService.resetPassword(values);
      toast({
        title: "Success",
        description: "Successfully reset password.",
      });
      navigate(AppRoutes.login);
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
          <CardTitle className="text-2xl">Reset password</CardTitle>
          <CardDescription>Please enter your new password.</CardDescription>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="mt-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="password"
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
              name="passwordRepeat"
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
              name="token"
              render={({ field }) => (
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <Separator />
      <CardFooter className="grid grid-cols-2 items-center justify-between mt-4 space-x-2">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          {!form.formState.isSubmitting && <span>Submit</span>}
          {form.formState.isSubmitting && <Loader2 />}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PasswordResetPage;
