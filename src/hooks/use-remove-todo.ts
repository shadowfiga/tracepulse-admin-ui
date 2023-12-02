import { useMutation } from "@tanstack/react-query";
import { HookKeys } from "@/constants/hook-keys.ts";
import todoService from "@/service/todo-service/todo-service.ts";
import { queryClient } from "@/query-client.ts";

export interface UseRemoveTodo {
  removeTodo: () => void;
  isRemoveTodoPending: boolean;
}

const useRemoveTodo = (id: string): UseRemoveTodo => {
  const { isPending, mutate } = useMutation({
    mutationKey: [HookKeys.removeTodoMutation],
    mutationFn: async () => {
      await todoService.removeTodo(id);
      await queryClient.invalidateQueries({
        queryKey: [HookKeys.listTodosQuery],
      });
    },
  });

  return {
    removeTodo: mutate,
    isRemoveTodoPending: isPending,
  };
};

export default useRemoveTodo;
