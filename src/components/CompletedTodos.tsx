import { Box, Collapse, Checkbox } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TiAttachment } from "react-icons/ti";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbFlag3 } from "react-icons/tb";
import BottomSheet from "./bottom_sheet/BottomSheet";
import useData from "../hooks/useData";
import { TodoObj } from "../types";
import { INITIAL_NEW_TODO_OBJ } from "../constants";
import { formatDateString } from "../utils";

function CompletedTodos({
  compleatedTodoList,
}: {
  compleatedTodoList: Array<TodoObj>;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);
  const [selectedTodo, setSelectedTodo] =
    useState<TodoObj>(INITIAL_NEW_TODO_OBJ);

  const { setTodoList } = useData();

  useEffect(() => {
    console.log(selectedTodo.timestamp?.toLocaleString());
  }, [selectedTodo]);

  const handleCheckboxChange = (id: string) => {
    setTodoList((prev) =>
      prev.map((todoObj) =>
        todoObj.id === id
          ? { ...todoObj, completed: !todoObj.completed }
          : todoObj
      )
    );
  };




  return (
    <div>
      <div
        className={`w-full bg-white/50 shadow-sm rounded-lg flex flex-col p-3`}
      >
        <div
          className="flex justify-between items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h1 className="text-gray-600 font-bold">COMPLEATED</h1>
          <div>{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
        </div>

        <Collapse in={isOpen} animateOpacity>
          <Box
            p="20px"
            color="gray.500"
            mt="0"
            bg="#F2F3F5"
            rounded="md"
            shadow="md"
          >
            <ul
              className={`text-blue-900 flex flex-col divide-y divide-slate-900/10`}
            >
              {compleatedTodoList.map((todoObj) => (
                <li
                  key={todoObj.id}
                  className="flex justify-between items-center"
                >
                  {/* <input
                    type="checkbox"
                    className="w-1/12 text-gray-500"
                    checked={todoObj.completed}
                    onChange={() => handleCheckboxChange(todoObj.id)}
                  /> */}
                  <Checkbox
                    colorScheme="gray"
                    iconColor="gray.100"
                    // size="sm"
                    defaultChecked
                    // checked={todoObj.completed}
                    onChange={() => handleCheckboxChange(todoObj.id)}
                  ></Checkbox>
                  <h1
                    className="text-md text-gray-400 w-9/12"
                    onClick={() => {
                      setSelectedTodo(todoObj);
                      setIsOpenBottomSheet(true);
                    }}
                  >
                    {todoObj.todo}
                  </h1>
                  <TiAttachment className="cursor-pointer 2/12" />
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

          <div className="mt-4">
            <h1 className="text-black text-xl font-bold">
              {selectedTodo.todo}
            </h1>
            <p>{selectedTodo.discription}</p>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}
export default CompletedTodos;
