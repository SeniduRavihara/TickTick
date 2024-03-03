import React, { useEffect, useRef } from "react";

interface SidebarProps {
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  openSidebar: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ openSidebar, setOpenSidebar }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    console.log(openSidebar);   //remove
    
    setOpenSidebar((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        toggleSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

  return (
    <div className="fixed inset-0 z-10 overflow-hidden">
      <div
        className="absolute inset-0 bg-gray-800 opacity-50"
        onClick={toggleSidebar}
      ></div>
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-screen w-10/12 bg-gray-700 `}
      >
        <div className="p-4">Sidebar</div>
      </div>
    </div>
  );
};

export default Sidebar;
