import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import TaskEditPage from "../pages/TaskEditPage";
import { TaskServiceProvider } from "../context/TaskServiceContext";

it("le bouton annuler fonctionne", async () => {
  render(
    <TaskServiceProvider>
      <MemoryRouter>
        <TaskEditPage />
      </MemoryRouter>
    </TaskServiceProvider>
  );
  const cancelButton = screen.getByText(/Annuler/i);
  expect(cancelButton).toBeInTheDocument();
  await userEvent.click(cancelButton);
});
