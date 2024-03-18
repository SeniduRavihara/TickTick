import CompletedTodos from "@/components/CompletedTodos";
import PendingTodos from "@/components/PendingTodos";

import { FaCirclePlus } from "react-icons/fa6";
import { IoMdArrowBack } from "react-icons/io";
import { SlMenu } from "react-icons/sl";
import { BiPlanet } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbPhoto } from "react-icons/tb";
import { LuLayoutTemplate } from "react-icons/lu";
import { GoScreenFull } from "react-icons/go";

import useData from "@/hooks/useData";
import { useState } from "react";

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  // DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import { TodoObj } from "@/types";
import MinDrawerContent from "@/components/MinDrawerContent";
import FullDrawerContent from "@/components/FullDrawerContent";
import { INITIAL_NEW_TODO_OBJ } from "@/constants";
import Menu from "@/components/Menu";
import Sidebar from "@/components/Sidebar";

const menuItems = [
  {
    label: "Photo",
    icon: <TbPhoto className="text-xl" />,
    onClick: () => {},
  },
  {
    label: "Template",
    icon: <LuLayoutTemplate className="text-xl" />,
    onClick: () => {},
  },
  {
    label: "Full-Screen",
    icon: <GoScreenFull className="text-xl" />,
    onClick: () => {},
  },
];

function TodoListPage() {
  const [isOpenInputTodoSheet, setIsOpenInputTodoSheet] = useState(false);
  const [fullScreenInputTodoSheet, setFullScreenInputTodoSheet] = useState(false);

  const [newTodo, setNewTodo] = useState<TodoObj>(INITIAL_NEW_TODO_OBJ);

  const { isOpen: isOpenSidebar, onOpen, onClose: onCloseSidebar } = useDisclosure();
  const [selected, setSelected] = useState<string | null>(null);

  0;
  const { todoList, setTodoList } = useData();

  // useEffect(() => {
  //   setNewTodo((pre) => ({ ...pre, id: String(todoList.length + 1) }));
  // }, [todoList]);

  const handleAddClick = async () => {
    setIsOpenInputTodoSheet(true);
  };

  const handleAddTodo = () => {
    setTodoList((pre) => [
      ...pre,
      { ...newTodo, timestamp: new Date(), id: String(todoList.length + 1) },
    ]);
    setNewTodo(INITIAL_NEW_TODO_OBJ);
    setIsOpenInputTodoSheet(false);
  };

  const handleClickPhoto = () => {};
  const handleClickTemplate = () => {};
  // const handleClickFullScreen = () => {
  //   setFullScreenInputTodoSheet(true);
  // };

  // const handleClickThreeDots = () => {};

  return (
    <div className="w-screen h-screen overflow-y-scroll flex flex-col gap-10 p-3 ">
      <div className="flex items-center justify-between px-2 pt-2">
        <div className="flex items-center gap-5 text-2xl">
          <SlMenu onClick={onOpen} />
          <h1 className="font-bold">Today</h1>
        </div>
        <div className="flex items-center gap-5 text-2xl">
          <BiPlanet />
          {/* <BsThreeDotsVertical onClick={handleClickThreeDots} /> */}
          <Menu
            menuBtn={<BsThreeDotsVertical />}
            items={menuItems}
            styles="right-1 top-2"
          />
        </div>
      </div>

      {/* <Sidebar styles={`${openSidebar ? "-ml-[500px]" : "ml-0"}`} /> */}
      <Sidebar
        isOpenSidebar={isOpenSidebar}
        onCloseSidebar={onCloseSidebar}
        selected={selected}
        setSelected={setSelected}
      />

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
        {!fullScreenInputTodoSheet ? (
          <Drawer
            placement={"bottom"}
            onClose={() => setIsOpenInputTodoSheet(false)}
            isOpen={isOpenInputTodoSheet}
            isFullHeight={false}
          >
            <DrawerOverlay />
            <DrawerContent>
              {/* <DrawerHeader borderBottomWidth="1px">ADD YOUR WORKS</DrawerHeader> */}
              <DrawerBody>
                <MinDrawerContent
                  handleAddTodo={handleAddTodo}
                  newTodo={newTodo}
                  setFullScreenInputTodoSheet={setFullScreenInputTodoSheet}
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
            onClose={() => setIsOpenInputTodoSheet(false)}
            isOpen={isOpenInputTodoSheet}
            isFullHeight={true}
          >
            <DrawerOverlay />
            <DrawerContent>
              {/* <DrawerHeader borderBottomWidth="1px">ADD YOUR WORKS</DrawerHeader> */}
              <DrawerBody>
                <IoMdArrowBack
                  onClick={() => {
                    setIsOpenInputTodoSheet(false);
                    setFullScreenInputTodoSheet(false);
                  }}
                />
                <FullDrawerContent
                  handleAddTodo={handleAddTodo}
                  newTodo={newTodo}
                  setFullScreenInputTodoSheet={setFullScreenInputTodoSheet}
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
