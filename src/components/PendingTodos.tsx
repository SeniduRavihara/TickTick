import { TodoListType, TodoObj } from "../types";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TiAttachment } from "react-icons/ti";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbFlag3 } from "react-icons/tb";
import BottomSheet from "./bottom_sheet/BottomSheet";
import useData from "../hooks/useData";
import { Checkbox } from "@chakra-ui/react";
import { formatDateString } from "../utils";
import { INITIAL_NEW_TODO_OBJ } from "../constants";
import TextareaAutosize from "react-textarea-autosize";

function PendingTodos({ pendingTodoList }: { pendingTodoList: TodoListType }) {
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);
  const [todoInput, setTodoInput] = useState("");
  const [discriptionInput, setDiscriptionInput] = useState("");
  const [selectedTodo, setSelectedTodo] =
    useState<TodoObj>(INITIAL_NEW_TODO_OBJ);

  const { setTodoList } = useData();

  const handleCheckboxChange = (id: string) => {
    setTodoList((prev) =>
      prev.map((todoObj) =>
        todoObj.id === id
          ? { ...todoObj, completed: !todoObj.completed }
          : todoObj
      )
    );
  };

  const handleClickTodo = (todoObj: TodoObj) => {
    setSelectedTodo(todoObj);
    setTodoInput(todoObj.todo);
    setDiscriptionInput(todoObj.discription);
    setIsOpenBottomSheet(true);
  };

  const handleChangeTodoInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    selectedTodo: TodoObj
  ) => {
    setTodoInput(e.target.value);
    setTodoList((prev) =>
      prev.map((todoObj) =>
        todoObj.id === selectedTodo.id
          ? { ...todoObj, todo: e.target.value }
          : todoObj
      )
    );
  };

  const handleChangeDiscriptionInput = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    selectedTodo: TodoObj
  ) => {
    setDiscriptionInput(e.target.value);
    setTodoList((prev) =>
      prev.map((todoObj) =>
        todoObj.id === selectedTodo.id
          ? { ...todoObj, discription: e.target.value }
          : todoObj
      )
    );
  };

  return (
    <div>
      <div
        className={`w-full bg-white/50 shadow-sm rounded-lg flex flex-col p-3`}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-gray-600 font-bold">PENDING</h1>
        </div>

        <ul
          className={`text-blue-900 flex flex-col divide-y divide-slate-900/10`}
        >
          {pendingTodoList.map((todoObj) => (
            <li key={todoObj.id} className="flex justify-between items-center">
              <Checkbox
                colorScheme="blue"
                iconColor="gray.100"
                defaultChecked={false}
                onChange={() => handleCheckboxChange(todoObj.id)}
              ></Checkbox>
              <h1
                className="text-md text-gray-700 w-9/12 cursor-pointer"
                onClick={() => handleClickTodo(todoObj)}
              >
                {todoObj.todo}
              </h1>
              <TiAttachment className="cursor-pointer 2/12" />
            </li>
          ))}
        </ul>
      </div>

      <BottomSheet
        height={50}
        isOpenBottomSheet={isOpenBottomSheet}
        setIsOpenBottomSheet={setIsOpenBottomSheet}
        dragIconDown={<IoIosArrowDown />}
        dragIconUp={<IoIosArrowUp />}
      >
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <IoIosArrowDown />
            <h1>Inbox</h1>
            <BsThreeDotsVertical />
          </div>

          <div className="flex justify-between items-center">
            <div className="text-gray-600">
              {formatDateString(selectedTodo.timestamp)}
            </div>
            <TbFlag3 />
          </div>

          <div className="mt-4 flex flex-col">
            {/* <h1 className="text-black text-xl font-bold">
              {selectedTodo.todo}
            </h1> */}
            <input
              type="text"
              className="text-black text-xl font-bold outline-none"
              value={todoInput}
              onChange={(e) => handleChangeTodoInput(e, selectedTodo)}
            />
            {/* <p>{selectedTodo.discription}</p> */}
            {/* <textarea
              value={discriptionInput}
              className="text-black text-xl outline-none"
              onChange={(e) => handleChangeDiscriptionInput(e, selectedTodo)}
            >
              {discriptionInput}
            </textarea> */}
            <TextareaAutosize
              value={discriptionInput}
              className="text-black text-xl outline-none resize-none"
              onChange={(e) => handleChangeDiscriptionInput(e, selectedTodo)}
            />
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}
export default PendingTodos;
