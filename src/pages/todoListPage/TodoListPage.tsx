import CompletedTodos from "@/pages/todoListPage/components/CompletedTodos";
import PendingTodos from "@/pages/todoListPage/components/PendingTodos";

import { useDisclosure } from "@chakra-ui/react";

import useData from "@/hooks/useData";
import { useState } from "react";

import Sidebar from "@/pages/todoListPage/components/Sidebar";
import Topbar from "@/pages/todoListPage/components/Topbar";
import InputTodoSheet from "@/pages/todoListPage/components/InputTodoSheet";
import { FaCirclePlus } from "react-icons/fa6";

function TodoListPage() {
  const [isOpenInputTodoSheet, setIsOpenInputTodoSheet] = useState(false);
  const [fullScreenInputTodoSheet, setFullScreenInputTodoSheet] =
    useState(false);

  const {
    isOpen: isOpenSidebar,
    onOpen: onOpenSidebar,
    onClose: onCloseSidebar,
  } = useDisclosure();

  const [selected, setSelected] = useState<string | null>(null);

  0;
  const { todoList } = useData();

  const handleAddClick = async () => {
    setIsOpenInputTodoSheet(true);
  };

  // const handleClickFullScreen = () => {
  //   setFullScreenInputTodoSheet(true);
  // };

  // const handleClickThreeDots = () => {};

  return (
    <div className="w-screen h-screen overflow-y-scroll flex flex-col gap-10 p-3 bg-[#050505]">
      <Topbar onOpenSidebar={onOpenSidebar} />

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
        className="fixed bottom-16 right-10 text-[#ada7a7] text-5xl"
        onClick={handleAddClick}
      />

      <InputTodoSheet
        fullScreenInputTodoSheet={fullScreenInputTodoSheet}
        isOpenInputTodoSheet={isOpenInputTodoSheet}
        setFullScreenInputTodoSheet={setFullScreenInputTodoSheet}
        setIsOpenInputTodoSheet={setIsOpenInputTodoSheet}
      />
    </div>
  );
}
export default TodoListPage;
