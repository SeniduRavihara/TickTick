
import { CgCalendarTwo } from "react-icons/cg";
import { TbFlag3 } from "react-icons/tb";
import { GoTag } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import { IoSendSharp } from "react-icons/io5";
import { TbPhoto } from "react-icons/tb";
import { LuLayoutTemplate } from "react-icons/lu";
import { GoScreenFull } from "react-icons/go";
import { TodoObj } from "../types";
import { useRef } from "react";
import Menu from "./Menu";

type MinDrawerContentType = {
  newTodo: TodoObj;
  setNewTodo: React.Dispatch<React.SetStateAction<TodoObj>>;
  handleAddTodo: () => void;
  setFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
  handleClickPhoto: () => void;
  handleClickTemplate: () => void;
};

function MinDrawerContent({
  newTodo,
  setNewTodo,
  handleAddTodo,
  setFullScreen,
  handleClickPhoto,
  handleClickTemplate,
}: MinDrawerContentType) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClickFullScreen = () => {
    setFullScreen(true);
  };

  const menuItems = [
    {
      label: "Photo",
      icon: <TbPhoto className="text-xl" />,
      onClick: handleClickPhoto,
    },
    {
      label: "Template",
      icon: <LuLayoutTemplate className="text-xl" />,
      onClick: handleClickTemplate,
    },
    {
      label: "Full-Screen",
      icon: <GoScreenFull className="text-xl" />,
      onClick: handleClickFullScreen,
    },
  ];

  return (
    <>
      <div className="w-full p-2 flex flex-col gap-0">
        <input
          className="px-5 p-2 outline-none w-full"
          placeholder="What would you like to do?"
          ref={inputRef}
          type="text"
          value={newTodo.todo}
          onChange={(e) =>
            setNewTodo((pre) => ({ ...pre, todo: e.target.value }))
          }
        />
        <input
          className="px-5 text-xs p-2 outline-none w-full"
          placeholder="Discription?"
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

            <Menu
              menuBtn={<BsThreeDots onClick={()=>inputRef.current?.focus()} />}
              items={menuItems}
            />

          </div>
          <IoSendSharp onClick={handleAddTodo} />
        </div>
      </div>
    </>
  );
}
export default MinDrawerContent;
