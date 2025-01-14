import React from "react";
import ReactDOM from "react-dom/client";
import { Roster } from "./Roster";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Roster />
  </React.StrictMode>
);
