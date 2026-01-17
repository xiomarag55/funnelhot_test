import React from "react";
import { AssistantFormData } from "@/types/assistant";
import { LANGUAGES, TONES } from "@/utils/constants";
import { ProgressSteps } from "@/components/ui/ProgressSteps";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface AssistantFormProps {
  step: number;
  formData: AssistantFormData;
  errors: Record<string, string>;
  onUpdate: (data: Partial<AssistantFormData>) => void;
  onUpdateResponseLength: (
    type: keyof AssistantFormData["responseLength"],
    value: number
  ) => void;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const AssistantForm: React.FC<AssistantFormProps> = ({
  step,
  formData,
  errors,
  onUpdate,
  onUpdateResponseLength,
  onNext,
  onBack,
  onSubmit,
  isSubmitting,
}) => {
  const steps = ["Datos Básicos", "Configuración"];

  const handleResponseLengthChange = (
    type: keyof typeof formData.responseLength,
    value: number
  ) => {
    const currentTotal = Object.values(formData.responseLength).reduce(
      (a, b) => a + b,
      0
    );
    const otherTypes = Object.keys(formData.responseLength).filter(
      (key) => key !== type
    ) as Array<keyof typeof formData.responseLength>;

    if (currentTotal === 100) {
      // Redistribuir proporcionalmente
      const otherTotal = otherTypes.reduce(
        (sum, key) => sum + formData.responseLength[key],
        0
      );
      otherTypes.forEach((key) => {
        const proportion = formData.responseLength[key] / otherTotal || 0;
        const adjustment = (100 - value) * proportion;
        onUpdateResponseLength(key, Math.round(adjustment));
      });
    }
    onUpdateResponseLength(type, value);
  };

  const totalPercentage = Object.values(formData.responseLength).reduce(
    (a, b) => a + b,
    0
  );

  return (
    <div className="space-y-6">
      <ProgressSteps steps={steps} currentStep={step} />

      {step === 1 && (
        <Card>
          <div className="space-y-6">
            <Input
              label="Nombre del Asistente"
              placeholder="Ej: Asistente de Ventas"
              value={formData.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              error={errors.name}
              required
              minLength={3}
            />

            <Select
              label="Idioma"
              options={LANGUAGES}
              value={formData.language}
              onChange={(e) =>
                onUpdate({
                  language: e.target.value as
                    | "Español"
                    | "Inglés"
                    | "Portugués",
                })
              }
              error={errors.language}
              required
            />

            <Select
              label="Tono/Personalidad"
              options={TONES}
              value={formData.tone}
              onChange={(e) =>
                onUpdate({
                  tone: e.target.value as
                    | "Formal"
                    | "Casual"
                    | "Profesional"
                    | "Amigable",
                })
              }
              error={errors.tone}
              required
            />

            <div className="flex justify-end pt-4">
              <Button onClick={onNext}>Siguiente</Button>
            </div>
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Longitud de Respuestas
                <span className="text-red-500 ml-1">*</span>
                <span className="ml-2 text-sm font-normal text-gray-500">
                  (Total: {totalPercentage}%)
                </span>
              </label>

              {totalPercentage !== 100 && (
                <p className="text-sm text-red-600 mb-4">
                  La suma debe ser exactamente 100%
                </p>
              )}

              <div className="space-y-6">
                {/* Short Responses */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Respuestas Cortas
                    </label>
                    <span className="text-sm font-medium text-primary-600">
                      {formData.responseLength.short}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.responseLength.short}
                    onChange={(e) =>
                      handleResponseLengthChange(
                        "short",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Medium Responses */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Respuestas Medianas
                    </label>
                    <span className="text-sm font-medium text-primary-600">
                      {formData.responseLength.medium}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.responseLength.medium}
                    onChange={(e) =>
                      handleResponseLengthChange(
                        "medium",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Long Responses */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Respuestas Largas
                    </label>
                    <span className="text-sm font-medium text-primary-600">
                      {formData.responseLength.long}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.responseLength.long}
                    onChange={(e) =>
                      handleResponseLengthChange(
                        "long",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>

              {/* Visual Progress Bar */}
              <div className="mt-6">
                <div className="flex h-4 rounded-full overflow-hidden mb-2">
                  <div
                    className="bg-red-500 transition-all duration-300"
                    style={{ width: `${formData.responseLength.short}%` }}
                    title={`Cortas: ${formData.responseLength.short}%`}
                  />
                  <div
                    className="bg-yellow-500 transition-all duration-300"
                    style={{ width: `${formData.responseLength.medium}%` }}
                    title={`Medianas: ${formData.responseLength.medium}%`}
                  />
                  <div
                    className="bg-green-500 transition-all duration-300"
                    style={{ width: `${formData.responseLength.long}%` }}
                    title={`Largas: ${formData.responseLength.long}%`}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Cortas: {formData.responseLength.short}%</span>
                  <span>Medianas: {formData.responseLength.medium}%</span>
                  <span>Largas: {formData.responseLength.long}%</span>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Ejemplo:</strong> Si cortas=30, medianas=50,
                  largas=20, significa que el 30% de las respuestas serán
                  cortas, 50% medianas, 20% largas.
                </p>
              </div>
            </div>

            {/* Audio Enabled Checkbox */}
            <div className="pt-4">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={formData.audioEnabled}
                    onChange={(e) =>
                      onUpdate({ audioEnabled: e.target.checked })
                    }
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 border rounded flex items-center justify-center ${
                      formData.audioEnabled
                        ? "bg-primary-600 border-primary-600"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {formData.audioEnabled && (
                      <svg
                        className="h-3 w-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="ml-2 text-sm text-gray-700">
                  Habilitar respuestas de audio
                </span>
              </label>
            </div>

            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={onBack}>
                Atrás
              </Button>
              <Button
                onClick={onSubmit}
                loading={isSubmitting}
                disabled={totalPercentage !== 100}
              >
                Guardar Asistente
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
