import CompletedTodos from "../components/CompletedTodos";
import PendingTodos from "../components/PendingTodos";

import { FaCirclePlus } from "react-icons/fa6";
import { IoMdArrowBack } from "react-icons/io";
import { SlMenu } from "react-icons/sl";
import { BiPlanet } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbPhoto } from "react-icons/tb";
import { LuLayoutTemplate } from "react-icons/lu";
import { GoScreenFull } from "react-icons/go";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { IoToday } from "react-icons/io5";
import { FaInbox } from "react-icons/fa6";

import useData from "../hooks/useData";
import { useState } from "react";

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  // DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import { TodoObj } from "../types";
import MinDrawerContent from "../components/MinDrawerContent";
import FullDrawerContent from "../components/FullDrawerContent";
import { INITIAL_NEW_TODO_OBJ } from "../constants";
import Menu from "../components/Menu";

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
  const [isOpenModalSheet, setOpenModalSheet] = useState(false);
  const [newTodo, setNewTodo] = useState<TodoObj>(INITIAL_NEW_TODO_OBJ);
  const [fullScreen, setFullScreen] = useState(false);
  // const [openSidebar, setOpenSidebar] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent maxW="90%" backgroundColor="gray.500">
          {/* <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader> */}
          <DrawerBody>
            <div className="flex flex-col gap-10 py-5 text-white">
              <div className="flex items-center gap-5">
                <RiAccountCircleFill className="text-6xl" />
                <p>Sign in or Sign up</p>
                <div className="flex gap-2">
                  <IoIosSearch className="text-3xl" />
                  <IoSettingsOutline className="text-3xl" />
                </div>
              </div>
              <ul className="flex flex-col gap-4">
                <li className="flex items-center gap-3">
                  <IoToday className="text-3xl" />{" "}
                  <p className="text-xl">Today</p>
                </li>
                <li className="flex items-center gap-3">
                  <FaInbox className="text-3xl" /> <p className="text-xl">Inbox</p>
                </li>
                
              </ul>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

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
