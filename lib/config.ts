import { ColorScheme, StartScreenPrompt, ThemeOption } from "@openai/chatkit";

export const WORKFLOW_ID =
  process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID?.trim() ?? "";

export const CREATE_SESSION_ENDPOINT = "/api/create-session";

export const STARTER_PROMPTS: StartScreenPrompt[] = [
  {
    label: "Discover KSU researchers in a certain domain",
    prompt:
      "Ask the user to specify a domain that you will then scour the database for information about, looking for researchers across the following categories: relevant research proposals (funded and submitted), relevant research publications, relevant research abstracts",
    icon: "search",
  },
  {
    label: "Visualize KSU Research administrative data",
    prompt:
      "Ask the user for what data they would like to visualize (and make sure that they specify time frame), and then prepare a UI based on those data. You will need to search tables in the database for the relevant information",
    icon: "write",
  },
];

export const PLACEHOLDER_INPUT = "Send to Parley";

export const GREETING = "What can I help you with today?";

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
