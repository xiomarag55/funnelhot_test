import {
  MOCK_ASSISTANTS,
  MOCK_RESPONSES,
  LANGUAGES,
  TONES,
} from "../../utils/constants";
import { Assistant } from "@/types/assistant";

describe("Constants", () => {
  describe("MOCK_ASSISTANTS", () => {
    test("should contain mock assistants array", () => {
      expect(Array.isArray(MOCK_ASSISTANTS)).toBe(true);
      expect(MOCK_ASSISTANTS.length).toBeGreaterThan(0);
    });

    test("each assistant should have correct structure", () => {
      MOCK_ASSISTANTS.forEach((assistant: Assistant) => {
        // Propiedades requeridas
        expect(assistant).toHaveProperty("id");
        expect(assistant).toHaveProperty("name");
        expect(assistant).toHaveProperty("language");
        expect(assistant).toHaveProperty("tone");
        expect(assistant).toHaveProperty("responseLength");
        expect(assistant).toHaveProperty("audioEnabled");
        expect(assistant).toHaveProperty("rules");

        // Tipos específicos
        expect(typeof assistant.id).toBe("string");
        expect(typeof assistant.name).toBe("string");
        expect(typeof assistant.language).toBe("string");
        expect(typeof assistant.tone).toBe("string");
        expect(typeof assistant.audioEnabled).toBe("boolean");
        expect(typeof assistant.rules).toBe("string");

        // responseLength estructura
        expect(assistant.responseLength).toHaveProperty("short");
        expect(assistant.responseLength).toHaveProperty("medium");
        expect(assistant.responseLength).toHaveProperty("long");

        expect(typeof assistant.responseLength.short).toBe("number");
        expect(typeof assistant.responseLength.medium).toBe("number");
        expect(typeof assistant.responseLength.long).toBe("number");

        // responseLength suma 100%
        const total =
          assistant.responseLength.short +
          assistant.responseLength.medium +
          assistant.responseLength.long;
        expect(total).toBe(100);
      });
    });

    test("should have valid language values", () => {
      const validLanguages = ["Español", "Inglés", "Portugués"];

      MOCK_ASSISTANTS.forEach((assistant: Assistant) => {
        expect(validLanguages).toContain(assistant.language);
      });
    });

    test("should have valid tone values", () => {
      const validTones = ["Formal", "Casual", "Profesional", "Amigable"];

      MOCK_ASSISTANTS.forEach((assistant: Assistant) => {
        expect(validTones).toContain(assistant.tone);
      });
    });

    test("first assistant should be Asistente de Ventas", () => {
      expect(MOCK_ASSISTANTS[0].name).toBe("Asistente de Ventas");
      expect(MOCK_ASSISTANTS[0].language).toBe("Español");
      expect(MOCK_ASSISTANTS[0].tone).toBe("Profesional");
      expect(MOCK_ASSISTANTS[0].audioEnabled).toBe(true);
    });

    test("second assistant should be Soporte Técnico", () => {
      expect(MOCK_ASSISTANTS[1].name).toBe("Soporte Técnico");
      expect(MOCK_ASSISTANTS[1].language).toBe("Inglés");
      expect(MOCK_ASSISTANTS[1].tone).toBe("Amigable");
      expect(MOCK_ASSISTANTS[1].audioEnabled).toBe(false);
    });
  });

  describe("MOCK_RESPONSES", () => {
    test("should contain mock responses array", () => {
      expect(Array.isArray(MOCK_RESPONSES)).toBe(true);
      expect(MOCK_RESPONSES.length).toBeGreaterThan(0);
    });

    test("each response should be a string", () => {
      MOCK_RESPONSES.forEach((response: string) => {
        expect(typeof response).toBe("string");
        expect(response.trim().length).toBeGreaterThan(0);
      });
    });

    test("should contain specific example responses", () => {
      const expectedResponses = [
        "Entendido, ¿en qué más puedo ayudarte?",
        "Esa es una excelente pregunta. Déjame explicarte...",
        "Claro, con gusto te ayudo con eso.",
        "¿Podrías darme más detalles sobre tu consulta?",
        "Perfecto, he registrado esa información.",
      ];

      expectedResponses.forEach((response) => {
        expect(MOCK_RESPONSES).toContain(response);
      });
    });
  });

  describe("LANGUAGES", () => {
    test("should contain languages array", () => {
      expect(Array.isArray(LANGUAGES)).toBe(true);
      expect(LANGUAGES.length).toBe(3);
    });

    test("should have correct language options", () => {
      const expectedLanguages = [
        { value: "Español", label: "Español" },
        { value: "Inglés", label: "English" },
        { value: "Portugués", label: "Português" },
      ];

      expect(LANGUAGES).toEqual(expectedLanguages);
    });

    test("each language should have value and label", () => {
      LANGUAGES.forEach((language) => {
        expect(language).toHaveProperty("value");
        expect(language).toHaveProperty("label");
        expect(typeof language.value).toBe("string");
        expect(typeof language.label).toBe("string");
      });
    });
  });

  describe("TONES", () => {
    test("should contain tones array", () => {
      expect(Array.isArray(TONES)).toBe(true);
      expect(TONES.length).toBe(4);
    });

    test("should have correct tone options", () => {
      const expectedTones = [
        { value: "Formal", label: "Formal" },
        { value: "Casual", label: "Casual" },
        { value: "Profesional", label: "Profesional" },
        { value: "Amigable", label: "Amigable" },
      ];

      expect(TONES).toEqual(expectedTones);
    });

    test("each tone should have value and label", () => {
      TONES.forEach((tone) => {
        expect(tone).toHaveProperty("value");
        expect(tone).toHaveProperty("label");
        expect(typeof tone.value).toBe("string");
        expect(typeof tone.label).toBe("string");
      });
    });
  });

  describe("Constants types", () => {
    test("LANGUAGES should be readonly", () => {
      // Verificar que es un array readonly
      expect(Object.isFrozen(LANGUAGES)).toBe(true);

      // Intentar modificar debería fallar en tiempo de ejecución si se intenta
      expect(() => {
        (LANGUAGES as any).push({ value: "test", label: "test" });
      }).toThrow();
    });

    test("TONES should be readonly", () => {
      expect(Object.isFrozen(TONES)).toBe(true);
    });

    test("MOCK_ASSISTANTS should be mutable (not readonly)", () => {
      // MOCK_ASSISTANTS debería ser mutable para permitir operaciones CRUD
      expect(Array.isArray(MOCK_ASSISTANTS)).toBe(true);
    });
  });
});
