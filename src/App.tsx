import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import NotFound from "@/components/NotFound";
import TodoListPage from "@/pages/todoListPage/TodoListPage";
import CalendarPage from "@/pages/calendarPage/CalendarPage";
import HabitTrackPage from "@/pages/habitTrackPage/HabitTrackPage";
import SettingsPage from "@/pages/settingsPage/SettingsPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<TodoListPage />} />
      <Route path="calendar-page" element={<CalendarPage />} />
      <Route path="habit-track-page" element={<HabitTrackPage />} />
      <Route path="settings-page" element={<SettingsPage />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
