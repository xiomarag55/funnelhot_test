import { act } from "@testing-library/react";
import { useAssistantStore } from "./assistantStore";
import { Assistant } from "@/types/assistant";

const mockAssistant: Assistant = {
  id: "1",
  name: "Test Assistant",
  language: "Español",
  tone: "Formal",
  responseLength: { short: 30, medium: 50, long: 20 },
  audioEnabled: false,
  rules: "",
};

describe("assistantStore", () => {
  beforeEach(() => {
    // Reset store before each test
    act(() => {
      useAssistantStore.getState().setAssistants([]);
    });
  });

  test("initial state", () => {
    const state = useAssistantStore.getState();

    expect(state.assistants).toEqual([]);
    expect(state.selectedAssistant).toBeNull();
    expect(state.isModalOpen).toBe(false);
    expect(state.modalMode).toBe("create");
    expect(state.chatHistories).toEqual({});
  });

  test("setAssistants", () => {
    act(() => {
      useAssistantStore.getState().setAssistants([mockAssistant]);
    });

    const { assistants } = useAssistantStore.getState();
    expect(assistants).toHaveLength(1);
    expect(assistants[0].name).toBe("Test Assistant");
  });

  test("addAssistant", () => {
    act(() => {
      useAssistantStore.getState().addAssistant(mockAssistant);
    });

    const { assistants } = useAssistantStore.getState();
    expect(assistants).toHaveLength(1);
    expect(assistants[0].id).toBe("1");
  });

  test("updateAssistant", () => {
    act(() => {
      useAssistantStore.getState().addAssistant(mockAssistant);
      useAssistantStore
        .getState()
        .updateAssistant("1", { name: "Updated Name" });
    });

    const { assistants } = useAssistantStore.getState();
    expect(assistants[0].name).toBe("Updated Name");
  });

  test("removeAssistant", () => {
    act(() => {
      useAssistantStore.getState().addAssistant(mockAssistant);
      useAssistantStore.getState().removeAssistant("1");
    });

    const { assistants } = useAssistantStore.getState();
    expect(assistants).toHaveLength(0);
  });

  test("openModal in create mode", () => {
    act(() => {
      useAssistantStore.getState().openModal("create");
    });

    const { isModalOpen, modalMode, selectedAssistant } =
      useAssistantStore.getState();
    expect(isModalOpen).toBe(true);
    expect(modalMode).toBe("create");
    expect(selectedAssistant).toBeNull();
  });

  test("openModal in edit mode", () => {
    act(() => {
      useAssistantStore.getState().openModal("edit", mockAssistant);
    });

    const { isModalOpen, modalMode, selectedAssistant } =
      useAssistantStore.getState();
    expect(isModalOpen).toBe(true);
    expect(modalMode).toBe("edit");
    expect(selectedAssistant).toEqual(mockAssistant);
  });

  test("closeModal", () => {
    act(() => {
      useAssistantStore.getState().openModal("create");
      useAssistantStore.getState().closeModal();
    });

    const { isModalOpen, selectedAssistant } = useAssistantStore.getState();
    expect(isModalOpen).toBe(false);
    expect(selectedAssistant).toBeNull();
  });

  test("addChatMessage", () => {
    const message = {
      id: "msg1",
      content: "Hello",
      sender: "user" as const,
      timestamp: new Date(),
    };

    act(() => {
      useAssistantStore.getState().addChatMessage("1", message);
    });

    const { chatHistories } = useAssistantStore.getState();
    expect(chatHistories["1"]).toHaveLength(1);
    expect(chatHistories["1"][0].content).toBe("Hello");
  });

  test("clearChatHistory", () => {
    const message = {
      id: "msg1",
      content: "Hello",
      sender: "user" as const,
      timestamp: new Date(),
    };

    act(() => {
      useAssistantStore.getState().addChatMessage("1", message);
      useAssistantStore.getState().clearChatHistory("1");
    });

    const { chatHistories } = useAssistantStore.getState();
    expect(chatHistories["1"]).toHaveLength(0);
  });
});
