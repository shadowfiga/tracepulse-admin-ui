import { FC } from "react";
import Todo from "@/service/todo-service/model/todo.ts";
import useRemoveTodo from "@/hooks/use-remove-todo.ts";
import Button from "@/components/ui/button/button.tsx";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils.ts";

export interface TodoListItemProps {
  todo: Todo;
}

const TodoListItem: FC<TodoListItemProps> = (props) => {
  const { todo } = props;
  const { id, description, formattedDueDate, done } = todo;
  const { isRemoveTodoPending, removeTodo } = useRemoveTodo(id);

  const onRemove = () => {
    const shouldRemove = confirm("Are you sure?");
    if (shouldRemove) {
      removeTodo();
    }
  };

  return (
    <div
      className={cn(
        "p-[20px] bg-white shadow-md rounded-md relative border-[2px] border-slate-400",
        done && "border-green-400",
      )}
    >
      <div className="grid">
        <p className="font-bold">{description}</p>
        <p className="text-sm text-slate-500">{formattedDueDate}</p>
      </div>
      <div className="top-[5px] right-[5px] absolute">
        <Button
          className="justify-self-end"
          variant="destructive"
          size="icon"
          onClick={onRemove}
          disabled={isRemoveTodoPending}
        >
          <Trash2 size={18} />
        </Button>
      </div>
    </div>
  );
};

export default TodoListItem;
