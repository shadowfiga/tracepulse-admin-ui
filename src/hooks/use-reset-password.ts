import { useMutation } from "@tanstack/react-query";
import { HookKeys } from "@/constants/hook-keys.ts";
import { ResetPasswordDto } from "@/service/account-service/dto/reset-password-dto.ts";
import accountService from "@/service/account-service/account-service.ts";
import { toast } from "@/components/ui/use-toast.ts";

export interface UseResetPassword {
  resetPassword: (dto: ResetPasswordDto) => Promise<void>;
  isResetPasswordLoading: boolean;
}

const useResetPassword = (): UseResetPassword => {
  const { isPending, mutateAsync } = useMutation({
    mutationKey: [HookKeys.resetPasswordMutation],
    mutationFn: async (dto: ResetPasswordDto) => {
      await accountService.resetPassword(dto);
    },
    onSuccess: () =>
      toast({
        title: "Success",
        description: "Successfully reset password.",
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
    resetPassword: mutateAsync,
    isResetPasswordLoading: isPending,
  };
};

export default useResetPassword;
