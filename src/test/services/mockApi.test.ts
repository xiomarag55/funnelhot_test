import { mockApi } from "@/services/mockApi";
import { MOCK_ASSISTANTS } from "@/utils/constants";

// Mock global Math.random para controlar errores simulados
const originalMathRandom = Math.random;

describe("mockApi", () => {
  beforeEach(() => {
    Math.random = jest.fn(() => 0.5);
  });

  afterEach(() => {
    // Restaurar Math.random original
    Math.random = originalMathRandom;
  });

  afterAll(() => {
    Math.random = originalMathRandom;
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
      // Configurar Math.random para que no falle
      Math.random = jest.fn(() => 0.5);

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
      // Configurar Math.random para que falle (valor < 0.1)
      Math.random = jest.fn(() => 0.05);

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
      // Primero crear un asistente
      Math.random = jest.fn(() => 0.5);

      const newAssistant = {
        name: "Test Assistant",
        language: "Español" as const,
        tone: "Formal" as const,
        responseLength: { short: 25, medium: 50, long: 25 },
        audioEnabled: false,
      };

      const created = await mockApi.createAssistant(newAssistant);

      // Ahora actualizarlo
      Math.random = jest.fn(() => 0.5); // Asegurar que no falle

      const updates = {
        name: "Updated Name",
        language: "Inglés" as const,
        tone: "Casual" as const,
        responseLength: { short: 10, medium: 60, long: 30 },
        audioEnabled: true,
      };

      const updated = await mockApi.updateAssistant(created.id, updates);

      expect(updated.name).toBe("Updated Name");
      expect(updated.language).toBe("Inglés");
      expect(updated.tone).toBe("Casual");
    });

    test("throws error when assistant not found", async () => {
      Math.random = jest.fn(() => 0.5); // Asegurar que no falle por random

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

    test("simulates error with 10% probability", async () => {
      // Crear asistente primero
      Math.random = jest.fn(() => 0.5);

      const newAssistant = {
        name: "Test Assistant",
        language: "Español" as const,
        tone: "Formal" as const,
        responseLength: { short: 25, medium: 50, long: 25 },
        audioEnabled: false,
      };

      const created = await mockApi.createAssistant(newAssistant);

      // Configurar para que falle
      Math.random = jest.fn(() => 0.05);

      const updates = {
        name: "Updated Name",
        language: "Inglés" as const,
        tone: "Casual" as const,
        responseLength: { short: 10, medium: 60, long: 30 },
        audioEnabled: true,
      };

      await expect(
        mockApi.updateAssistant(created.id, updates),
      ).rejects.toThrow("Error simulado al actualizar asistente");
    });
  });

  describe("deleteAssistant", () => {
    test("deletes existing assistant", async () => {
      // Crear asistente primero
      Math.random = jest.fn(() => 0.5);

      const newAssistant = {
        name: "Test Assistant",
        language: "Español" as const,
        tone: "Formal" as const,
        responseLength: { short: 25, medium: 50, long: 25 },
        audioEnabled: false,
      };

      const created = await mockApi.createAssistant(newAssistant);

      const initialAssistants = await mockApi.getAssistants();
      const initialCount = initialAssistants.length;

      // Asegurar que no falle
      Math.random = jest.fn(() => 0.5);

      await mockApi.deleteAssistant(created.id);

      const newAssistants = await mockApi.getAssistants();
      expect(newAssistants.length).toBe(initialCount - 1);
      expect(newAssistants.find((a) => a.id === created.id)).toBeUndefined();
    });

    test("simulates error with 10% probability", async () => {
      // Crear asistente primero
      Math.random = jest.fn(() => 0.5);

      const newAssistant = {
        name: "Test Assistant",
        language: "Español" as const,
        tone: "Formal" as const,
        responseLength: { short: 25, medium: 50, long: 25 },
        audioEnabled: false,
      };

      const created = await mockApi.createAssistant(newAssistant);

      // Configurar para que falle
      Math.random = jest.fn(() => 0.05);

      await expect(mockApi.deleteAssistant(created.id)).rejects.toThrow(
        "Error simulado al eliminar asistente",
      );
    });
  });

  describe("updateAssistantRules", () => {
    test("updates assistant rules", async () => {
      // Crear asistente primero
      Math.random = jest.fn(() => 0.5);

      const newAssistant = {
        name: "Test Assistant",
        language: "Español" as const,
        tone: "Formal" as const,
        responseLength: { short: 25, medium: 50, long: 25 },
        audioEnabled: false,
      };

      const created = await mockApi.createAssistant(newAssistant);
      const newRules = "New training rules for the assistant";

      const updated = await mockApi.updateAssistantRules(created.id, newRules);

      expect(updated.rules).toBe(newRules);
    });

    test("throws error when assistant not found", async () => {
      Math.random = jest.fn(() => 0.5);

      await expect(
        mockApi.updateAssistantRules("non-existent-id", "rules"),
      ).rejects.toThrow("Asistente no encontrado");
    });
  });
});
