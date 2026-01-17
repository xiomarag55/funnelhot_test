import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../../../components/ui/Button";

describe("Button Component", () => {
  test("renders with children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  test("handles click event", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("shows loading state", () => {
    render(<Button loading>Click me</Button>);
    expect(screen.getByText("Procesando...")).toBeInTheDocument();
  });

  test("is disabled when loading", () => {
    render(<Button loading>Click me</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("applies variant classes", () => {
    const { container } = render(<Button variant="danger">Delete</Button>);
    expect(container.firstChild).toHaveClass("bg-red-600");
  });
});
