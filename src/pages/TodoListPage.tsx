import CompletedTodos from "../components/CompletedTodos";
import PendingTodos from "../components/PendingTodos";

import { FaCirclePlus } from "react-icons/fa6";

function TodoListPage() {
  return (
    <div className="w-screen h-screen flex flex-col gap-10 p-3 ">
      <PendingTodos />
      <CompletedTodos />
      <FaCirclePlus className="absolute bottom-20 right-7 text-green-700 text-6xl" />
    </div>
  );
}
export default TodoListPage;
