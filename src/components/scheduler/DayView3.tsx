// import useData from "@/hooks/useData";
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
import { useState, useRef, useEffect } from "react";
import "./style.css";
import { cn } from "@/lib/utils";

type TaskType = { title: string; start: string; duration: number };

// ------------------------------------------
const rearrangeTasksByTime = (tasks: Array<TaskType>) => {
  // Sort tasks array based on start time
  const sortedTasks = tasks.slice().sort((a, b) => {
    const timeA = convertTimeStringToMinutes(a.start);
    const timeB = convertTimeStringToMinutes(b.start);
    return timeA - timeB;
  });

  return sortedTasks;
};

// Helper function to convert time string to minutes
const convertTimeStringToMinutes = (timeString: string) => {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
};
// ------------------------------------------

const generateTimeSlots = () => {
  const slots = [];
  for (let i = 0; i < 24; i++) {
    slots.push(`${i.toString().padStart(2, "0")}:00`);
    slots.push(`${i.toString().padStart(2, "0")}:30`);
  }
  return slots;
};

// ------------------------------------------

const formatTime = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
};

const DayView3 = () => {
  // const [showAddTab, setShowAddTab] = useState(false);
  const [slectedTimeSlot, setSlectedTimeSlot] = useState("");
  const [draging, setDraging] = useState(false);
  const [enableElement, setEnableElement] = useState<string | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ y: 0, duration: 0 });
  const [tasks, setTasks] = useState<Array<TaskType>>([
    { title: "Task 1", start: "00:00", duration: 1 },
    { title: "Task 2", start: "08:00", duration: 3 },
    { title: "Task 3", start: "06:00", duration: 4 },
  ]);

  // console.log(tasks);

  const longPressTimeout = useRef<number | undefined>(undefined);
  const draggedElement = useRef<HTMLElement | null>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    task: TaskType
  ) => {
    e.dataTransfer.setData("task", JSON.stringify(task));
    const { offsetX, offsetY } = e.nativeEvent;
    setClickPosition({ x: offsetX, y: offsetY });
    setDraging(true);
    setEnableElement(task.title);
    // draggedElement.current = e.target;
    // draggedElement.current.classList.add("dragging");

    const target = e.currentTarget as HTMLElement;
    draggedElement.current = target;
    // console.log("Dragged Element:", draggedElement.current);

    if (draggedElement.current) {
      draggedElement.current.classList.add("dragging");
    } else {
      console.error("Dragged element is null");
    }
  };

  const handleTouchStart = (
    e: React.TouchEvent<HTMLDivElement>,
    task: TaskType
  ) => {
    const touch = e.touches[0];
    const target = e.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const offsetX = touch.clientX - rect.left;
    const offsetY = touch.clientY - rect.top;

    longPressTimeout.current = window.setTimeout(() => {
      setClickPosition({ x: offsetX, y: offsetY });
      target.dataset.task = JSON.stringify(task);
      setDraging(true);
      setEnableElement(task.title);

      draggedElement.current = target;
      if (draggedElement.current) {
        draggedElement.current.classList.add("dragging");
      } else {
        console.error("Dragged element is null");
      }

      document.body.addEventListener("touchmove", preventDefault, {
        passive: false,
      });
    }, 300); // Long press threshold (300ms)
  };

  // --------------------------------------

  const preventDefault = (e: Event) => {
    if (draging || isResizing) {
      e.preventDefault();
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, slotTime: string) => {
    console.log(slotTime);

    e.preventDefault();
    const task = JSON.parse(e.dataTransfer.getData("task"));

    const dropY = e.pageY;
    const relativeY = dropY - clickPosition.y;

    const slotHeight = 50; // Assuming each slot is 50px tall
    const nearestSlotIndex = Math.round(relativeY / slotHeight);
    const nearestSlotTime = generateTimeSlots()[nearestSlotIndex];

    const updatedTasks = tasks.map((t) =>
      t.title === task.title ? { ...t, start: nearestSlotTime } : t
    );
    setTasks(rearrangeTasksByTime(updatedTasks));
    setDraging(false);
    if (draggedElement.current) {
      draggedElement.current.classList.remove("dragging");
      draggedElement.current.style.position = "";
      draggedElement.current.style.left = "";
      draggedElement.current.style.top = "";
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    clearTimeout(longPressTimeout.current);

    if (draging && draggedElement.current) {
      const touch = e.changedTouches[0];
      const task = JSON.parse(draggedElement.current.dataset.task || "{}");

      const dropY = touch.pageY;
      const relativeY = dropY - clickPosition.y;

      const slotHeight = 50;
      const nearestSlotIndex = Math.round(relativeY / slotHeight);
      const nearestSlotTime = generateTimeSlots()[nearestSlotIndex];

      const updatedTasks = tasks.map((t) =>
        t.title === task.title ? { ...t, start: nearestSlotTime } : t
      );
      setTasks(rearrangeTasksByTime(updatedTasks));
      setDraging(false);
      draggedElement.current.classList.remove("dragging");
      draggedElement.current.style.position = "";
      draggedElement.current.style.left = "";
      draggedElement.current.style.top = "";

      document.body.removeEventListener("touchmove", preventDefault);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    console.log("Touch Move");

    clearTimeout(longPressTimeout.current);
    if (
      draging &&
      draggedElement.current &&
      draggedElement.current.parentElement &&
      !isResizing
    ) {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = draggedElement.current.parentElement.getBoundingClientRect();
      draggedElement.current.style.position = "absolute";
      draggedElement.current.style.top = `${
        touch.clientY - rect.top - clickPosition.y
      }px`;
    }
  };
  // const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
  //   clearTimeout(longPressTimeout.current);
  //   if (
  //     draging &&
  //     draggedElement.current &&
  //     draggedElement.current.parentElement
  //   ) {
  //     e.preventDefault();
  //     const touch = e.touches[0];
  //     const rect = draggedElement.current.parentElement.getBoundingClientRect();
  //     const offsetY = touch.clientY - rect.top - clickPosition.y;
  //     const snappedOffsetY = Math.round(offsetY / 50) * 50; // Snap to nearest 50px boundary
  //     draggedElement.current.style.position = "absolute";
  //     draggedElement.current.style.top = `${snappedOffsetY}px`;
  //   }
  // };

  // const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  // };

  useEffect(() => {
    if (draging || isResizing) {
      document.body.style.overflow = "hidden";
      const draggableElements = document.querySelectorAll(".task");
      draggableElements.forEach((el) => {
        (el as HTMLElement).style.touchAction = "none";
      });
    } else {
      document.body.style.overflow = "";
      const draggableElements = document.querySelectorAll(".task");
      draggableElements.forEach((el) => {
        (el as HTMLElement).style.touchAction = "";
      });
    }
  }, [draging, isResizing, tasks]);

  // ==================================================================

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent | TouchEvent) => {
      if (isResizing && resizeStart) {
        const clientY =
          "touches" in event ? event.touches[0].clientY : event.clientY;
        const deltaY = clientY - resizeStart.y;
        const newDuration = Math.max(
          1,
          resizeStart.duration + Math.floor(deltaY / 50)
        );

        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.title === enableElement
              ? { ...task, duration: newDuration }
              : task
          )
        );
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      // setIsLongPress(false);
      // if (longPressTimeout.current) clearTimeout(longPressTimeout.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
    };

    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleMouseMove);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isResizing, resizeStart, enableElement]);

  // const handleTouchMoveResize = (e: React.TouchEvent<HTMLDivElement>) => {
  //   console.log("Touch Move Resize");

  //   clearTimeout(longPressTimeout.current);
  //   if (
  //     isResizing &&
  //     draggedElement.current &&
  //     draggedElement.current.parentElement
  //   ) {
  //     e.preventDefault();
  //     const touch = e.touches[0];
  //     const rect = draggedElement.current.parentElement.getBoundingClientRect();
  //     draggedElement.current.style.position = "absolute";
  //     draggedElement.current.style.top = `${
  //       touch.clientY - rect.top - clickPosition.y
  //     }px`;
  //   }
  // };

  const handleMouseDownInResize = (
    event: React.MouseEvent | React.TouchEvent,
    task: TaskType
  ) => {
    const clientY = (event as React.TouchEvent).touches
      ? (event as React.TouchEvent).touches[0].clientY
      : (event as React.MouseEvent).clientY;
    setIsResizing(true);
    setResizeStart({ y: clientY, duration: task.duration });
    setEnableElement(task.title);
  };

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
        {generateTimeSlots().map((time) => (
          <div
            key={time}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, time)}
            className="border-b flex flex-row items-center border-gray-300 h-[30px]"
          >
            <div
              className={`border-r text-center text-xs text-gray-500 flex items-start justify-center border-gray-300 h-[30px] w-[50px]`}
            >
              {formatTime(time)}
            </div>
            <div
              className="h-[30px]"
              style={{ width: "calc(100% - 50px)" }}
              onClick={() => handleClickSlot(time)}
            >
              {slectedTimeSlot === time && (
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
                        This action cannot be undone. This action cannot be
                        undone. This action cannot be undone. This action cannot
                        be undone. This action cannot be undone. This action
                        cannot be undone.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="h-[350px]"></div>

                    <DrawerFooter>
                      <Button>Submit</Button>
                      <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              )}
            </div>

            {tasks
              .filter((task) => task.start === time)
              .map((task) => (
                <div
                  key={task.title}
                  className={cn(
                    "task w-[77%] relative ml-20 border border-blue-500",
                    enableElement === task.title ? "bg-blue-400" : ""
                  )}
                  style={{
                    height: `${task.duration * 50}px`,
                    position: "absolute",
                    top: `${parseInt(task.start.split(":")[0], 10) / 60}%`,
                  }}
                >
                  <div
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                    onTouchStart={(e) => handleTouchStart(e, task)}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={(e) => handleTouchEnd(e)}
                    className={cn(
                      "w-full h-full",
                      enableElement === task.title ? "bg-blue-400" : ""
                    )}
                    // style={{
                    //   height: `${task.duration * 50}px`,
                    //   position: "absolute",
                    //   top: `${parseInt(task.start.split(":")[0], 10) / 60}%`,
                    // }}
                  >
                    {task.title}
                  </div>

                  <>
                    <div
                      className={cn(
                        "absolute z-10 -top-[6px] left-1/2 w-10 h-10 rounded-full bg-slate-300/50 shadow-xl flex items-center justify-center",
                        enableElement === task.title ? "flex" : "hidden"
                      )}
                      // onMouseDown={(event) => handleMouseDown(event, task)}
                      // onTouchStart={(event) => {
                      //   handleMouseDown(event, task);
                      //   event.preventDefault();
                      // }}
                    >
                      <div className="w-3 h-3 rounded-full bg-blue-600 cursor-ns-resize"></div>
                    </div>

                    <div
                      className={cn(
                        "absolute z-[999] -bottom-[6px] left-1/2 w-10 h-10 bg-slate-300/50 rounded-full  shadow-2xl flex items-center justify-center",
                        enableElement === task.title ? "flex" : "hidden"
                      )}
                      onMouseDown={(event) =>
                        handleMouseDownInResize(event, task)
                      }
                      onTouchStart={(event) => {
                        handleMouseDownInResize(event, task);
                        event.preventDefault();
                      }}
                      onTouchEnd={() => {
                        setIsResizing(false);
                      }}
                    >
                      <div className="w-3 h-3 rounded-full bg-blue-600 cursor-ns-resize"></div>
                    </div>
                  </>
                </div>
              ))}
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
export default DayView3;
