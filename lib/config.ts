import { ColorScheme, StartScreenPrompt, ThemeOption } from "@openai/chatkit";

export const WORKFLOW_ID =
  process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID?.trim() ?? "";

export const CREATE_SESSION_ENDPOINT = "/api/create-session";

export const STARTER_PROMPTS: StartScreenPrompt[] = [
  {
    label: "What is ChatKit?",
    prompt: "What is ChatKit and what does it do?",
    icon: "circle-question",
  },
];

export const PLACEHOLDER_INPUT = "Send to Parley";

export const GREETING = "Hooty hoo!";

export const getThemeConfig = (theme: ColorScheme): ThemeOption => ({
  color: {
    grayscale: {
      hue: 220,
      tint: 6,
      shade: theme === "dark" ? -1 : -4,
    },
    accent: {
      primary: "#232323",
      level: 1,
    },
  },
  radius: "pill",
  density: "normal",
  typography: {
    baseSize: 16,
  },
  // Add other theme options here
  // chatkit.studio/playground to explore config options
});
