import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";
import { IoMdArrowBack } from "react-icons/io";
import MinDrawerContent from "./MinDrawerContent";
import useData from "@/hooks/useData";
import React, { useState } from "react";
import { TodoObj } from "@/types";
import { INITIAL_NEW_TODO_OBJ } from "@/constants";
import FullDrawerContent from "./FullDrawerContent";

type InputTodoSheetType = {
  fullScreenInputTodoSheet: boolean;
  setFullScreenInputTodoSheet: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenInputTodoSheet: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenInputTodoSheet: boolean;
};

const InputTodoSheet = ({
  fullScreenInputTodoSheet,
  setIsOpenInputTodoSheet,
  isOpenInputTodoSheet,
  setFullScreenInputTodoSheet,
}: InputTodoSheetType) => {
  const { todoList, setTodoList } = useData();
  const [newTodo, setNewTodo] = useState<TodoObj>(INITIAL_NEW_TODO_OBJ);

  const handleAddTodo = () => {
    setTodoList((pre) => [
      ...pre,
      {
        ...newTodo,
        timestamp: new Date(),
        id: String(todoList.length + 1),
      },
    ]);
    setNewTodo(INITIAL_NEW_TODO_OBJ);
    setIsOpenInputTodoSheet(false);
  };

  const handleClickPhoto = () => {};
  const handleClickTemplate = () => {};

  return (
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
  );
};
export default InputTodoSheet;
