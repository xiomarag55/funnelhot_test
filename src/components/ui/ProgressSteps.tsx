import React from "react";
import { Check } from "lucide-react";

interface ProgressStepsProps {
  steps: string[];
  currentStep: number;
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({
  steps,
  currentStep,
}) => {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;

        return (
          <React.Fragment key={step}>
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  isCompleted || isCurrent
                    ? "border-primary-600 bg-primary-600 text-white"
                    : "border-gray-300 bg-white text-gray-400"
                }`}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="font-medium">{stepNumber}</span>
                )}
              </div>
              <span
                className={`mt-2 text-sm font-medium ${
                  isCompleted || isCurrent
                    ? "text-primary-600"
                    : "text-gray-500"
                }`}
              >
                {step}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`w-16 h-0.5 mx-4 ${
                  stepNumber < currentStep ? "bg-primary-600" : "bg-gray-300"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
