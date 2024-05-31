import { useState, useEffect } from "react";
import { cn } from "@/lib/utils"; // Assuming you have a utility to concatenate class names

const ResizableBox = () => {
  const [height, setHeight] = useState(200); // Initial height
  const [isResizing, setIsResizing] = useState(false);
  const [startY, setStartY] = useState(0);
  const [initialHeight, setInitialHeight] = useState(200);
  const [isLongPress, setIsLongPress] = useState(false);
  const [longPressTimeout, setLongPressTimeout] = useState(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!isLongPress) return;
      const clientY = event.touches ? event.touches[0].clientY : event.clientY;
      const deltaY = clientY - startY;
      setHeight(initialHeight + deltaY);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      //   setIsLongPress(false);
      //   clearTimeout(longPressTimeout);
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
  }, [isResizing, startY, initialHeight, isLongPress, longPressTimeout]);

  const handleMouseDown = (event) => {
    const clientY = event.touches ? event.touches[0].clientY : event.clientY;
    setIsResizing(true);
    setStartY(clientY);
    setInitialHeight(height);
    setIsLongPress(true);
  };

  const handleBoxTouchStart = (event) => {
    if (isLongPress) return;
    const timeout = setTimeout(() => {
      setIsLongPress(true);
      alert("Working");
    }, 500); // 500ms for a long press

    setLongPressTimeout(timeout);
  };

  const handleBoxTouchEnd = () => {
    // clearTimeout(longPressTimeout);
    // setIsLongPress(false);
  };

  return (
    <div
      className={cn(
        "relative w-32 bg-gray-200 border border-gray-400",
        isLongPress && "bg-blue-400"
      )}
      style={{ height: `${height}px` }}
      onTouchStart={handleBoxTouchStart}
      onTouchEnd={handleBoxTouchEnd}
      //   onMouseDown={handleMouseDown}
    >
      {/* Content */}
      {isLongPress && (
        <div
          className="absolute bottom-0 left-10 w-5 h-5 rounded-full bg-white cursor-ns-resize"
          onMouseDown={handleMouseDown}
          onTouchStart={(event) => {
            handleMouseDown(event);
            event.preventDefault();
          }}
        ></div>
      )}
    </div>
  );
};

export default ResizableBox;
