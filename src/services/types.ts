export interface RegisterData {
    email: string;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
  }
  
  export interface LoginData {
    email: string;
    password: string;
  }
  
  export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    due_date?: string | null;
    status?: string;
    date?: string | null;
    mark_as_important?: boolean;
  }
  
  export interface UpdateTodoData {
    title?: string;
    completed?: boolean;
    due_date?: string | null;
    status?: string;
    date?: string | null;
  }