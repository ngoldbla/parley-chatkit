"use client";

import { useCallback, useState } from "react";
import type { ColorScheme } from "@/hooks/useColorScheme";

type SettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: ColorScheme;
  onThemeChange: (theme: ColorScheme) => void;
};

export function SettingsModal({
  isOpen,
  onClose,
  currentTheme,
  onThemeChange,
}: SettingsModalProps) {
  const [exportFormat, setExportFormat] = useState<"json" | "txt">("json");

  const handleExportConversation = useCallback(() => {
    const timestamp = new Date().toISOString().split("T")[0];
    const filename = `parley-conversation-${timestamp}.${exportFormat}`;

    // Create export data
    const exportData = {
      exported: new Date().toISOString(),
      conversation: "Conversation history will be available in future updates",
      settings: { theme: currentTheme },
    };

    const content =
      exportFormat === "json"
        ? JSON.stringify(exportData, null, 2)
        : `The Parley Conversation Export\nDate: ${exportData.exported}\nTheme: ${currentTheme}\n\nConversation history will be available in future updates.`;

    // Create download
    const blob = new Blob([content], {
      type: exportFormat === "json" ? "application/json" : "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }, [currentTheme, exportFormat]);

  const handleClearHistory = useCallback(() => {
    if (confirm("Are you sure you want to clear your local preferences?")) {
      localStorage.clear();
      alert("Local preferences cleared! Reload the page to see changes.");
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-slate-800">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Close settings"
        >
          ✕
        </button>

        <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
          Settings
        </h2>

        {/* Theme Toggle */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Theme
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => onThemeChange("light")}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                currentTheme === "light"
                  ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
              }`}
            >
              Light
            </button>
            <button
              onClick={() => onThemeChange("dark")}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                currentTheme === "dark"
                  ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
              }`}
            >
              Dark
            </button>
          </div>
        </div>

        {/* Export Section */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Export Conversation
          </label>
          <div className="mb-3 flex gap-2">
            <select
              value={exportFormat}
              onChange={(e) =>
                setExportFormat(e.target.value as "json" | "txt")
              }
              className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="json">JSON</option>
              <option value="txt">Text</option>
            </select>
            <button
              onClick={handleExportConversation}
              className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
            >
              Export
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Download your conversation for record keeping
          </p>
        </div>

        {/* Clear Data Section */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Privacy
          </label>
          <button
            onClick={handleClearHistory}
            className="w-full rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 dark:border-red-700 dark:bg-gray-700 dark:text-red-400 dark:hover:bg-gray-600"
          >
            Clear Local Data
          </button>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Remove stored preferences from this browser
          </p>
        </div>

        {/* Info Section */}
        <div className="rounded-md bg-gray-50 p-3 dark:bg-gray-700">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            <strong>The Parley</strong> - KSU Office of Research Internal Beta
            <br />
            For support, contact the Office of Research
          </p>
        </div>
      </div>
    </div>
  );
}
