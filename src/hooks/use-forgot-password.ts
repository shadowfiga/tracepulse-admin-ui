import { useMutation } from "@tanstack/react-query";
import { HookKeys } from "@/constants/hook-keys.ts";
import accountService from "@/service/account-service/account-service.ts";
import { toast } from "@/components/ui/use-toast.ts";
import { ForgotPasswordDto } from "@/service/account-service/dto/forgot-password-dto.ts";

export interface UseForgotPasswor {
  forgotPassword: (dto: ForgotPasswordDto) => Promise<void>;
  isForgotPasswordLoading: boolean;
}

const useLogin = (): UseForgotPasswor => {
  const { isPending, mutateAsync } = useMutation({
    mutationKey: [HookKeys.forgotPasswordMutation],
    mutationFn: async (dto: ForgotPasswordDto) => {
      await accountService.forgotPassword(dto);
    },
    onSuccess: () =>
      toast({
        title: "Success",
        description:
          "If the email exists, further instruction will be sent out.",
      }),
    onError: (error) => {
      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong! Please try again later.",
        variant: "destructive",
      });
    },
  });

  return {
    forgotPassword: mutateAsync,
    isForgotPasswordLoading: isPending,
  };
};

export default useLogin;
