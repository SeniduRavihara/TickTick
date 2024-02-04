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

function TodoListPage() {
  const { todoList } = useData();
  const [isOpenModalSheet, setOpenModalSheet] = useState(false);
  // const [newTodo, setNewTodo] = useState("");

  // const todoAddInputRef = useRef<HTMLInputElement | null>(null);

  const handleAddClick = async () => {
    setOpenModalSheet(true);
    // if (todoAddInputRef.current) todoAddInputRef.current.focus();
  };

  return (
    <div className="w-screen h-screen flex flex-col gap-10 p-3 ">
      <PendingTodos />
      <CompletedTodos compleatedTodoList={todoList} />
      <FaCirclePlus
        className="absolute bottom-20 right-7 text-gray-700 text-6xl"
        onClick={handleAddClick}
      />

      {/* <Sheet
        isOpen={isOpenModalSheet}
        detent="content-height"
        onClose={() => setOpenModalSheet(false)}
        onOpenStart={()=> (todoAddInputRef.current) && todoAddInputRef.current.focus()}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <div className="w-full p-5">
              <input
                ref={todoAddInputRef}
                className="px-5 p-2 border w-full"
                placeholder="What would you like to do?"
                type="text"
              />
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet> */}

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
              />
              <div className="flex gap-5 text-gray-700/50">
                <CgCalendarTwo />
                <TbFlag3 />
                <GoTag />
                <BsThreeDots/>
              </div>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
export default TodoListPage;
