import { Outlet } from "react-router-dom";
import Touchbar from "../components/Touchbar";

function RootLayout() {
  return (
    <div className="bg-[#ffffff] overflow-x-hidden">
      <Outlet />
      <Touchbar />
    </div>
  );
}
export default RootLayout;
