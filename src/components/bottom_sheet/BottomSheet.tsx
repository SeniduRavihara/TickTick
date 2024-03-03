import React, { useState, useRef, useEffect } from "react";
import "./BottomSheet.css"; // Import or define your styles

type BottomSheetProps = {
  children: React.ReactNode;
  height: number;
  isOpenBottomSheet: boolean;
  setIsOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
  dragIconUp?: React.ReactNode;
  dragIconDown?: React.ReactNode;
};

const BottomSheet: React.FC<BottomSheetProps> = ({
  children,
  // height,
  isOpenBottomSheet,
  setIsOpenBottomSheet,
  // dragIconUp,
  // dragIconDown,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  // const [isDraggingUp, setIsDraggingUp] = useState(false);
  const [startY, setStartY] = useState<number | null>(null);
  const [startHeight, setStartHeight] = useState<number | null>(null);

  const bottomSheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpenBottomSheet) {
      if (overlayRef.current) {
        overlayRef.current.classList.toggle("show");
        showSheet();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenBottomSheet]);

  // ----------------------------------------------
  // ----------------------------------------------

  const updateHeight = (height: number) => {
    if (contentRef.current) {
      contentRef.current.style.height = `${height}vh`;
    }
  };

  const showSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.classList.add("show");
      updateHeight(50);
      document.body.style.overflow = "hidden";
    }
  };

  const hideSheet = () => {
    if (bottomSheetRef.current && overlayRef.current) {
      bottomSheetRef.current.classList.remove("show");
      overlayRef.current.classList.remove("show");
      document.body.style.overflow = "auto";
      setIsOpenBottomSheet(false);
    }
  };

  // -----------------------------------------------------------------------

  const dragStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    setIsDragging(true);
    if (bottomSheetRef.current) {
      bottomSheetRef.current.classList.add("dragging");
    }
    const pageY = "touches" in e ? e.touches[0].pageY : e.pageY;
    setStartY(pageY);
    setStartHeight(parseInt(contentRef.current!.style.height) || null);
  };

  const dragging = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (!isDragging || startY === null || startHeight === null) return;
    const deltaY = startY - ("touches" in e ? e.touches[0].pageY : e.pageY);
    // setIsDraggingUp(deltaY > 0);

    const newHeight = startHeight + (deltaY / window.innerHeight) * 100;
    updateHeight(newHeight);
  };

  const dragStop = () => {
    setIsDragging(false);
    // setIsDraggingUp(false)
    if (bottomSheetRef.current) {
      bottomSheetRef.current.classList.remove("dragging");
    }
    const sheetHeight = parseInt(contentRef.current!.style.height);
    if (sheetHeight < 40) {
      hideSheet();
    } else if (sheetHeight > 75) {
      updateHeight(100);
    } else {
      updateHeight(50);
    }
  };

  // const handleClick = () => {
  //   if (overlayRef.current) {
  //     overlayRef.current.classList.toggle("show");
  //     showSheet();
  //   }
  // };

  return (
    <>
      <div
        ref={overlayRef}
        className="overlay"
        onClick={() => hideSheet()}
      ></div>
      <div ref={bottomSheetRef} className="bottom-sheet">
        <div
          ref={contentRef}
          className="content"
          onMouseDown={(e) => dragStart(e as React.MouseEvent<HTMLDivElement>)}
          onMouseMove={(e) => dragging(e as React.MouseEvent<HTMLDivElement>)}
          onMouseUp={dragStop}
          onTouchStart={(e) => dragStart(e as React.TouchEvent<HTMLDivElement>)}
          onTouchMove={(e) => dragging(e as React.TouchEvent<HTMLDivElement>)}
          onTouchEnd={dragStop}
        >
          {/* <div className="drag-icon">
            {isDraggingUp
              ? dragIconUp && dragIconUp
              : dragIconDown && dragIconDown}
          </div> */}
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};

export default BottomSheet;
