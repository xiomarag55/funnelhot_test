import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "../../../components/ui/Input";

describe("Input Component", () => {
  test("renders with label", () => {
    render(<Input label="Username" />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
  });

  test("shows error message", () => {
    render(<Input error="Field is required" />);
    expect(screen.getByText("Field is required")).toBeInTheDocument();
  });

  test("handles input change", () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });

    expect(handleChange).toHaveBeenCalled();
  });

  test("displays helper text", () => {
    render(<Input helperText="Enter your username" />);
    expect(screen.getByText("Enter your username")).toBeInTheDocument();
  });
});
