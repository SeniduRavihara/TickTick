import Menu from "@/components/Menu";
import { BiPlanet } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GoScreenFull } from "react-icons/go";
import { LuLayoutTemplate } from "react-icons/lu";
import { SlMenu } from "react-icons/sl";
import { TbPhoto } from "react-icons/tb";

const inputTodoSheetMenuItems = [
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

const Topbar = ({ onOpenSidebar }: { onOpenSidebar: () => void }) => {
  return (
    <div className="flex items-center justify-between px-2 pt-2">
      <div className="flex items-center gap-5 text-2xl">
        <SlMenu onClick={onOpenSidebar} />
        <h1 className="font-bold">Today</h1>
      </div>
      <div className="flex items-center gap-5 text-2xl">
        <BiPlanet />

        <Menu
          menuBtn={<BsThreeDotsVertical />}
          items={inputTodoSheetMenuItems}
          styles="right-1 top-2"
        />
      </div>
    </div>
  );
};

export default Topbar