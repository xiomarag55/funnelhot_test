import { Assistant } from "@/types/assistant";

export const MOCK_ASSISTANTS: Assistant[] = [
  {
    id: "1",
    name: "Asistente de Ventas",
    language: "Español",
    tone: "Profesional",
    responseLength: { short: 30, medium: 50, long: 20 },
    audioEnabled: true,
    rules:
      "Eres un asistente especializado en ventas. Siempre sé cordial y enfócate en identificar necesidades del cliente antes de ofrecer productos.",
  },
  {
    id: "2",
    name: "Soporte Técnico",
    language: "Inglés",
    tone: "Amigable",
    responseLength: { short: 20, medium: 30, long: 50 },
    audioEnabled: false,
    rules:
      "Ayudas a resolver problemas técnicos de manera clara y paso a paso. Siempre confirma que el usuario haya entendido antes de continuar.",
  },
];

export const MOCK_RESPONSES = [
  "Entendido, ¿en qué más puedo ayudarte?",
  "Esa es una excelente pregunta. Déjame explicarte...",
  "Claro, con gusto te ayudo con eso.",
  "¿Podrías darme más detalles sobre tu consulta?",
  "Perfecto, he registrado esa información.",
  "De acuerdo, procedamos paso a paso.",
  "Gracias por compartir esa información.",
  "Entiendo tu situación, permíteme ayudarte.",
  "Eso es interesante, ¿has considerado...?",
  "Perfecto, ahora tenemos toda la información necesaria.",
];

export const LANGUAGES = [
  { value: "Español", label: "Español" },
  { value: "Inglés", label: "English" },
  { value: "Portugués", label: "Português" },
] as const;

export const TONES = [
  { value: "Formal", label: "Formal" },
  { value: "Casual", label: "Casual" },
  { value: "Profesional", label: "Profesional" },
  { value: "Amigable", label: "Amigable" },
] as const;
