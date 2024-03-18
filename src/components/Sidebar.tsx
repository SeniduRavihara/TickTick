import { RiAccountCircleFill } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp, IoIosSearch } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { IoToday } from "react-icons/io5";
import { FaInbox } from "react-icons/fa6";
import { MdOutlineAddBox } from "react-icons/md";
import { BsList } from "react-icons/bs";
import { GoTag } from "react-icons/go";
import { VscFilter } from "react-icons/vsc";

import {
  Collapse,
  Drawer,
  DrawerBody,
  DrawerContent,
  // DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Menu from "./Menu";
import AddTag from "./AddTag";

type sidebarProps = {
  isOpenSidebar: boolean;
  onCloseSidebar: () => void;
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
  selected: string | null;
};

const sidebarAddMenuItems = [
  {
    label: "List",
    icon: <BsList className="text-xl" />,
    onClick: () => {},
  },
  {
    label: "Filter",
    icon: <VscFilter className="text-xl" />,
    onClick: () => {},
  },
  {
    label: "Tag",
    icon: <GoTag className="text-xl" />,
    onClick: () => {},
  },
];

const Sidebar = ({
  isOpenSidebar,
  onCloseSidebar,
  setSelected,
  selected,
}: sidebarProps) => {
  const [isOpenCollapse, setIsOpenCollapse] = useState(false);

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <div>
      <Drawer placement="left" onClose={onCloseSidebar} isOpen={isOpenSidebar}>
        <DrawerOverlay />
        <DrawerContent maxW="90%" backgroundColor="gray.500">
          {/* <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader> */}
          <DrawerBody>
            <div className="flex flex-col h-full justify-between gap-10 py-5 text-white">
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
                    <FaInbox className="text-3xl" />{" "}
                    <p className="text-xl">Inbox</p>
                  </li>

                  <li className="flex flex-col gap-3">
                    <div
                      className="flex justify-between items-center"
                      onClick={() => setIsOpenCollapse(!isOpenCollapse)}
                    >
                      <h1 className="text-gray-600 font-bold">Tags</h1>
                      <div>
                        {isOpenSidebar ? <IoIosArrowUp /> : <IoIosArrowDown />}
                      </div>
                    </div>
                    <Collapse in={isOpenCollapse} animateOpacity>
                      <ul
                        className={`text-blue-900 flex flex-col divide-y divide-slate-900/10`}
                      >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Repudiandae, quis.
                      </ul>
                    </Collapse>
                  </li>
                </ul>
              </div>

              <div className="flex gap-1 items-center text-xl cursor-pointer text-black">
                <Menu
                  menuBtn={
                    <div className="flex items-center gap-1 text-white">
                      <MdOutlineAddBox /> Add
                    </div>
                  }
                  items={sidebarAddMenuItems}
                  styles="left-1 bottom-16 w-[50%]"
                  setSelected={setSelected}
                />
              </div>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {selected === "Tag" && <AddTag />}
    </div>
  );
};

export default Sidebar;
