// @ts-nocheck
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { i18n } from "./lib/i18n";
import { generateColorCSS, getColorConfig } from "./lib/color-config";

// Inject color CSS variables (will be customized by LangChain)
const colorCSS = generateColorCSS(getColorConfig());
const style = document.createElement('style');
style.textContent = colorCSS;
document.head.appendChild(style);

// Initialize i18n with the environment locale (will be defined during scaffold)
const locale = import.meta.env.VITE_LOCALE || 'en-US';
i18n.init(locale).then(() => {
  createRoot(document.getElementById("root")!).render(<App />);
});
