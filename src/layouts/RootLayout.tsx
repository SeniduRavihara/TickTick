import { Outlet } from "react-router-dom";
import Touchbar from "../components/Touchbar";

function RootLayout() {
  return (
    <div className="bg-gray-200">
        <Outlet />
        <Touchbar />
    </div>
  );
}
export default RootLayout;
