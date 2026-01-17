import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AssistantCard } from "../../../components/assistants/AssistantCard";
import { Assistant } from "@/types/assistant";

const mockAssistant: Assistant = {
  id: "1",
  name: "Test Assistant",
  language: "Español",
  tone: "Formal",
  responseLength: { short: 30, medium: 50, long: 20 },
  audioEnabled: true,
  rules: "Test rules",
};

describe("AssistantCard Component", () => {
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    mockOnDelete.mockClear();
  });

  test("renders assistant information", () => {
    render(<AssistantCard assistant={mockAssistant} onDelete={mockOnDelete} />);

    expect(screen.getByText("Test Assistant")).toBeInTheDocument();
    expect(screen.getByText("Español")).toBeInTheDocument();
    expect(screen.getByText("Formal")).toBeInTheDocument();
  });

  test("shows response length percentages", () => {
    render(<AssistantCard assistant={mockAssistant} onDelete={mockOnDelete} />);

    expect(screen.getByText("30% Cortas")).toBeInTheDocument();
    expect(screen.getByText("50% Medianas")).toBeInTheDocument();
    expect(screen.getByText("20% Largas")).toBeInTheDocument();
  });

  test("calls onDelete with confirmation", () => {
    window.confirm = jest.fn(() => true);

    render(<AssistantCard assistant={mockAssistant} onDelete={mockOnDelete} />);

    fireEvent.click(screen.getByText("Eliminar"));
    expect(window.confirm).toHaveBeenCalledWith(
      "¿Estás seguro de que quieres eliminar este asistente?",
    );
    expect(mockOnDelete).toHaveBeenCalledWith("1");
  });

  test("does not call onDelete when confirmation is cancelled", () => {
    window.confirm = jest.fn(() => false);

    render(<AssistantCard assistant={mockAssistant} onDelete={mockOnDelete} />);

    fireEvent.click(screen.getByText("Eliminar"));
    expect(window.confirm).toHaveBeenCalled();
    expect(mockOnDelete).not.toHaveBeenCalled();
  });
});
