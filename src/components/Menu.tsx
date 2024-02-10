import { useState } from "react";

type menuProps = {
  items: Array<{ label: string; icon: React.ReactNode; onClick: () => void }>;
  menuBtn: React.ReactNode;
};

function Menu({ items, menuBtn }: menuProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      <button className="" onClick={() => setOpen(!open)}>
        {menuBtn}
      </button>

      <ul
        className={`${
          open ? "block" : "hidden"
        } border-2 rounded-lg px-4 py-2 flex flex-col gap-2 fixed -top-8 bg-white`}
      >
        {items.map((item, index) => (
          <li key={index} className="flex gap-3" onClick={item.onClick}>
            <div>{item.icon}</div>
            <div>{item.label}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Menu;
