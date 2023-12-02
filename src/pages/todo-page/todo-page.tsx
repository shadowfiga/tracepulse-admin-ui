import { FC, FormEvent, Fragment, useState } from "react";
import ModeToggle from "@/components/mode-toggle.tsx";
import { Input } from "@/components/ui/input.tsx";
import Button from "@/components/ui/button/button.tsx";
import useCreateTodo from "@/hooks/use-create-todo.ts";
import TodoList from "@/pages/todo-page/todo-list/todo-list.tsx";

const TodoPage: FC = () => {
  const [description, setDescription] = useState<string>("");
  const { createTodo, isCreateTodoPending } = useCreateTodo();

  const onCreate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    createTodo({
      done: false,
      description,
    });
    setDescription("");
  };

  return (
    <Fragment>
      <div className="fixed top-[20px] right-[20px]">
        <ModeToggle />
      </div>
      <main className="bg-slate-100 dark:bg-slate-700 min-h-screen items-center justify-center py-[20px]">
        <form
          className="bg-white max-w-md space-y-[10px] rounded-md dark:bg-slate-500 p-[20px] min-w-[520px] shadow-xl mx-auto"
          onSubmit={onCreate}
        >
          <h1 className="text-xl font-bold">TODO</h1>
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Button type="submit" disabled={isCreateTodoPending}>
            Add
          </Button>
        </form>
        <TodoList />
      </main>
    </Fragment>
  );
};

export default TodoPage;
