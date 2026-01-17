import React from "react";
import { renderHook, waitFor, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAssistants } from "../../hooks/useAssistants";
import { mockApi } from "@/services/mockApi";

// Mock de toast para evitar errores
jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

// Mock del store
jest.mock("@/stores/assistantStore", () => ({
  useAssistantStore: jest.fn((selector) => {
    const mockStore = {
      setAssistants: jest.fn(),
      addAssistant: jest.fn(),
      updateAssistant: jest.fn(),
      closeModal: jest.fn(),
    };
    return selector(mockStore);
  }),
}));

// Mock de la API
jest.mock("@/services/mockApi", () => ({
  mockApi: {
    getAssistants: jest.fn(),
    createAssistant: jest.fn(),
    updateAssistant: jest.fn(),
    deleteAssistant: jest.fn(),
    getAssistantById: jest.fn(),
    updateAssistantRules: jest.fn(),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useAssistants Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("fetches assistants on mount", async () => {
    const mockAssistants = [
      {
        id: "1",
        name: "Test Assistant",
        language: "Español",
        tone: "Formal",
        responseLength: { short: 30, medium: 50, long: 20 },
        audioEnabled: true,
        rules: "",
      },
    ];

    (mockApi.getAssistants as jest.Mock).mockResolvedValue(mockAssistants);

    const { result } = renderHook(() => useAssistants(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.assistants).toEqual(mockAssistants);
    expect(mockApi.getAssistants).toHaveBeenCalledTimes(1);
  });

  test("handles create assistant mutation", async () => {
    const newAssistant = {
      name: "New Assistant",
      language: "Español" as const,
      tone: "Formal" as const,
      responseLength: { short: 25, medium: 50, long: 25 },
      audioEnabled: true,
    };

    const createdAssistant = {
      ...newAssistant,
      id: "123",
      rules: "",
    };

    (mockApi.createAssistant as jest.Mock).mockResolvedValue(createdAssistant);

    const { result } = renderHook(() => useAssistants(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.createAssistant(newAssistant);
    });

    expect(mockApi.createAssistant).toHaveBeenCalledWith(newAssistant);
  });

  test("handles update assistant mutation", async () => {
    const updates = {
      id: "1",
      data: {
        name: "Updated Assistant",
        language: "Inglés" as const,
        tone: "Casual" as const,
        responseLength: { short: 10, medium: 60, long: 30 },
        audioEnabled: false,
      },
    };

    (mockApi.updateAssistant as jest.Mock).mockResolvedValue({
      ...updates.data,
      id: "1",
      rules: "",
    });

    const { result } = renderHook(() => useAssistants(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.updateAssistant(updates);
    });

    expect(mockApi.updateAssistant).toHaveBeenCalledWith("1", updates.data);
  });

  test("handles delete assistant mutation", async () => {
    (mockApi.deleteAssistant as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useAssistants(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.deleteAssistant("1");
    });

    expect(mockApi.deleteAssistant).toHaveBeenCalledWith("1");
  });
});
