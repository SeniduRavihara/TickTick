import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

import { CgCalendarTwo } from "react-icons/cg";
import { TbFlag3 } from "react-icons/tb";
import { GoTag } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import { IoSendSharp } from "react-icons/io5";
import { TbPhoto } from "react-icons/tb";
import { LuLayoutTemplate } from "react-icons/lu";
import { GoScreenFull } from "react-icons/go";
import { TodoObj } from "../types";

type FullDrawerContentType = {
  newTodo: TodoObj;
  setNewTodo: React.Dispatch<React.SetStateAction<TodoObj>>;
  handleAddTodo: () => void;
  setFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
};

function FullDrawerContent({
  newTodo,
  setNewTodo,
  handleAddTodo,
  setFullScreen,
}: FullDrawerContentType) {
  const handleClickFullScreen = () => {
    setFullScreen(true);
  };

  return (
    <>
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

            <Menu autoSelect={false}>
              <MenuButton _active={{ color: "blue.600" }}>
                <BsThreeDots />
              </MenuButton>
              <MenuList backgroundColor="white" minWidth={150}>
                <MenuItem icon={<TbPhoto />} width={150}>
                  <div className="text-black">Photo</div>
                </MenuItem>
                <MenuItem icon={<LuLayoutTemplate />} w={150}>
                  <div className="text-black">Template</div>
                </MenuItem>
                <MenuItem
                  onClick={handleClickFullScreen}
                  icon={<GoScreenFull />}
                  w={150}
                >
                  <div className="text-black">Full-Screen</div>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
          <IoSendSharp onClick={handleAddTodo} />
        </div>
      </div>
    </>
  );
}
export default FullDrawerContent;
