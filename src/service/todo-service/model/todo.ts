import { z } from "zod";

const todoSchema = z.object({
  id: z.string(),
  description: z.string(),
  dueDate: z.date().optional(),
  done: z.boolean(),
});
export type TodoDto = z.infer<typeof todoSchema>;
export interface TodoDefinition extends Omit<TodoDto, "dueDate"> {
  dueDate?: Date;
}

export default class Todo implements TodoDefinition {
  public readonly id: string;
  public readonly description: string;
  public readonly done: boolean;
  public readonly dueDate?: Date;

  protected constructor(obj: TodoDefinition) {
    const { id, dueDate, done, description } = obj;
    this.id = id;
    this.description = description;
    this.done = done;
    this.dueDate = dueDate;
  }

  public static create(obj: TodoDefinition): Todo {
    return new Todo(obj);
  }

  public static fromDto(dto: Partial<TodoDto>): Todo {
    const parsed = todoSchema.parse(dto);
    return Todo.create(parsed);
  }

  public get formattedDueDate(): string {
    if (!this.dueDate) {
      return "No due date";
    }
    return this.dueDate.toISOString();
  }
}
