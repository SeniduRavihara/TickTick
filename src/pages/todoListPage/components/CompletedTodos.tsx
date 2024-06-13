import { Box, Collapse, Checkbox } from "@chakra-ui/react";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TiAttachment } from "react-icons/ti";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbFlag3 } from "react-icons/tb";

import BottomSheet from "@/components/bottom_sheet/BottomSheet";
import useData from "@/hooks/useData";
import { TodoObj } from "@/types";
import { INITIAL_NEW_TODO_OBJ } from "@/constants";
import { formatDateString } from "@/utils";
import TextareaAutosize from "react-textarea-autosize";

function CompletedTodos({
  compleatedTodoList,
}: {
  compleatedTodoList: Array<TodoObj>;
}) {
  const [isOpen, setIsOpen] = useState(true);
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
        className={`w-full bg-[#ffffff09] shadow-sm rounded-lg flex flex-col p-3`}
      >
        <div
          className="flex justify-between items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h1 className="text-[#d3cfcf] font-bold">COMPLEATED</h1>
          <div>
            {isOpen ? (
              <IoIosArrowUp className="text-[#d3cfcf]" />
            ) : (
              <IoIosArrowDown className="text-[#d3cfcf]" />
            )}
          </div>
        </div>

        <Collapse in={isOpen} animateOpacity className="">
          <Box
            p="20px"
            color="gray.500"
            mt="0"
            bg="#ffffff09"
            rounded="md"
            shadow="md"
            border={"3px solid #ffffff0e"}
          >
            <ul
              className={`text-blue-900 flex flex-col divide-y divide-slate-900/10 `}
            >
              {compleatedTodoList.map((todoObj) => (
                <li
                  key={todoObj.id}
                  className="flex justify-between items-center "
                >
                  <Checkbox
                    colorScheme="gray"
                    iconColor="gray.100"
                    // size="sm"
                    defaultChecked
                    onChange={() => handleCheckboxChange(todoObj.id)}
                  ></Checkbox>
                  <h1
                    className="text-md text-gray-400 w-9/12 "
                    onClick={() => handleClickTodo(todoObj)}
                  >
                    {todoObj.todo}
                  </h1>
                  <TiAttachment className="cursor-pointer 2/12 text-[#d3cfcf]" />
                </li>
              ))}
            </ul>
          </Box>
        </Collapse>
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
              {/* Last Mon, 29 Jan */}
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
export default CompletedTodos;
