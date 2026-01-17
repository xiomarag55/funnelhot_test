import React from "react";
import { Assistant } from "@/types/assistant";
import { AssistantCard } from "./AssistantCard";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { EmptyState } from "./EmptyState";

interface AssistantListProps {
  assistants: Assistant[];
  isLoading: boolean;
  onDelete: (id: string) => void;
  isDeletingId?: string | null;
}

export const AssistantList: React.FC<AssistantListProps> = ({
  assistants,
  isLoading,
  onDelete,
  isDeletingId,
}) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (assistants.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {assistants.map((assistant) => (
        <AssistantCard
          key={assistant.id}
          assistant={assistant}
          onDelete={onDelete}
          isDeleting={isDeletingId === assistant.id}
        />
      ))}
    </div>
  );
};
