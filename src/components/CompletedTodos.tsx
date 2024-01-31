import { Box, Collapse, useDisclosure } from "@chakra-ui/react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function CompletedTodos() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <div>
      <div
        className={`w-full bg-white shadow-lg rounded-lg flex flex-col p-3`}
      >
        <div className="flex justify-between items-center" onClick={onToggle}>
          <h1 className="text-gray-600 font-bold">COMPLEATED</h1>
          <div>{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
        </div>

        <ul
          className={`text-blue-900 `}
        >
          <Collapse in={isOpen} animateOpacity>
            <Box
              p="20px"
              color="gray.500"
              mt="0"
              bg="white"
              rounded="md"
              shadow="md"
            >
              <li>Eat</li>
              <li>Drink</li>
              <li>Sleep</li>
              <li>Walk</li>
            </Box>
          </Collapse>
        </ul>
      </div>
    </div>
  );
}
export default CompletedTodos;
