import React, { useState } from "react";
import { Assistant } from "@/types/assistant";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Save } from "lucide-react";
import toast from "react-hot-toast";

interface TrainingSectionProps {
  assistant: Assistant;
  onUpdateRules: (rules: string) => Promise<void>;
  isUpdating: boolean;
}

export const TrainingSection: React.FC<TrainingSectionProps> = ({
  assistant,
  onUpdateRules,
  isUpdating,
}) => {
  const [rules, setRules] = useState(assistant.rules || "");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    try {
      await onUpdateRules(rules);
      setIsEditing(false);
    } catch (error) {
      toast.error("Error al guardar las reglas");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Entrenamiento</h3>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setRules(assistant.rules || "");
                  setIsEditing(false);
                }}
              >
                Cancelar
              </Button>
              <Button size="sm" onClick={handleSave} loading={isUpdating}>
                <Save className="h-4 w-4 mr-2" />
                Guardar
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              Editar Reglas
            </Button>
          )}
        </div>
      </div>

      <Textarea
        value={rules}
        onChange={(e) => setRules(e.target.value)}
        placeholder="Ingresa las instrucciones y reglas para entrenar a tu asistente..."
        disabled={!isEditing}
        rows={6}
      />

      <div className="p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          <strong>Ejemplo:</strong> Eres un asistente especializado en ventas.
          Siempre sé cordial y enfócate en identificar necesidades del cliente
          antes de ofrecer productos. Usa un tono profesional pero amigable.
        </p>
      </div>
    </div>
  );
};
