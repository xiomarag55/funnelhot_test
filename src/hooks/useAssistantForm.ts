import { useState } from "react";
import { AssistantFormData } from "@/types/assistant";

export const useAssistantForm = (initialData?: Partial<AssistantFormData>) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<AssistantFormData>({
    name: initialData?.name || "",
    language: initialData?.language || "Español",
    tone: initialData?.tone || "Formal",
    responseLength: initialData?.responseLength || {
      short: 33,
      medium: 34,
      long: 33,
    },
    audioEnabled: initialData?.audioEnabled || false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validaciones
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.length < 3) {
      newErrors.name = "El nombre debe tener al menos 3 caracteres";
    }

    if (!formData.language) {
      newErrors.language = "Selecciona un idioma";
    }

    if (!formData.tone) {
      newErrors.tone = "Selecciona un tono";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    const { short, medium, long } = formData.responseLength;
    const total = short + medium + long;

    if (total !== 100) {
      newErrors.responseLength = `La suma debe ser 100% (actual: ${total}%)`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateFormData = (updates: Partial<AssistantFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
    // Limpiar error del campo actualizado
    if (updates.name) setErrors((prev) => ({ ...prev, name: "" }));
    if (updates.language) setErrors((prev) => ({ ...prev, language: "" }));
    if (updates.tone) setErrors((prev) => ({ ...prev, tone: "" }));
  };

  const updateResponseLength = (
    type: keyof typeof formData.responseLength,
    value: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      responseLength: {
        ...prev.responseLength,
        [type]: value,
      },
    }));

    // Limpiar error de responseLength
    setErrors((prev) => ({ ...prev, responseLength: "" }));
  };

  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
      return true;
    }
    return false;
  };

  const prevStep = () => {
    setStep(1);
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      name: "",
      language: "Español",
      tone: "Formal",
      responseLength: { short: 33, medium: 34, long: 33 },
      audioEnabled: false,
    });
    setErrors({});
  };

  return {
    step,
    formData,
    errors,
    updateFormData,
    updateResponseLength,
    nextStep,
    prevStep,
    resetForm,
    validateStep2,
  };
};
