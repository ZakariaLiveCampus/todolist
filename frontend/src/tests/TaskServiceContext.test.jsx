import { TaskService } from "../services/TaskService";

describe("TaskService", () => {
  const apiUrl = "http://localhost:3000";
  const service = new TaskService(apiUrl);

  it("getTasks appelle le bon endpoint", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve([]) })
    );
    await service.getTasks();
    expect(global.fetch).toHaveBeenCalledWith(`${apiUrl}/tasks`);
  });

  it("addTask appelle le bon endpoint", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({}) })
    );
    await service.addTask({ title: "Test", description: "Desc" });
    expect(global.fetch).toHaveBeenCalledWith(
      `${apiUrl}/tasks`,
      expect.objectContaining({ method: "POST" })
    );
  });

  it("updateTask appelle le bon endpoint", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({}) })
    );
    await service.updateTask(1, { title: "Test", description: "Desc" });
    expect(global.fetch).toHaveBeenCalledWith(
      `${apiUrl}/tasks/1`,
      expect.objectContaining({ method: "PUT" })
    );
  });

  it("deleteTask appelle le bon endpoint", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({}) })
    );
    await service.deleteTask(1);
    expect(global.fetch).toHaveBeenCalledWith(
      `${apiUrl}/tasks/1`,
      expect.objectContaining({ method: "DELETE" })
    );
  });

  it("getTasks gère les erreurs API", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({ ok: false, text: () => Promise.resolve("Erreur") })
    );
    await expect(service.getTasks()).rejects.toThrow();
  });

  it("addTask gère les erreurs API", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({ ok: false, text: () => Promise.resolve("Erreur add") })
    );
    await expect(
      service.addTask({ title: "Test", description: "Desc" })
    ).rejects.toThrow();
  });

  it("updateTask gère les erreurs API", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        text: () => Promise.resolve("Erreur update"),
      })
    );
    await expect(
      service.updateTask(1, { title: "Test", description: "Desc" })
    ).rejects.toThrow();
  });

  it("deleteTask gère les erreurs API", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        text: () => Promise.resolve("Erreur delete"),
      })
    );
    await expect(service.deleteTask(1)).rejects.toThrow();
  });
});
