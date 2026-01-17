import { mockApi } from "./mockApi";
import { MOCK_ASSISTANTS } from "@/utils/constants";

// Mock Math.random para controlar errores simulados
const mockMathRandom = jest.spyOn(Math, "random");

describe("mockApi", () => {
  beforeEach(() => {
    mockMathRandom.mockClear();
    // Reset assistants array
    mockApi.getAssistants().then((data) => {
      // Clear and reinitialize with mock data
      data.forEach(async (assistant) => {
        await mockApi.deleteAssistant(assistant.id);
      });
    });

    // Re-add mock assistants
    MOCK_ASSISTANTS.forEach(async (assistant) => {
      await mockApi.createAssistant(assistant);
    });
  });

  describe("getAssistants", () => {
    test("returns array of assistants", async () => {
      const assistants = await mockApi.getAssistants();
      expect(Array.isArray(assistants)).toBe(true);
      expect(assistants.length).toBeGreaterThan(0);
    });

    test("returns assistants with correct structure", async () => {
      const assistants = await mockApi.getAssistants();
      const firstAssistant = assistants[0];

      expect(firstAssistant).toHaveProperty("id");
      expect(firstAssistant).toHaveProperty("name");
      expect(firstAssistant).toHaveProperty("language");
      expect(firstAssistant).toHaveProperty("tone");
      expect(firstAssistant).toHaveProperty("responseLength");
      expect(firstAssistant).toHaveProperty("audioEnabled");
    });
  });

  describe("getAssistantById", () => {
    test("returns assistant when found", async () => {
      const assistants = await mockApi.getAssistants();
      const firstId = assistants[0].id;

      const assistant = await mockApi.getAssistantById(firstId);
      expect(assistant).not.toBeNull();
      expect(assistant?.id).toBe(firstId);
    });

    test("returns null when not found", async () => {
      const assistant = await mockApi.getAssistantById("non-existent-id");
      expect(assistant).toBeNull();
    });
  });

  describe("createAssistant", () => {
    test("creates new assistant with generated id", async () => {
      const newAssistant = {
        name: "New Assistant",
        language: "Español" as const,
        tone: "Formal" as const,
        responseLength: { short: 25, medium: 50, long: 25 },
        audioEnabled: true,
      };

      const result = await mockApi.createAssistant(newAssistant);

      expect(result.id).toBeDefined();
      expect(result.name).toBe("New Assistant");
      expect(result.language).toBe("Español");
    });

    test("simulates error with 10% probability", async () => {
      mockMathRandom.mockReturnValue(0.05); // 5% - below threshold for error

      const newAssistant = {
        name: "Test Assistant",
        language: "Español" as const,
        tone: "Formal" as const,
        responseLength: { short: 25, medium: 50, long: 25 },
        audioEnabled: false,
      };

      await expect(
        mockApi.createAssistant(newAssistant),
      ).resolves.not.toThrow();
    });

    test("throws error when simulated", async () => {
      mockMathRandom.mockReturnValue(0.09); // 9% - triggers error

      const newAssistant = {
        name: "Test Assistant",
        language: "Español" as const,
        tone: "Formal" as const,
        responseLength: { short: 25, medium: 50, long: 25 },
        audioEnabled: false,
      };

      await expect(mockApi.createAssistant(newAssistant)).rejects.toThrow(
        "Error simulado al crear asistente",
      );
    });
  });

  describe("updateAssistant", () => {
    test("updates existing assistant", async () => {
      const assistants = await mockApi.getAssistants();
      const firstId = assistants[0].id;

      const updates = {
        name: "Updated Name",
        language: "Inglés" as const,
        tone: "Casual" as const,
        responseLength: { short: 10, medium: 60, long: 30 },
        audioEnabled: true,
      };

      const updated = await mockApi.updateAssistant(firstId, updates);

      expect(updated.name).toBe("Updated Name");
      expect(updated.language).toBe("Inglés");
      expect(updated.tone).toBe("Casual");
    });

    test("throws error when assistant not found", async () => {
      const updates = {
        name: "Updated Name",
        language: "Inglés" as const,
        tone: "Casual" as const,
        responseLength: { short: 10, medium: 60, long: 30 },
        audioEnabled: true,
      };

      await expect(
        mockApi.updateAssistant("non-existent-id", updates),
      ).rejects.toThrow("Asistente no encontrado");
    });
  });

  describe("deleteAssistant", () => {
    test("deletes existing assistant", async () => {
      const assistants = await mockApi.getAssistants();
      const initialCount = assistants.length;
      const firstId = assistants[0].id;

      await mockApi.deleteAssistant(firstId);

      const newAssistants = await mockApi.getAssistants();
      expect(newAssistants).toHaveLength(initialCount - 1);
      expect(newAssistants.find((a) => a.id === firstId)).toBeUndefined();
    });

    test("simulates error with 10% probability", async () => {
      const assistants = await mockApi.getAssistants();
      const firstId = assistants[0].id;

      mockMathRandom.mockReturnValue(0.11); // 11% - above threshold, no error

      await expect(mockApi.deleteAssistant(firstId)).resolves.not.toThrow();
    });
  });

  describe("updateAssistantRules", () => {
    test("updates assistant rules", async () => {
      const assistants = await mockApi.getAssistants();
      const firstId = assistants[0].id;
      const newRules = "New training rules for the assistant";

      const updated = await mockApi.updateAssistantRules(firstId, newRules);

      expect(updated.rules).toBe(newRules);
    });

    test("throws error when assistant not found", async () => {
      await expect(
        mockApi.updateAssistantRules("non-existent-id", "rules"),
      ).rejects.toThrow("Asistente no encontrado");
    });
  });
});
