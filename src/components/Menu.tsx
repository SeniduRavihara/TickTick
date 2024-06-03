import  { useState, useRef, useEffect } from "react";
import { MenuPropsType } from "../types"; // Adjust the import path as necessary
import { cn } from "@/lib/utils"; // Adjust the import path as necessary

function Menu({ items, menuBtn, styles, setSelected }: MenuPropsType) {
  const [open, setOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSetSelected = (label: string) => {
    if (setSelected) {
      setSelected(label);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        className=""
        onClick={toggleMenu}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {menuBtn}
      </button>

      <ul
        className={cn(
          "border-2 rounded-lg px-4 py-2 flex flex-col space-y-3 fixed bg-white",
          open ? "block" : "hidden",
          styles
        )}
      >
        {items.map((item, index) => (
          <li key={index}>
            <button
              className="flex gap-3 justify-center items-center"
              onClick={() => {
                item.onClick();
                handleSetSelected(item.label);
              }}
            >
              <div>{item.icon}</div>
              <div>{item.label}</div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
