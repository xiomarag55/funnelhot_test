"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { TrainingSection } from "@/components/training/TrainingSection";
import { ChatSimulation } from "@/components/training/ChatSimulation";
import { useAssistant } from "@/hooks/useAssistants";
import { useUpdateAssistantRules } from "@/hooks/useAssistants";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function AssistantTrainingPage() {
  const params = useParams();
  const router = useRouter();
  const assistantId = params.id as string;

  const { data: assistant, isLoading, error } = useAssistant(assistantId);
  const { mutateAsync: updateRules, isPending: isUpdating } =
    useUpdateAssistantRules();

  const handleUpdateRules = async (rules: string) => {
    await updateRules({ id: assistantId, rules });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !assistant) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Asistente no encontrado
        </h3>
        <p className="text-gray-600 mb-6">
          El asistente que buscas no existe o ha sido eliminado.
        </p>
        <Button onClick={() => router.push("/")}>Volver al listado</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.push("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {assistant.name}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-600">
                Idioma: {assistant.language}
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-600">
                Tono: {assistant.tone}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Training */}
        <Card className="lg:col-span-1">
          <TrainingSection
            assistant={assistant}
            onUpdateRules={handleUpdateRules}
            isUpdating={isUpdating}
          />
        </Card>

        {/* Right Column - Chat */}
        <Card className="lg:col-span-1">
          <ChatSimulation assistantName={assistant.name} />
        </Card>
      </div>

      {/* Assistant Info */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">
              Longitud de Respuestas
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Cortas</span>
                <span className="font-medium">
                  {assistant.responseLength.short}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Medianas</span>
                <span className="font-medium">
                  {assistant.responseLength.medium}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Largas</span>
                <span className="font-medium">
                  {assistant.responseLength.long}%
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">
              Configuración
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm">Respuestas de audio:</span>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    assistant.audioEnabled
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {assistant.audioEnabled ? "Habilitado" : "Deshabilitado"}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">
              Estadísticas
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Creado</span>
                <span className="font-medium">Hoy</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Última actualización</span>
                <span className="font-medium">Hace 2 horas</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
