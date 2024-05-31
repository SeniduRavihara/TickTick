import { useState, useRef, useEffect } from "react";
import "./style.css";

type TaskType = { title: string; start: string; duration: number };

const Scheduler = () => {
  const [draging, setDraging] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [tasks, setTasks] = useState<Array<TaskType>>([
    { title: "Task 1", start: "00:00", duration: 1 },
    { title: "Task 2", start: "08:00", duration: 3 },
    { title: "Task 3", start: "06:00", duration: 4 },
  ]);

  const longPressTimeout = useRef(null);
  const draggedElement = useRef(null);

  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 0; i < 24; i++) {
      slots.push(`${i.toString().padStart(2, "0")}:00`);
      slots.push(`${i.toString().padStart(2, "0")}:30`);
    }
    return slots;
  };
  // -----------------------------------------------
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    task: TaskType
  ) => {
    e.dataTransfer.setData("task", JSON.stringify(task));
    const { offsetX, offsetY } = e.nativeEvent;
    setClickPosition({ x: offsetX, y: offsetY });
    setDraging(true);
    draggedElement.current = e.target;
    draggedElement.current.classList.add("dragging");
  };
  // -----------------------------------------------
  const handleTouchStart = (
    e: React.TouchEvent<HTMLDivElement>,
    task: TaskType
  ) => {
    const touch = e.touches[0];
    const rect = e.target.getBoundingClientRect();
    const offsetX = touch.clientX - rect.left;
    const offsetY = touch.clientY - rect.top;

    longPressTimeout.current = setTimeout(() => {
      console.log({ offsetX, offsetY });
      setClickPosition({ x: offsetX, y: offsetY });
      e.target.dataset.task = JSON.stringify(task);
      setDraging(true);
      draggedElement.current = e.target;
      draggedElement.current.classList.add("dragging");

      // Add event listeners to prevent scrolling
      document.body.addEventListener("touchmove", preventDefault, {
        passive: false,
      });
    }, 300); // Long press threshold (500ms)
  };

  const preventDefault = (e: Event, dragging: boolean) => {
    if (dragging) {
      e.preventDefault();
    }
  };
  // -----------------------------------------------

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, slotTime: string) => {
    e.preventDefault();
    const task = JSON.parse(e.dataTransfer.getData("task"));

    // Get the position where the drop happened
    const dropY = e.pageY;
    const relativeY = dropY - clickPosition.y;
    console.log({ relativeY });

    // Calculate the nearest time slot to the drop position
    const slotHeight = 50; // Assuming each slot is 50px tall
    const nearestSlotIndex = Math.round(relativeY / slotHeight);
    const nearestSlotTime = generateTimeSlots()[nearestSlotIndex];
    console.log({ nearestSlotIndex });

    // console.log({ slotTime: slotTime.slice(-5) });

    // const newStart = slotTime.padStart(5, "0").slice(-5);

    const updatedTasks = tasks.map((t) =>
      t.title === task.title ? { ...t, start: nearestSlotTime } : t
    );
    setTasks(updatedTasks);
    setDraging(false);
    if (draggedElement.current) {
      draggedElement.current.classList.remove("dragging");
    }
  };
  // -----------------------------------------------
  const handleTouchEnd = (
    e: React.TouchEvent<HTMLDivElement>,
    slotTime: string
  ) => {
    clearTimeout(longPressTimeout.current);

    if (draging) {
      const touch = e.changedTouches[0];
      const task = JSON.parse(draggedElement.current.dataset.task);

      const dropY = touch.pageY;
      // const parentOffsetTop = e.target.getBoundingClientRect().top;
      const relativeY = dropY - clickPosition.y;
      console.log({ relativeY });

      const slotHeight = 50; // Assuming each slot is 50px tall
      const nearestSlotIndex = Math.round(relativeY / slotHeight);
      const nearestSlotTime = generateTimeSlots()[nearestSlotIndex];
      console.log({ nearestSlotIndex });

      // console.log({ slotTime: slotTime.slice(-5) });

      // const newStart = slotTime.padStart(5, "0").slice(-5);

      const updatedTasks = tasks.map((t) =>
        t.title === task.title ? { ...t, start: nearestSlotTime } : t
      );
      setTasks(updatedTasks);
      setDraging(false);
      draggedElement.current.classList.remove("dragging");
      draggedElement.current.style.position = "";
      draggedElement.current.style.left = "";
      draggedElement.current.style.top = "";

      // Remove event listeners that prevent scrolling
      document.body.removeEventListener("touchmove", preventDefault);
    }
  };
  // -----------------------------------------------
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    // e.preventDefault();
    clearTimeout(longPressTimeout.current);
    if (draging && draggedElement.current) {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = draggedElement.current.parentElement.getBoundingClientRect();
      draggedElement.current.style.position = "absolute";
      // draggedElement.current.style.left = `${
      //   touch.clientX - rect.left - clickPosition.x
      // }px`;
      draggedElement.current.style.top = `${
        touch.clientY - rect.top - clickPosition.y
      }px`;
    }
  };

  // -----------------------------------------------

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  // -----------------------------------------------
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    // Add touch-action: none; to draggable elements
    console.log({ draging });

    const draggableElements = document.querySelectorAll(".task");
    draggableElements.forEach((el) => {
      (el as HTMLElement).style.touchAction = "none";
    });
  }, [draging, tasks]);

  return (
    <div className="scheduler">
      {generateTimeSlots().map((time) => (
        <div
          key={time}
          className="time-slot"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, time)}
          onTouchEnd={(e) => handleTouchEnd(e, time)}
          onTouchMove={handleTouchMove}
        >
          <div className="time-label">{formatTime(time)}</div>
          {tasks
            .filter((task) => task.start === time)
            .map((task) => (
              <div
                key={task.title}
                className="task ml-20"
                draggable
                onDragStart={(e) => handleDragStart(e, task)}
                onTouchStart={(e) => handleTouchStart(e, task)}
                style={{
                  height: `${task.duration * 50}px`,
                  position: "absolute",
                  top: `${parseInt(task.start.split(":")[1], 10) / 60}%`,
                }}
              >
                {task.title}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Scheduler;
