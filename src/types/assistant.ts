export interface Assistant {
  id: string;
  name: string;
  language: "Español" | "Inglés" | "Portugués";
  tone: "Formal" | "Casual" | "Profesional" | "Amigable";
  responseLength: {
    short: number;
    medium: number;
    long: number;
  };
  audioEnabled: boolean;
  rules?: string;
}

export interface AssistantFormData {
  name: string;
  language: Assistant["language"];
  tone: Assistant["tone"];
  responseLength: {
    short: number;
    medium: number;
    long: number;
  };
  audioEnabled: boolean;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}
