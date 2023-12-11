import { useMutation } from "@tanstack/react-query";
import { HookKeys } from "@/constants/hook-keys.ts";
import { toast } from "@/components/ui/use-toast.ts";
import { LoginDto } from "@/service/account-service/schema/login-schema.ts";
import useAccountStore from "@/store/account-store.ts";
import accountService from "@/service/account-service/account-service.ts";

export interface UseLogin {
  login: (dto: LoginDto) => void;
  isLoginLoading: boolean;
}

const useLogin = (): UseLogin => {
  const { setAccount } = useAccountStore();
  const { isPending, mutate } = useMutation({
    mutationKey: [HookKeys.loginMutation],
    mutationFn: async (dto: LoginDto) => {
      await accountService.login(dto);
      const account = await accountService.my();
      setAccount(account);
    },
    onSuccess: () =>
      toast({
        title: "Success",
        description: "Successfully logged in.",
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
    login: mutate,
    isLoginLoading: isPending,
  };
};

export default useLogin;
