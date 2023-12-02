import { TodoDto } from "../model/todo.ts";

export type CreateTodoDto = Omit<TodoDto, "id">;
