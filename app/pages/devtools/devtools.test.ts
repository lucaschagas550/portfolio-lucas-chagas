import { describe, expect, it } from "vitest";

import { loader } from "~/pages/devtools/devtools";

describe("com.chrome.devtools.json", () => {
  it("responde 404 sem corpo, sem passar pelo erro de rota inexistente", async () => {
    const response = loader();

    expect(response.status).toBe(404);
    expect(await response.text()).toBe("");
  });
});
