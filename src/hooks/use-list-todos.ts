import { useQuery } from "@tanstack/react-query";
import { HookKeys } from "@/constants/hook-keys.ts";
import todoService from "@/service/todo-service/todo-service.ts";
import Todo from "@/service/todo-service/model/todo.ts";

export interface UseListTodos {
  todos: Todo[];
  isListTodoLoading: boolean;
}

const useListTodos = (): UseListTodos => {
  const { isLoading, data } = useQuery({
    queryKey: [HookKeys.listTodosQuery],
    queryFn: async () => {
      const todos = await todoService.listTodos();
      return todos;
    },
  });

  return {
    todos: data ?? [],
    isListTodoLoading: isLoading,
  };
};

export default useListTodos;
