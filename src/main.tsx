import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Root } from "./Root.tsx";
import { GlobalStyles } from "./utils/theming/globalStyles.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalStyles />
    <Root />
  </StrictMode>
);
