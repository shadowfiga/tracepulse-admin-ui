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
import { FormField, FormMessage } from "@/components/ui/form";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator.tsx";
import { useNavigate } from "react-router-dom";
import {
  ForgotPasswordDto,
  forgotPasswordSchema,
} from "@/service/account-service/dto/forgot-password-dto.ts";
import useForgotPassword from "@/hooks/use-forgot-password.ts";

const ForgotPasswordPage: FC = () => {
  const navigate = useNavigate();
  const { forgotPassword, isForgotPasswordLoading } = useForgotPassword();
  const form = useForm<ForgotPasswordDto>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onSubmit",
  });

  async function onSubmit(dto: ForgotPasswordDto) {
    await forgotPassword(dto);
    navigate(-1);
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
          <CardTitle className="text-2xl">Forgot password</CardTitle>
          <CardDescription>Please provide us with your email.</CardDescription>
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
          disabled={isForgotPasswordLoading}
          className="w-full"
        >
          {!isForgotPasswordLoading && <span>Submit</span>}
          {isForgotPasswordLoading && <Loader2 />}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ForgotPasswordPage;
