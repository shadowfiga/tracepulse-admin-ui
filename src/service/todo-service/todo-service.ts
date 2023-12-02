import Todo, { TodoDefinition } from "./model/todo.ts";
import { CreateTodoDto } from "./dto/create-todo-dto.ts";

class TodoService {
  private todos: TodoDefinition[] = [];
  public async addTodo(dto: CreateTodoDto): Promise<void> {
    this.todos.push({
      ...dto,
      id: Date.now().toString(),
    });
  }

  public async removeTodo(id: string): Promise<void> {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  public async listTodos(): Promise<Todo[]> {
    return this.todos.map(Todo.fromDto);
  }
}
const todoService = new TodoService();
export default todoService;
