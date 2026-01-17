import { renderHook, act } from "@testing-library/react";
import { useAssistantForm } from "../../hooks/useAssistantForm";

describe("useAssistantForm Hook", () => {
  test("initializes with default values", () => {
    const { result } = renderHook(() => useAssistantForm());

    expect(result.current.formData).toEqual({
      name: "",
      language: "Español",
      tone: "Formal",
      responseLength: { short: 33, medium: 34, long: 33 },
      audioEnabled: false,
    });
  });

  test("initializes with provided data", () => {
    const initialData = {
      name: "Test Name",
      language: "Inglés" as const,
      tone: "Profesional" as const,
    };

    const { result } = renderHook(() => useAssistantForm(initialData));

    expect(result.current.formData.name).toBe("Test Name");
    expect(result.current.formData.language).toBe("Inglés");
    expect(result.current.formData.tone).toBe("Profesional");
  });

  test("updates form data", () => {
    const { result } = renderHook(() => useAssistantForm());

    act(() => {
      result.current.updateFormData({ name: "New Name" });
    });

    expect(result.current.formData.name).toBe("New Name");
  });

  test("validates step 1 successfully", () => {
    const { result } = renderHook(() => useAssistantForm());

    act(() => {
      result.current.updateFormData({
        name: "Valid Name",
        language: "Español",
        tone: "Formal",
      });
    });

    const isValid = result.current.nextStep();
    expect(isValid).toBe(true);
    expect(result.current.step).toBe(2);
  });

  test("fails step 1 validation with short name", () => {
    const { result } = renderHook(() => useAssistantForm());

    act(() => {
      result.current.updateFormData({ name: "ab" });
    });

    const isValid = result.current.nextStep();
    expect(isValid).toBe(false);
    expect(result.current.errors.name).toBe(
      "El nombre debe tener al menos 3 caracteres",
    );
  });

  test("validates response length sum", () => {
    const { result } = renderHook(() => useAssistantForm());

    act(() => {
      result.current.updateFormData({
        responseLength: { short: 30, medium: 30, long: 30 },
      });
    });

    const isValid = result.current.validateStep2();
    expect(isValid).toBe(false);
    expect(result.current.errors.responseLength).toBeDefined();
  });

  test("goes back to step 1", () => {
    const { result } = renderHook(() => useAssistantForm());

    act(() => {
      result.current.nextStep(); // Go to step 2
      result.current.prevStep(); // Go back to step 1
    });

    expect(result.current.step).toBe(1);
  });

  test("resets form", () => {
    const { result } = renderHook(() => useAssistantForm());

    act(() => {
      result.current.updateFormData({
        name: "Test Name",
        audioEnabled: true,
      });
      result.current.nextStep();
      result.current.resetForm();
    });

    expect(result.current.step).toBe(1);
    expect(result.current.formData.name).toBe("");
    expect(result.current.formData.audioEnabled).toBe(false);
  });
});
