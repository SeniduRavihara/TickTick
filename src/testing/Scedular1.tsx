import { Scheduler, SchedulerData } from "@bitnoi.se/react-scheduler";
import { useState } from "react";

function Component() {
  const [filterButtonState, setFilterButtonState] = useState(0);

  return (
    <section className="w-full h-screen">
        sdfsdf
      <Scheduler
        data={mockedSchedulerData}
        isLoading={false}
        onRangeChange={(newRange) => console.log(newRange)}
        onTileClick={(clickedResource) => console.log(clickedResource)}
        onItemClick={(item) => console.log(item)}
        onFilterData={() => {
          // Some filtering logic...
          setFilterButtonState(1);
        }}
        onClearFilterData={() => {
          // Some clearing filters logic...
          setFilterButtonState(0);
        }}
        config={{
          zoom: 0,
          filterButtonState,
        }}
      />
    </section>
  );
}

const mockedSchedulerData: SchedulerData = [
  {
    id: "070ac5b5-8369-4cd2-8ba2-0a209130cc60",
    label: {
      icon: "https://picsum.photos/24",
      title: "Joe Doe",
      subtitle: "Frontend Developer",
    },
    data: [
      {
        id: "8b71a8a5-33dd-4fc8-9caa-b4a584ba3762",
        startDate: new Date("2023-04-13T15:31:24.272Z"),
        endDate: new Date("2023-08-28T10:28:22.649Z"),
        occupancy: 3600,
        title: "Project A",
        subtitle: "Subtitle A",
        description: "array indexing Salad West Account",
        bgColor: "rgb(254,165,177)",
      },
      {
        id: "22fbe237-6344-4c8e-affb-64a1750f33bd",
        startDate: new Date("2023-10-07T08:16:31.123Z"),
        endDate: new Date("2023-11-15T21:55:23.582Z"),
        occupancy: 2852,
        title: "Project B",
        subtitle: "Subtitle B",
        description: "Tuna Home pascal IP drive",
        bgColor: "rgb(254,165,177)",
      },
      {
        id: "3601c1cd-f4b5-46bc-8564-8c983919e3f5",
        startDate: new Date("2023-03-30T22:25:14.377Z"),
        endDate: new Date("2023-09-01T07:20:50.526Z"),
        occupancy: 1800,
        title: "Project C",
        subtitle: "Subtitle C",
        bgColor: "rgb(254,165,177)",
      },
      {
        id: "b088e4ac-9911-426f-aef3-843d75e714c2",
        startDate: new Date("2023-10-28T10:08:22.986Z"),
        endDate: new Date("2023-10-30T12:30:30.150Z"),
        occupancy: 11111,
        title: "Project D",
        subtitle: "Subtitle D",
        description: "Garden heavy an software Metal",
        bgColor: "rgb(254,165,177)",
      },
    ],
  },
];

export default Component;
