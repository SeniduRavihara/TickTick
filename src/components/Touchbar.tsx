import React, { useState } from "react";
import { LuListTodo } from "react-icons/lu";
import { FaRegCalendar } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
// import { Haptics, ImpactStyle } from "@capacitor/haptics";

const styles = {
  touchBarIcon: "w-7 h-7 cursor-pointer text-gray-600",
  touchedIcon: "w-5 h-5", // Add your desired color for the touched state
};

const touchbarIcons = [
  {
    icon: <LuListTodo className={`${styles.touchBarIcon}`} />,
    to: "/",
  },
  {
    icon: <FaRegCalendar className={`${styles.touchBarIcon}`} />,
    to: "calendar-page",
  },
  {
    icon: <IoMdTime className={`${styles.touchBarIcon}`} />,
    to: "habit-track-page",
  },
  {
    icon: <IoSettingsOutline className={`${styles.touchBarIcon}`} />,
    to: "settings-page",
  },
];

function Touchbar() {
  const [touchedIcon, setTouchedIcon] = useState<React.ReactNode | null>(null);
  // const [currentRoute, setCurrentRoute] = useState();

  const handleTouchStart = (icon: React.ReactNode) => {
    setTouchedIcon(icon);
    // triggerHapticFeedback();
  };

  const handleTouchEnd = () => {
    setTouchedIcon(null);
    // You can add additional logic or effects here
  };

  // const triggerHapticFeedback = async () => {
  //   await Haptics.impact({ style: ImpactStyle.Light });
  // };

  return (
    <div className="w-full h-[50px] bg-white rounded-2xl fixed bottom-0 p-5 shadow-2xl shadow-black flex items-center justify-between">
      {touchbarIcons.map((obj) => (
        <Link
          key={obj.to}
          to={obj.to}
          onTouchStart={() => handleTouchStart(obj.icon)}
          onTouchEnd={handleTouchEnd}
          className="w-1/4 items-center justify-center flex"
        >
          {React.cloneElement(obj.icon, {
            className: `${
              touchedIcon === obj.icon
                ? `${styles.touchedIcon}`
                : `${styles.touchBarIcon}`
            } duration-200 ease-out`,
          })}
        </Link>
      ))}
    </div>
  );
}

export default Touchbar;
