import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import TaskListPage from "../pages/TaskListPage";
import { TaskServiceProvider } from "../context/TaskServiceContext";

it("le bouton ajouter fonctionne", async () => {
  render(
    <TaskServiceProvider>
      <MemoryRouter>
        <TaskListPage />
      </MemoryRouter>
    </TaskServiceProvider>
  );
  const addButton = screen.getByText(/Ajouter/i);
  expect(addButton).toBeInTheDocument();
  await userEvent.click(addButton);
});
