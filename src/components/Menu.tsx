import { useState, useRef, useEffect } from "react";
import { MenuPropsType } from "../types";

function Menu({ items, menuBtn, styles }: MenuPropsType) {
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
        className={`${
          open ? "block" : "hidden"
        } border-2 rounded-lg px-4 py-2 flex flex-col gap-2 fixed bg-white ${
          styles ?? ""
        }`}
      >
        {items.map((item, index) => (
          <li key={index}>
            <button
              className="flex gap-3"
              onClick={item.onClick}
              // aria-label={item.label}
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
