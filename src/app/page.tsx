"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { AssistantList } from "@/components/assistants/AssistantList";
import { AssistantForm } from "@/components/assistants/AssistantForm";
import { useAssistants } from "@/hooks/useAssistants";
import { useAssistantForm } from "@/hooks/useAssistantForm";
import { useAssistantStore } from "@/stores/assistantStore";

export default function HomePage() {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const {
    assistants,
    isLoading,
    createAssistant,
    updateAssistant,
    deleteAssistant,
    isCreating,
    isUpdating,
  } = useAssistants();

  const store = useAssistantStore();
  const form = useAssistantForm(store.selectedAssistant || undefined);

  const handleSubmit = async () => {
    if (form.step === 1 && !form.nextStep()) {
      return;
    }

    if (form.step === 2 && form.validateStep2()) {
      if (store.modalMode === "create") {
        await createAssistant(form.formData);
      } else if (store.selectedAssistant) {
        await updateAssistant({
          id: store.selectedAssistant.id,
          data: form.formData,
        });
      }
      form.resetForm();
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteAssistant(id);
    } finally {
      setDeletingId(null);
    }
  };

  const handleModalClose = () => {
    store.closeModal();
    form.resetForm();
  };

  const modalTitle =
    store.modalMode === "create" ? "Crear Nuevo Asistente" : "Editar Asistente";

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Mis Asistentes</h2>
            <p className="text-gray-600 mt-1">
              Gestiona y entrena a tus asistentes virtuales
            </p>
          </div>
          <Button onClick={() => store.openModal("create")} size="lg">
            <Plus className="h-5 w-5 mr-2" />
            Crear Asistente
          </Button>
        </div>

        {/* Assistant List */}
        <AssistantList
          assistants={assistants}
          isLoading={isLoading}
          onDelete={handleDelete}
          isDeletingId={deletingId}
        />
      </div>

      {/* Modal */}
      <Modal
        isOpen={store.isModalOpen}
        onClose={handleModalClose}
        title={modalTitle}
        size="lg"
      >
        <AssistantForm
          step={form.step}
          formData={form.formData}
          errors={form.errors}
          onUpdate={form.updateFormData}
          onUpdateResponseLength={form.updateResponseLength}
          onNext={form.nextStep}
          onBack={form.prevStep}
          onSubmit={handleSubmit}
          isSubmitting={store.modalMode === "create" ? isCreating : isUpdating}
        />
      </Modal>
    </>
  );
}
