import { Assistant, AssistantFormData } from "@/types/assistant";
import { MOCK_ASSISTANTS } from "@/utils/constants";

// Helper para simular delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper para simular errores (10% de probabilidad)
const shouldFail = () => Math.random() < 0.1;

// Simulamos almacenamiento en memoria
let assistants: Assistant[] = [...MOCK_ASSISTANTS];

export const mockApi = {
  // Obtener todos los asistentes
  async getAssistants(): Promise<Assistant[]> {
    await delay(300); // Simular delay de red
    return [...assistants];
  },

  // Obtener un asistente por ID
  async getAssistantById(id: string): Promise<Assistant | null> {
    await delay(200);
    const assistant = assistants.find((a) => a.id === id);
    return assistant || null;
  },

  // Crear un nuevo asistente
  async createAssistant(data: AssistantFormData): Promise<Assistant> {
    await delay(400);

    if (shouldFail()) {
      throw new Error("Error simulado al crear asistente");
    }

    const newAssistant: Assistant = {
      ...data,
      id: Date.now().toString(),
      rules: "",
    };

    assistants.push(newAssistant);
    return newAssistant;
  },

  // Actualizar un asistente
  async updateAssistant(
    id: string,
    data: AssistantFormData
  ): Promise<Assistant> {
    await delay(400);

    if (shouldFail()) {
      throw new Error("Error simulado al actualizar asistente");
    }

    const index = assistants.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new Error("Asistente no encontrado");
    }

    assistants[index] = { ...assistants[index], ...data };
    return assistants[index];
  },

  // Eliminar un asistente
  async deleteAssistant(id: string): Promise<void> {
    await delay(300);

    if (shouldFail()) {
      throw new Error("Error simulado al eliminar asistente");
    }

    assistants = assistants.filter((a) => a.id !== id);
  },

  // Actualizar reglas de un asistente
  async updateAssistantRules(id: string, rules: string): Promise<Assistant> {
    await delay(300);

    const index = assistants.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new Error("Asistente no encontrado");
    }

    assistants[index].rules = rules;
    return assistants[index];
  },
};
