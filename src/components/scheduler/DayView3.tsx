import { cn } from "@/lib/utils";

const DayView3 = () => {
  const hours: string[] = [
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00", /////
    "19:00",
    "20:30",
    "21:00",
    "22:30",
    "23:00",
    "24:30",
    "25:00",
    "26:30",
    "27:00",
  ]; // Define working hours with 30-minute intervals

  return (
    <div className="flex flex-col w-screen bg-gray-100">
      {/* <header className="flex justify-between p-2 bg-white">
        <button className="text-blue-500 hover:text-blue-700">Previous</button>
        <span className="text-xl">{new Date().toLocaleDateString()}</span>
        <button className="text-blue-500 hover:text-blue-700">Next</button>
      </header> */}

      {/* ---------------------------------------------------------------------------- */}
      <div className="flex flex-row mb-[50px]">
        <div className="flex flex-col ">
          {/* {hours.map((hour) => (
            <div
              key={hour}
              className="flex border-b border-gray-300"
              style={{ height: "30px" }}
              onDoubleClick={() => alert("Clicked")}
            >
              <div
                className="text-center border-r border-gray-300"
                style={{ width: "60px" }}
              >
                {hour}
              </div>
              <div className="px-5">Hello</div>
            </div>
          ))} */}
        </div>

        <div
          className={cn(
            `absolute w-screen pointer-events-none h-[${hours.length * 30}px]`
          )}
          // style={{ height: `${hours.length * 30}px` }}
        >
          <div className="absolute w-full h-full bg-blue-400/50 ml-[60px]"></div>
        </div>
      </div>
    </div>
  );
};
export default DayView3;
