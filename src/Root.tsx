import React from "react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

function render(App: React.ComponentType) {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

export default render;
