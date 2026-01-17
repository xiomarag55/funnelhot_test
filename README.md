## Instrucciones para correr el proyecto

1. Clonar el repositorio
   git clone https://github.com/xiomarag55/funnelhot_test.git
   cd funnelhot_test

2. Instalar dependencias
   npm install

3. Ejecutar

npm run dev

4. Abrir en el navegador

http://localhost:3000

## Decisiones técnicas

1. Next.js 14 con App Router
   Mejor performance, soporte para React Server Components, y estructura de archivos más intuitiva

2. TypeScript
   Mayor seguridad de tipos, mejor autocompletado y detección temprana de errores

3. Gestión de Estado: Zustand y React Query

Zustand: Para estado global de UI

React Query: Para operaciones asíncronas y cache de datos del servidor

4. Formularios: React Hook Form

Mejor performance validación eficiente y fácil integración con TypeScript

5. Estilos: Tailwind CSS
   Desarrollo rápido, consistencia visual y fácil mantenimiento

6. Arquitectura de Componentes

Separación clara por responsabilidades y fácil escalabilidad

## Características implementadas

1. Página Principal (Listado de Asistentes)

- Tarjetas responsivas para cada asistente

- Información completa: nombre, idioma, tono, configuración de respuestas

- Acciones por tarjeta: Editar, Eliminar, Entrenar

- Botón "Crear Asistente" que abre modal

- Estado vacío cuando no hay asistentes

- Estados de carga durante operaciones

2. Modal de Creación/Edición (2 pasos)
   Paso 1: Datos básicos

- Nombre (requerido, mínimo 3 caracteres)

- Idioma (select con Español, Inglés, Portugués)

- Tono (select con Formal, Casual, Profesional, Amigable)

Paso 2: Configuración de respuestas

- Porcentajes de longitud (Cortas, Medianas, Largas) que suman 100%

- Checkbox para habilitar respuestas de audio

- Validaciones en tiempo real

- Indicador visual de paso actual

- Botones "Atrás" y "Guardar"

3. Página de Entrenamiento

- Ruta dinámica: /assistant/[id]

- Información del asistente en header

- Sección de entrenamiento con área de texto para prompts

- Sección de chat simulado con delay de 1-2 segundos

- Indicador "escribiendo..." durante la simulación

- Botón para reiniciar conversación

## Si tuviste que priorizar, qué dejaste fuera y por qué

## Tiempo aproximado de dedicación

- 14 horas
