import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils"; // Assuming you have a utility to concatenate class names

const ResizableBox: React.FC = () => {
  const [height, setHeight] = useState<number>(200); // Initial height
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [startY, setStartY] = useState<number>(0);
  const [initialHeight, setInitialHeight] = useState<number>(200);
  const [isLongPress, setIsLongPress] = useState<boolean>(false);
  const longPressTimeout = useRef<NodeJS.Timeout | null>(null);
  const snapStep = 20; // Height of each step in pixels

  console.log(startY);
  

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent | TouchEvent) => {
      if (!isLongPress) return;
      const clientY = (event as TouchEvent).touches
        ? (event as TouchEvent).touches[0].clientY
        : (event as MouseEvent).clientY;
      const deltaY = clientY - startY;

      // Calculate the new height
      const newHeight = initialHeight + deltaY;
      // Snap to the nearest step
      const snappedHeight = Math.round(newHeight / snapStep) * snapStep;
      setHeight(snappedHeight);
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
  }, [isResizing, startY, initialHeight, isLongPress, snapStep]);

  const handleMouseDown = (event: React.MouseEvent | React.TouchEvent) => {
    const clientY = (event as React.TouchEvent).touches
      ? (event as React.TouchEvent).touches[0].clientY
      : (event as React.MouseEvent).clientY;
    setIsResizing(true);
    setStartY(clientY);
    setInitialHeight(height);
    setIsLongPress(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleBoxTouchStart = (_event: React.TouchEvent) => {
    if (isLongPress) return;
    longPressTimeout.current = setTimeout(() => {
      setIsLongPress(true);
      // alert("Working");
    }, 1000); // 500ms for a long press
  };

  const handleBoxTouchEnd = () => {
    // if (longPressTimeout.current) clearTimeout(longPressTimeout.current);
    // setIsLongPress(false);
  };

  // Generate horizontal lines based on snapStep
  const lines = [];
  for (let i = snapStep; i < 500; i += snapStep) {
    lines.push(
      <div
        key={i}
        className="absolute left-0 w-full border-t border-gray-300"
        style={{ top: `${i}px` }}
      />
    );
  }

  return (
    <div
      className="relative w-32 h-[500px] bg-gray-200 border border-gray-400"
      onTouchStart={handleBoxTouchStart}
      onTouchEnd={handleBoxTouchEnd}
    >
      {lines}
      <div
        className={cn(
          "relative w-full bg-gray-200 border border-gray-400",
          isLongPress && "bg-blue-400"
        )}
        style={{ height: `${height}px` }}
        onMouseDown={handleMouseDown}
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
    </div>
  );
};

export default ResizableBox;
