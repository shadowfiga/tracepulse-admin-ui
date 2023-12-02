import { FC } from "react";
import useListTodos from "@/hooks/use-list-todos.ts";
import { Loader2 } from "lucide-react";
import TodoListItem from "@/pages/todo-page/todo-list/todo-list-item.tsx";

const TodoList: FC = () => {
  const { isListTodoLoading, todos } = useListTodos();
  if (isListTodoLoading) {
    return (
      <div>
        <Loader2 />
      </div>
    );
  }
  return (
    <div className="space-y-[10px] mt-[10px] max-w-[520px] mx-auto">
      {todos.map((t) => (
        <TodoListItem key={t.id} todo={t} />
      ))}
    </div>
  );
};

export default TodoList;
