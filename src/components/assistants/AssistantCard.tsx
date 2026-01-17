import React from "react";
import { Edit2, Trash2, MessageSquare, Volume2, VolumeX } from "lucide-react";
import { Assistant } from "@/types/assistant";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAssistantStore } from "@/stores/assistantStore";
import Link from "next/link";

interface AssistantCardProps {
  assistant: Assistant;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export const AssistantCard: React.FC<AssistantCardProps> = ({
  assistant,
  onDelete,
  isDeleting = false,
}) => {
  const store = useAssistantStore();

  const handleEdit = () => {
    store.openModal("edit", assistant);
  };

  const handleDelete = () => {
    if (confirm("¿Estás seguro de que quieres eliminar este asistente?")) {
      onDelete(assistant.id);
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {assistant.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {assistant.language}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {assistant.tone}
              </span>
              {assistant.audioEnabled ? (
                <Volume2 className="h-4 w-4 text-primary-600" />
              ) : (
                <VolumeX className="h-4 w-4 text-gray-400" />
              )}
            </div>
          </div>
        </div>

        {/* Response Length */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Longitud de respuestas:</p>
          <div className="flex h-2 rounded-full overflow-hidden">
            <div
              className="bg-red-500"
              style={{ width: `${assistant.responseLength.short}%` }}
              title={`Cortas: ${assistant.responseLength.short}%`}
            />
            <div
              className="bg-yellow-500"
              style={{ width: `${assistant.responseLength.medium}%` }}
              title={`Medianas: ${assistant.responseLength.medium}%`}
            />
            <div
              className="bg-green-500"
              style={{ width: `${assistant.responseLength.long}%` }}
              title={`Largas: ${assistant.responseLength.long}%`}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{assistant.responseLength.short}% Cortas</span>
            <span>{assistant.responseLength.medium}% Medianas</span>
            <span>{assistant.responseLength.long}% Largas</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto pt-4 border-t border-gray-100">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={handleEdit}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Editar
          </Button>

          <Link href={`/assistant/${assistant.id}`} className="flex-1">
            <Button variant="secondary" size="sm" className="w-full">
              <MessageSquare className="h-4 w-4 mr-2" />
              Entrenar
            </Button>
          </Link>

          <Button
            variant="danger"
            size="sm"
            onClick={handleDelete}
            loading={isDeleting}
            className="flex-1"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Eliminar
          </Button>
        </div>
      </div>
    </Card>
  );
};
