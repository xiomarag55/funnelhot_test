import React from "react";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAssistantStore } from "@/stores/assistantStore";

export const EmptyState: React.FC = () => {
  const store = useAssistantStore();

  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        <Bot className="h-16 w-16 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No hay asistentes creados
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Crea tu primer asistente para comenzar a personalizar respuestas y
        entrenarlo según tus necesidades.
      </p>
      <Button onClick={() => store.openModal("create")} size="lg">
        Crear Primer Asistente
      </Button>
    </div>
  );
};
