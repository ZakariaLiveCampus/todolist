import { TaskServiceProvider } from "./context/TaskServiceContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskListPage from "./pages/TaskListPage";
import TaskEditPage from "./pages/TaskEditPage";
import "./App.css";

function App() {
  return (
    <TaskServiceProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TaskListPage />} />
          <Route path="/edit/:id" element={<TaskEditPage />} />
          <Route path="/add" element={<TaskEditPage />} />
        </Routes>
      </BrowserRouter>
    </TaskServiceProvider>
  );
}

export default App;
