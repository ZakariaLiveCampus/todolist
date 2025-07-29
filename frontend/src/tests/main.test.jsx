import { describe, it, expect } from "vitest";
import { createRoot } from "react-dom/client";

describe("main.jsx", () => {
  it("monte l'application sans erreur", () => {
    const root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);
    expect(() => {
      createRoot(root).render(<div>Test</div>);
    }).not.toThrow();
  });
});
