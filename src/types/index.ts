export type TodoObj = {
  id: string;
  todo: string;
  discription: string;
  completed: boolean;
  attachmentImage?: string;
};

export type UserPhoto = {
  filepath: string;
  webviewPath?: string;
};

export type DataContextType = {
  todoList: TodoObj[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoObj[]>>;
};
