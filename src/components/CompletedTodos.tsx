import { Box, Collapse, } from "@chakra-ui/react";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TiAttachment } from "react-icons/ti";
import Sheet from "react-modal-sheet";
import { TodoObj } from "../context/DataContext";

function CompletedTodos({
  compleatedTodoList,
}: {
  compleatedTodoList: Array<TodoObj>;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenModalSheet, setOpenModalSheet] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<string>("");

  return (
    <div>
      <div
        className={`w-full bg-white/50 shadow-sm rounded-lg flex flex-col p-3`}
      >
        <div
          className="flex justify-between items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h1 className="text-gray-600 font-bold">COMPLEATED</h1>
          <div>{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
        </div>

        <Collapse in={isOpen} animateOpacity>
          <Box
            p="20px"
            color="gray.500"
            mt="0"
            bg="#F2F3F5"
            rounded="md"
            shadow="md"
          >
            <ul
              className={`text-blue-900 flex flex-col divide-y divide-slate-900/10`}
            >
              {compleatedTodoList.map((todoObj) => (
                <li
                  key={todoObj.id}
                  className="flex justify-between items-center"
                  onClick={() => {
                    setSelectedTodo(todoObj.todo);
                    setOpenModalSheet(true);
                  }}
                >
                  <h1 className="text-xl text-gray-700">{todoObj.todo}</h1>
                  <TiAttachment className="cursor-pointer" />
                </li>
              ))}
            </ul>
          </Box>
        </Collapse>
      </div>

      <Sheet
        isOpen={isOpenModalSheet}
        detent="content-height"
        onClose={() => setOpenModalSheet(false)}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <div className="w-full py-10 h-[300px]">
              <h1 className="text-black">{selectedTodo}</h1>
              <input
                className="bg-gray-700 w-full"
                placeholder="add"
                type="text"
              />
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </div>
  );
}
export default CompletedTodos;
