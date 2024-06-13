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

// Helper function to convert minutes to time string
const convertMinutesToTimeString = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
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

const Scheduler = () => {
  const [draging, setDraging] = useState(false);
  const [enableElement, setEnableElement] = useState<string | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({
    y: 0,
    duration: 0,
    start: "",
  });
  const [tasks, setTasks] = useState<Array<TaskType>>([
    { title: "Task 1", start: "00:00", duration: 1 },
    { title: "Task 2", start: "08:00", duration: 3 },
    { title: "Task 3", start: "06:00", duration: 4 },
  ]);

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

    const target = e.currentTarget as HTMLElement;
    draggedElement.current = target;

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

  const preventDefault = (e: Event) => {
    if (draging || isResizing) {
      e.preventDefault();
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, slotTime: string) => {
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

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent | TouchEvent) => {
      if (isResizing && resizeStart) {
        const clientY =
          "touches" in event ? event.touches[0].clientY : event.clientY;
        const deltaY = clientY - resizeStart.y;
        const isTopResize = resizeStart.start !== "";

        setTasks((prevTasks) =>
          prevTasks.map((task) => {
            if (task.title === enableElement) {
              const newDuration = isTopResize
                ? Math.max(1, resizeStart.duration - Math.floor(deltaY / 50))
                : Math.max(1, resizeStart.duration + Math.floor(deltaY / 50));

              const newStart = isTopResize
                ? convertMinutesToTimeString(
                    Math.max(
                      0,
                      convertTimeStringToMinutes(resizeStart.start) +
                        Math.floor(deltaY / 50) * 30
                    )
                  )
                : task.start;

              return {
                ...task,
                start: newStart,
                duration: newDuration,
              };
            }
            return task;
          })
        );
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
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

  const handleMouseDownInResize = (
    event: React.MouseEvent | React.TouchEvent,
    task: TaskType,
    resizeType: "top" | "bottom"
  ) => {
    const clientY = (event as React.TouchEvent).touches
      ? (event as React.TouchEvent).touches[0].clientY
      : (event as React.MouseEvent).clientY;
    setIsResizing(true);
    setResizeStart({
      y: clientY,
      duration: task.duration,
      start: resizeType === "top" ? task.start : "",
    });
    setEnableElement(task.title);
  };

  return (
    <div className="scheduler w-full" onClick={() => setEnableElement(null)}>
      <div className="fixed top-1 left-[300px] text-lg z-10 bg-slate-700 text-white">
        {enableElement ? "true" : "false"}
      </div>
      {generateTimeSlots().map((time) => (
        <div
          key={time}
          className="time-slot"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, time)}
        >
          <div className="time-label">{formatTime(time)}</div>
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
                  top: `${
                    (convertTimeStringToMinutes(task.start) / 60 / 24) * 100
                  }%`,
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
                >
                  {task.title}
                </div>

                <>
                  <div
                    className={cn(
                      "absolute z-10 -top-[6px] left-1/2 w-10 h-10 rounded-full bg-slate-300/50 shadow-xl flex items-center justify-center",
                      enableElement === task.title ? "flex" : "hidden"
                    )}
                    onMouseDown={(event) =>
                      handleMouseDownInResize(event, task, "top")
                    }
                    onTouchStart={(event) => {
                      handleMouseDownInResize(event, task, "top");
                      event.preventDefault();
                    }}
                    onTouchEnd={() => {
                      setIsResizing(false);
                    }}
                  >
                    <div className="w-3 h-3 rounded-full bg-blue-600 cursor-ns-resize"></div>
                  </div>

                  <div
                    className={cn(
                      "absolute z-[999] -bottom-[6px] left-1/2 w-10 h-10 bg-slate-300/50 rounded-full shadow-2xl flex items-center justify-center",
                      enableElement === task.title ? "flex" : "hidden"
                    )}
                    onMouseDown={(event) =>
                      handleMouseDownInResize(event, task, "bottom")
                    }
                    onTouchStart={(event) => {
                      handleMouseDownInResize(event, task, "bottom");
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
  );
};

export default Scheduler;
