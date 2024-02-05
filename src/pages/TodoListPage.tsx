import CompletedTodos from "../components/CompletedTodos";
import PendingTodos from "../components/PendingTodos";
// import Sheet from "react-modal-sheet";

import { FaCirclePlus } from "react-icons/fa6";
import useData from "../hooks/useData";
import { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";

import { CgCalendarTwo } from "react-icons/cg";
import { TbFlag3 } from "react-icons/tb";
import { GoTag } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import { IoSendSharp } from "react-icons/io5";
import { TodoObj } from "../context/DataContext";

function TodoListPage() {
  const { todoList, setTodoList } = useData();
  const [isOpenModalSheet, setOpenModalSheet] = useState(false);
  const [newTodo, setNewTodo] = useState<TodoObj>({
    completed: false,
    id: "",
    attachmentImage: "",
    discription: "",
    todo: "",
  });

  // const todoAddInputRef = useRef<HTMLInputElement | null>(null);

  const handleAddClick = async () => {
    setOpenModalSheet(true);
    // if (todoAddInputRef.current) todoAddInputRef.current.focus();
  };

  const handleAddTodo = () => {
    setTodoList(newTodo)
  };

  return (
    <div className="w-screen h-screen flex flex-col gap-10 p-3 ">
      <PendingTodos />
      <CompletedTodos compleatedTodoList={todoList} />
      <FaCirclePlus
        className="absolute bottom-20 right-7 text-gray-700 text-6xl"
        onClick={handleAddClick}
      />

      <Drawer
        placement={"bottom"}
        onClose={() => setOpenModalSheet(false)}
        isOpen={isOpenModalSheet}
      >
        <DrawerOverlay />
        <DrawerContent>
          {/* <DrawerHeader borderBottomWidth="1px">ADD YOUR WORKS</DrawerHeader> */}
          <DrawerBody>
            <div className="w-full p-5 flex flex-col gap-3">
              <input
                className="px-5 p-2 outline-none w-full"
                placeholder="What would you like to do?"
                type="text"
                value={newTodo.todo}
                onChange={(e) =>
                  setNewTodo((pre) => ({ ...pre, todo: e.target.value }))
                }
              />
              <input
                className="px-5 p-2 outline-none w-full"
                placeholder="discription?"
                type="text"
                value={newTodo.discription}
                onChange={(e) =>
                  setNewTodo((pre) => ({ ...pre, discription: e.target.value }))
                }
              />
              <div className="flex justify-between gap-5 text-gray-700/50">
                <div className="flex gap-5 text-gray-700/50">
                  <CgCalendarTwo />
                  <TbFlag3 />
                  <GoTag />
                  <BsThreeDots />
                </div>
                <IoSendSharp onClick={handleAddTodo} />
              </div>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
export default TodoListPage;
