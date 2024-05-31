import { TodoObj } from "../types";

export const exampleData: TodoObj[] = [
  {
    id: "1",
    todo: "Task 1",
    discription: "This is task1",
    completed: false,
    timestamp: new Date(),
    tags: [],
  },
  {
    id: "2",
    todo: "Task 2",
    discription: "This is task1",
    completed: true,
    timestamp: new Date(),
    tags: [],
  },
  {
    id: "3",
    todo: "Task 3",
    discription: "This is task1",
    completed: false,
    timestamp: new Date(),
    tags: [],
  },
  {
    id: "4",
    todo: "Task 4",
    discription: "This is task1",
    completed: true,
    timestamp: new Date(),
    tags: [],
  },
  {
    id: "5",
    todo: "Task 5",
    discription: "This is task5",
    completed: true,
    timestamp: new Date(),
    tags: [],
  },
];

export const INITIAL_NEW_TODO_OBJ = {
  completed: false,
  id: "",
  attachmentImage: "",
  discription: "",
  todo: "",
  timestamp: new Date(),
  tags: [],
};

export const INITIAL_DATA_CONTEXT = { todoList: [], setTodoList: () => {} };

// ------------------------------------------
