import { useMutation } from "@tanstack/react-query";
import { HookKeys } from "@/constants/hook-keys.ts";
import { CreateTodoDto } from "@/service/todo-service/dto/create-todo-dto.ts";
import todoService from "@/service/todo-service/todo-service.ts";
import { queryClient } from "@/query-client.ts";

export interface UseCreateTodo {
  createTodo: (dto: CreateTodoDto) => void;
  isCreateTodoPending: boolean;
}

const useCreateTodo = (): UseCreateTodo => {
  const { isPending, mutate } = useMutation({
    mutationKey: [HookKeys.createTodoMutation],
    mutationFn: async (dto: CreateTodoDto) => {
      await todoService.addTodo(dto);
      await queryClient.invalidateQueries({
        queryKey: [HookKeys.listTodosQuery],
      });
    },
  });

  return {
    createTodo: mutate,
    isCreateTodoPending: isPending,
  };
};

export default useCreateTodo;
