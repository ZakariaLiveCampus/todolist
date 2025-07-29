import React, { createContext, useContext } from "react";
import { TaskService } from "../services/TaskService";

const TaskServiceContext = createContext();

export const TaskServiceProvider = ({ children }) => {
  const service = new TaskService(
    import.meta.env.VITE_API_URL || "http://localhost:3000"
  );
  return (
    <TaskServiceContext.Provider value={service}>
      {children}
    </TaskServiceContext.Provider>
  );
};

export const useTaskService = () => useContext(TaskServiceContext);
