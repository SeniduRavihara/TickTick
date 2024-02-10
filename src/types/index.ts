
export type TodoObj = {
  id: string;
  todo: string;
  discription: string;
  completed: boolean;
  attachmentImage?: string;
  timestamp?: Date;
};

export type TodoListType = TodoObj[]

export type UserPhoto = {
  filepath: string;
  webviewPath?: string;
};

export type DataContextType = {
  todoList: TodoListType;
  setTodoList: React.Dispatch<React.SetStateAction<TodoListType>>;
};
