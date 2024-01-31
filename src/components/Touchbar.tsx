import { useState } from "react";
import { FcCalendar } from "react-icons/fc";
import { FcTodoList } from "react-icons/fc";
import { FcSettings } from "react-icons/fc";
import { FcTimeline } from "react-icons/fc";
// import { FcOvertime } from "react-icons/fc";
// import { FcAlarmClock } from "react-icons/fc";
// import { FcAddImage } from "react-icons/fc";
// import { FcAbout } from "react-icons/fc";
// import { FcGraduationCap } from "react-icons/fc";
// import { FcLeft } from "react-icons/fc";
// import { FcMenu } from "react-icons/fc";
// import { FcOk } from "react-icons/fc";
import { Link } from "react-router-dom";

import { Capacitor } from "@capacitor/core";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

const touchbarIcons = [
  {
    icon: <FcTodoList className="w-8 h-8 cursor-pointer" />,
    to: "/",
  },
  {
    icon: <FcCalendar className="w-8 h-8 cursor-pointer" />,
    to: "calendar-page",
  },
  {
    icon: <FcTimeline className="w-8 h-8 cursor-pointer" />,
    to: "habit-track-page",
  },
  {
    icon: <FcSettings className="w-8 h-8 cursor-pointer" />,
    to: "settings-page",
  },
];

function Touchbar() {
  const [isTouched, setIsTouched] = useState(false);

  const handleTouchStart = () => {
    setIsTouched(true);
    triggerHapticFeedback();
  };

  const handleTouchEnd = () => {
    setIsTouched(false);
    // You can add additional logic or effects here
  };

  const triggerHapticFeedback = async () => {
    await Haptics.impact({ style: ImpactStyle.Light });
  };

  return (
    <div className="w-full h-[50px] bg-white/10 rounded-2xl fixed bottom-0 p-5 shadow-2xl shadow-black flex items-center justify-between">
      {/* <Link
        to="todolist-page"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        // className={`${isTouched ? "bg-red-700" : ""} duration-500 ease-out`}
      >
        <FcTodoList className="w-10 h-10 cursor-pointer" />
      </Link>
      <Link to="calendar-page">
        <FcCalendar className="w-10 h-10 cursor-pointer" />
      </Link>
      <Link to="habit-track-page">
        <FcTimeline className="w-10 h-10 cursor-pointer" />
      </Link>
      <Link to="settings-page">
        <FcSettings className="w-10 h-10 cursor-pointer" />
      </Link> */}

      {touchbarIcons.map((obj) => (
        <Link
          key={obj.to}
          to={obj.to}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {obj.icon}
        </Link>
      ))}
    </div>
  );
}
export default Touchbar;
