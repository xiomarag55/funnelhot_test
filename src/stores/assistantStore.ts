import { create } from "zustand";
import { Assistant, ChatMessage } from "@/types/assistant";

interface AssistantStore {
  // Estado
  assistants: Assistant[];
  selectedAssistant: Assistant | null;
  isModalOpen: boolean;
  modalMode: "create" | "edit";
  chatHistories: Record<string, ChatMessage[]>;

  // Actions
  setAssistants: (assistants: Assistant[]) => void;
  setSelectedAssistant: (assistant: Assistant | null) => void;
  openModal: (mode: "create" | "edit", assistant?: Assistant) => void;
  closeModal: () => void;
  addAssistant: (assistant: Assistant) => void;
  updateAssistant: (id: string, assistant: Partial<Assistant>) => void;
  removeAssistant: (id: string) => void;
  addChatMessage: (assistantId: string, message: ChatMessage) => void;
  clearChatHistory: (assistantId: string) => void;
}

export const useAssistantStore = create<AssistantStore>((set) => ({
  // Estado inicial
  assistants: [],
  selectedAssistant: null,
  isModalOpen: false,
  modalMode: "create",
  chatHistories: {},

  // Actions
  setAssistants: (assistants) => set({ assistants }),

  setSelectedAssistant: (assistant) => set({ selectedAssistant: assistant }),

  openModal: (mode, assistant) =>
    set({
      isModalOpen: true,
      modalMode: mode,
      selectedAssistant: assistant,
    }),

  closeModal: () =>
    set({
      isModalOpen: false,
      selectedAssistant: null,
    }),

  addAssistant: (assistant) =>
    set((state) => ({
      assistants: [...state.assistants, assistant],
    })),

  updateAssistant: (id, updates) =>
    set((state) => ({
      assistants: state.assistants.map((assistant) =>
        assistant.id === id ? { ...assistant, ...updates } : assistant
      ),
    })),

  removeAssistant: (id) =>
    set((state) => ({
      assistants: state.assistants.filter((assistant) => assistant.id !== id),
    })),

  addChatMessage: (assistantId, message) =>
    set((state) => {
      const currentHistory = state.chatHistories[assistantId] || [];
      return {
        chatHistories: {
          ...state.chatHistories,
          [assistantId]: [...currentHistory, message],
        },
      };
    }),

  clearChatHistory: (assistantId) =>
    set((state) => ({
      chatHistories: {
        ...state.chatHistories,
        [assistantId]: [],
      },
    })),
}));
