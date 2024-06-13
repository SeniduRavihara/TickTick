import { TodoObj } from "../types";

export const exampleData: TodoObj[] = [
  {
    id: "1",
    todo: "Programming Lecture",
    discription: "This is task1",
    completed: false,
    timestamp: new Date(),
    tags: [],
    start: "09:00",
    duration: 1,
  },
  {
    id: "2",
    todo: "XSnap study development",
    discription: "This is task1",
    completed: true,
    timestamp: new Date(),
    tags: [],
    start: "12:00",
    duration: 2,
  },
  {
    id: "3",
    todo: "Add new feature to XSnap",
    discription: "This is task1",
    completed: false,
    timestamp: new Date(),
    tags: [],
    start: "16:00",
    duration: 3,
  },
  {
    id: "4",
    todo: "Add closed featue to business-service-site",
    discription: "This is task1",
    completed: true,
    timestamp: new Date(),
    tags: [],
    start: "20:00",
    duration: 1,
  }
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
