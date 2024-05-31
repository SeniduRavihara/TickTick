import { useState } from "react";
import "./style.css";

const Scheduler = () => {
  const [draging, setDraging] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [tasks, setTasks] = useState([
    { title: "Task 1", start: "00:00", duration: 1 },
    { title: "Task 2", start: "13:00", duration: 3 },
    { title: "Task 3", start: "20:00", duration: 3 },
  ]);

  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 0; i < 24; i++) {
      slots.push(`${i.toString().padStart(2, "0")}:00`);
      slots.push(`${i.toString().padStart(2, "0")}:30`);
    }
    return slots;
  };

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData("task", JSON.stringify(task));
    const { offsetX, offsetY } = e.nativeEvent;
    setClickPosition({ x: offsetX, y: offsetY });
    setDraging(true);
  };

  const handleDrop = (e, slotTime) => {
    e.preventDefault();
    const task = JSON.parse(e.dataTransfer.getData("task"));

    // Get the position where the drop happened
    // const dropY = e.clientY;
    const dropY = e.pageY;
    // const parentOffsetTop = e.target.getBoundingClientRect().top;
    const relativeY = dropY - clickPosition.y;
    console.log({ dropY, clickPosition: clickPosition.y });

    // Calculate the nearest time slot to the drop position
    const slotHeight = 50; // Assuming each slot is 50px tall
    const nearestSlotIndex = Math.round(relativeY / slotHeight);
    const nearestSlotTime = generateTimeSlots()[nearestSlotIndex];
    console.log({ nearestSlotIndex });

    console.log({ slotTime: slotTime.slice(-5) });

    const newStart = slotTime.padStart(5, "0").slice(-5);

    const updatedTasks = tasks.map((t) =>
      t.title === task.title ? { ...t, start: nearestSlotTime } : t
    );
    setTasks(updatedTasks);
    setDraging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="scheduler">
      {generateTimeSlots().map((time) => (
        <div
          key={time}
          className="time-slot"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, time)}
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
