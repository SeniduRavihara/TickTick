import { Outlet } from "react-router-dom";
import Touchbar from "../components/Touchbar";

function RootLayout() {
  return (
    <div className="w-screen h-screen bg-gray-200">
        <Outlet />
        <Touchbar />
    </div>
  );
}
export default RootLayout;
