import { Outlet } from "react-router-dom";
import Touchbar from "../components/Touchbar";

function RootLayout() {
  return (
    <div className="w-screen flex flex-col h-screen bg-gray-200">
      <div className="">
        <Outlet />
      </div>

      <div className="">
        <Touchbar />
      </div>
    </div>
  );
}
export default RootLayout;
