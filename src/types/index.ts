export type TodoObj = {
  id: string;
  todo: string;
  discription: string;
  completed: boolean;
  attachmentImage?: string;
  timestamp?: Date; //Todo created Time or last edited time
  date?: string; //Todo created Date or last edited date
  start?: string; //Todo started Time
  duration?: number; //Todo duration in 15min parts
  repeat?: string;
  tags: Array<{ title: string; color: string }>;
};

export type TodoListType = TodoObj[];

export type UserPhoto = {
  filepath: string;
  webviewPath?: string;
};

export type DataContextType = {
  todoList: TodoListType;
  setTodoList: React.Dispatch<React.SetStateAction<TodoListType>>;
};

export type MenuItemType = {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
};

export type MenuPropsType = {
  items: MenuItemType[];
  menuBtn: React.ReactNode;
  styles?: string;
  setSelected?: React.Dispatch<React.SetStateAction<string | null>>;
};
