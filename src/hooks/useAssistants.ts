import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mockApi } from "@/services/mockApi";
import { useAssistantStore } from "@/stores/assistantStore";
import { Assistant, AssistantFormData } from "@/types/assistant";
import toast from "react-hot-toast";
import { useEffect } from "react";

export const useAssistants = () => {
  const queryClient = useQueryClient();

  // Extraer SOLO las funciones que necesitamos del store
  const setAssistants = useAssistantStore((state) => state.setAssistants);
  const addAssistant = useAssistantStore((state) => state.addAssistant);
  const updateAssistant = useAssistantStore((state) => state.updateAssistant);
  const closeModal = useAssistantStore((state) => state.closeModal);

  // Query para obtener todos los asistentes
  const assistantsQuery = useQuery({
    queryKey: ["assistants"],
    queryFn: mockApi.getAssistants,
  });

  // Usar useEffect para manejar el éxito de la query
  useEffect(() => {
    if (assistantsQuery.data) {
      setAssistants(assistantsQuery.data);
    }
  }, [assistantsQuery.data, setAssistants]);

  // Mutation para crear asistente
  const createAssistantMutation = useMutation({
    mutationFn: (data: AssistantFormData) => mockApi.createAssistant(data),
    onMutate: async (newAssistant) => {
      await queryClient.cancelQueries({ queryKey: ["assistants"] });
      const previousAssistants =
        queryClient.getQueryData<Assistant[]>(["assistants"]) || [];

      queryClient.setQueryData<Assistant[]>(["assistants"], (old = []) => [
        ...old,
        {
          ...newAssistant,
          id: Date.now().toString(),
          rules: "",
        } as Assistant,
      ]);

      return { previousAssistants };
    },
    onSuccess: (assistant) => {
      addAssistant(assistant);
      toast.success("Asistente creado exitosamente");
      closeModal();
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        ["assistants"],
        context?.previousAssistants || []
      );
      toast.error(`Error: ${err.message}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["assistants"] });
    },
  });

  // Mutation para actualizar asistente
  const updateAssistantMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: AssistantFormData }) =>
      mockApi.updateAssistant(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["assistants"] });
      const previousAssistants =
        queryClient.getQueryData<Assistant[]>(["assistants"]) || [];

      queryClient.setQueryData<Assistant[]>(["assistants"], (old = []) =>
        old.map((assistant) =>
          assistant.id === id ? { ...assistant, ...data } : assistant
        )
      );

      return { previousAssistants };
    },
    onSuccess: (updatedAssistant) => {
      updateAssistant(updatedAssistant.id, updatedAssistant);
      toast.success("Asistente actualizado exitosamente");
      closeModal();
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        ["assistants"],
        context?.previousAssistants || []
      );
      toast.error(`Error: ${err.message}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["assistants"] });
    },
  });

  // Mutation para eliminar asistente
  const deleteAssistantMutation = useMutation({
    mutationFn: (id: string) => mockApi.deleteAssistant(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["assistants"] });
      const previousAssistants =
        queryClient.getQueryData<Assistant[]>(["assistants"]) || [];

      queryClient.setQueryData<Assistant[]>(["assistants"], (old = []) =>
        old.filter((assistant) => assistant.id !== id)
      );

      return { previousAssistants };
    },
    onSuccess: () => {
      toast.success("Asistente eliminado exitosamente");
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(
        ["assistants"],
        context?.previousAssistants || []
      );
      toast.error(`Error: ${err.message}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["assistants"] });
    },
  });

  return {
    assistants: assistantsQuery.data || [],
    isLoading: assistantsQuery.isLoading,
    isError: assistantsQuery.isError,
    createAssistant: createAssistantMutation.mutate,
    updateAssistant: updateAssistantMutation.mutate,
    deleteAssistant: deleteAssistantMutation.mutate,
    isCreating: createAssistantMutation.isPending,
    isUpdating: updateAssistantMutation.isPending,
    isDeleting: deleteAssistantMutation.isPending,
  };
};

// Hook para obtener un asistente específico
export const useAssistant = (id?: string) => {
  return useQuery({
    queryKey: ["assistant", id],
    queryFn: () => mockApi.getAssistantById(id!),
    enabled: !!id,
  });
};

// Hook para actualizar reglas del asistente
export const useUpdateAssistantRules = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, rules }: { id: string; rules: string }) =>
      mockApi.updateAssistantRules(id, rules),
    onSuccess: (updatedAssistant) => {
      queryClient.setQueryData(
        ["assistant", updatedAssistant.id],
        updatedAssistant
      );
      toast.success("Reglas actualizadas exitosamente");
    },
    onError: (err) => {
      toast.error(`Error: ${err.message}`);
    },
  });
};
