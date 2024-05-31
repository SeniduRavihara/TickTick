import React, { useState } from "react";
import { LuListTodo } from "react-icons/lu";
import { FaRegCalendar, FaRegCalendarAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
// import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { IonIcon } from '@ionic/react';
import { logoIonic } from 'ionicons/icons';
import { RiAccountCircleFill, RiAccountCircleLine } from "react-icons/ri";
import { SiTodoist, SiYoutubeshorts } from "react-icons/si";
import { GoClockFill } from "react-icons/go";


const styles = {
  touchBarIcon: "w-7 h-7 cursor-pointer text-gray-700",
  touchedIcon: "w-7 h-7", // Add your desired color for the touched state
};

const touchbarIcons = [
  {
    icon: <SiTodoist className={`${styles.touchBarIcon}`} />,
    focusIcon: <LuListTodo className={`${styles.touchBarIcon}`} />,
    label: "Todos",
    to: "/",
  },
  {
    icon: <FaRegCalendarAlt className={`${styles.touchBarIcon}`} />,
    focusIcon: <FaRegCalendarAlt className={`${styles.touchBarIcon}`} />,
    label: "Calender",
    to: "calendar-page",
  },
  {
    icon: <SiYoutubeshorts className={`${styles.touchBarIcon}`} />,
    focusIcon: <SiYoutubeshorts className={`${styles.touchBarIcon}`} />,
    label: "Shorts",
    to: "habit-track-page",
  },
  {
    icon: <GoClockFill className={`${styles.touchBarIcon}`} />,
    focusIcon: <GoClockFill className={`${styles.touchBarIcon}`} />,
    label: "Habbits",
    to: "habit-track-page",
  },
  {
    icon: <RiAccountCircleFill className={`${styles.touchBarIcon}`} />,
    focusIcon: <RiAccountCircleFill className={`${styles.touchBarIcon}`} />,
    label: "You",
    to: "settings-page",
  },
];

function Touchbar() {
  const [touchedIcon, setTouchedIcon] = useState<React.ReactNode | null>(null);
  // const [currentRoute, setCurrentRoute] = useState(

  const location = useLocation()

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
    <div className="w-full h-[50px] bg-white  fixed bottom-0 p-5 shadow-2xl shadow-black flex items-center justify-between">
      {touchbarIcons.map((obj) => (
        <Link
          key={obj.label}
          to={obj.to}
          // onTouchStart={() => handleTouchStart(obj.icon)}
          // onTouchEnd={handleTouchEnd}
          className="w-1/4 items-center justify-center flex flex-col"
        >
          {React.cloneElement(
            location.pathname === `/${obj.to}` ? obj.focusIcon : obj.icon,
            {
              className: `${
                touchedIcon === obj.icon
                  ? `${styles.touchedIcon}`
                  : `${styles.touchBarIcon}`
              } duration-200 ease-out`,
            }
          )}
        </Link>
      ))}
    </div>
  );
}

export default Touchbar;
