import CompletedTodos from "../components/CompletedTodos";
import PendingTodos from "../components/PendingTodos";

import { FaCirclePlus } from "react-icons/fa6";
import { IoMdArrowBack } from "react-icons/io";
import { SlMenu } from "react-icons/sl";
import { BiPlanet } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";

import useData from "../hooks/useData";
import { useState } from "react";

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  // DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";

import { TodoObj } from "../types";
import MinDrawerContent from "../components/MinDrawerContent";
import FullDrawerContent from "../components/FullDrawerContent";
import { INITIAL_NEW_TODO_OBJ } from "../constants";

function TodoListPage() {
  const [isOpenModalSheet, setOpenModalSheet] = useState(false);
  const [newTodo, setNewTodo] = useState<TodoObj>(INITIAL_NEW_TODO_OBJ);
  const [fullScreen, setFullScreen] = useState(false);

  const { todoList, setTodoList } = useData();

  // useEffect(() => {
  //   setNewTodo((pre) => ({ ...pre, id: String(todoList.length + 1) }));
  // }, [todoList]);

  const handleAddClick = async () => {
    setOpenModalSheet(true);
  };

  const handleAddTodo = () => {
    setTodoList((pre) => [
      ...pre,
      { ...newTodo, timestamp: new Date(), id: String(todoList.length + 1) },
    ]);
    setNewTodo(INITIAL_NEW_TODO_OBJ);
    setOpenModalSheet(false);
  };

  const handleClickPhoto = () => {};
  const handleClickTemplate = () => {};
  // const handleClickFullScreen = () => {
  //   setFullScreen(true);
  // };

  return (
    <div className="w-screen h-screen flex flex-col gap-10 p-3 ">
      <div className="flex items-center justify-between px-2 pt-2">
        <div className="flex items-center gap-5 text-2xl">
          <SlMenu />
          <h1 className="font-bold">Today</h1>
        </div>
        <div className="flex items-center gap-5 text-2xl">
          <BiPlanet />
          <BsThreeDotsVertical />
        </div>
      </div>

      <PendingTodos
        pendingTodoList={todoList.filter((todoObj) => !todoObj.completed)}
      />
      <CompletedTodos
        compleatedTodoList={todoList.filter((todoObj) => todoObj.completed)}
      />
      <FaCirclePlus
        className="fixed bottom-16 right-5 text-gray-700 text-5xl"
        onClick={handleAddClick}
      />

      <div>
        {!fullScreen ? (
          <Drawer
            placement={"bottom"}
            onClose={() => setOpenModalSheet(false)}
            isOpen={isOpenModalSheet}
            isFullHeight={false}
          >
            <DrawerOverlay />
            <DrawerContent>
              {/* <DrawerHeader borderBottomWidth="1px">ADD YOUR WORKS</DrawerHeader> */}
              <DrawerBody>
                <MinDrawerContent
                  handleAddTodo={handleAddTodo}
                  newTodo={newTodo}
                  setFullScreen={setFullScreen}
                  setNewTodo={setNewTodo}
                  handleClickPhoto={handleClickPhoto}
                  handleClickTemplate={handleClickTemplate}
                />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        ) : (
          <Drawer
            placement={"bottom"}
            onClose={() => setOpenModalSheet(false)}
            isOpen={isOpenModalSheet}
            isFullHeight={true}
          >
            <DrawerOverlay />
            <DrawerContent>
              {/* <DrawerHeader borderBottomWidth="1px">ADD YOUR WORKS</DrawerHeader> */}
              <DrawerBody>
                <IoMdArrowBack
                  onClick={() => {
                    setOpenModalSheet(false);
                    setFullScreen(false);
                  }}
                />
                <FullDrawerContent
                  handleAddTodo={handleAddTodo}
                  newTodo={newTodo}
                  setFullScreen={setFullScreen}
                  setNewTodo={setNewTodo}
                />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </div>
  );
}
export default TodoListPage;
