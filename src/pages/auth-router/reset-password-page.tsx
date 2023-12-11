import { FC, useState } from "react";
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
import { ArrowLeft, EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ResetPasswordDto,
  resetPasswordSchema,
} from "@/service/account-service/schema/reset-password-schema.ts";
import { AppRoutes } from "@/constants/app-routes.ts";
import useResetPassword from "@/hooks/use-reset-password.ts";
import { isEmpty, isNil } from "lodash";
import { toast } from "@/components/ui/use-toast.ts";

export interface ResetPasswordPageProps {
  token: string;
}

const ResetPasswordPage: FC<ResetPasswordPageProps> = (props) => {
  const { token } = props;
  const navigate = useNavigate();
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
  const form = useForm<ResetPasswordDto>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onSubmit",
    defaultValues: {
      password: "",
      passwordRepeat: "",
      token,
    },
  });
  const { resetPassword, isResetPasswordLoading } = useResetPassword();
  async function onSubmit(values: ResetPasswordDto) {
    await resetPassword(values);
    navigate(AppRoutes.login);
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
                  <FormLabel>Password</FormLabel>
                  <FormControl className="relative">
                    <div>
                      <Input
                        className="pr-[40px]"
                        type={isPasswordHidden ? "password" : "text"}
                        {...field}
                      />
                      <Button
                        onClick={() => setIsPasswordHidden((prev) => !prev)}
                        type="button"
                        variant="ghost"
                        className="absolute top-0 right-0 bottom-0 px-[10px] rounded-l-none"
                      >
                        {isPasswordHidden ? (
                          <EyeIcon className="text-muted-foreground w-5 h-5" />
                        ) : (
                          <EyeOffIcon className="text-muted-foreground  w-5 h-5" />
                        )}
                      </Button>
                    </div>
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
                  <FormLabel>Repeat password</FormLabel>
                  <FormControl>
                    <Input
                      type={isPasswordHidden ? "password" : "text"}
                      {...field}
                    />
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
          disabled={isResetPasswordLoading}
          className="w-full"
        >
          {!isResetPasswordLoading && <span>Submit</span>}
          {isResetPasswordLoading && <Loader2 />}
        </Button>
      </CardFooter>
    </Card>
  );
};

const ResetPasswordPageWrapper: FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  if (!token || isNil(token) || isEmpty(token)) {
    toast({
      variant: "destructive",
      title: "Error",
      description:
        "Could not find token, please make sure the link is correct.",
    });
    return <Navigate to={AppRoutes.login} />;
  }
  return <ResetPasswordPage token={token} />;
};

export default ResetPasswordPageWrapper;
