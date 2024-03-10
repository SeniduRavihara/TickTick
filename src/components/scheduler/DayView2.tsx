// import useData from "@/hooks/useData";
import { useState } from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";

const DayView2 = () => {
  // const [showAddTab, setShowAddTab] = useState(false);
  const [slectedTimeSlot, setSlectedTimeSlot] = useState("");

  // const { todoList, setTodoList } = useData();

  const hours: string[] = [
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
  ];

  const handleAddEventClick = () => {
    // alert("Add event clicked");
  };

  const handleClickSlot = (hour: string) => {
    setSlectedTimeSlot(hour);
  };

  return (
    <div className="flex flex-col bg-gray-100 mb-[50px]">
      <header className="flex justify-between px-3 items-center h-[50px] bg-white">
        <button className="text-blue-500 hover:text-blue-700">Previous</button>
        <span className="text-xl">{new Date().toLocaleDateString()}</span>
        <button className="text-blue-500 hover:text-blue-700">Next</button>
      </header>

      <div className="flex flex-col">
        {hours.map((hour) => (
          <div
            key={hour}
            className="border-b flex flex-row items-center border-gray-300 h-[30px]"
          >
            <div
              className={`border-r text-center text-xs text-gray-500 flex items-start justify-center border-gray-300 h-[30px] w-[50px]`}
            >
              {hour}
            </div>
            <div
              className="h-[30px]"
              style={{ width: "calc(100% - 50px)" }}
              onClick={() => handleClickSlot(hour)}
            >
              {slectedTimeSlot === hour && (
                <Drawer>
                  <DrawerTrigger
                    onClick={() => handleAddEventClick()}
                    className="bg-sky-400 text-white px-4 h-full w-full rounded"
                  >
                    Add Event
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                      <DrawerDescription>
                        This action cannot be undone.
                        This action cannot be undone.
                        This action cannot be undone.
                        This action cannot be undone.
                        This action cannot be undone.
                        This action cannot be undone.
                        <div className="h-[350px]"></div>
                      </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                      <Button>Submit</Button>
                      <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              )}
            </div>
          </div>
        ))}
      </div>

      <div
        className="absolute top-[50px] pointer-events-none ml-[50px] h-[690px]"
        style={{ width: "calc(100% - 50px)" }}
      ></div>
    </div>
  );
};
export default DayView2;
