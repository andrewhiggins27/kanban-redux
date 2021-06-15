import React, { useState } from "react";

import "./App.css";
import { KanbanBoard } from "./ui/KanbanBoard";

export const App = () => {
  const [globalCount, setGlobalCount] = useState(5);

  const globalIncrement = () => {
    setGlobalCount(globalCount + 1);
  };

  return (
    <div className="App">
      <KanbanBoard
        globalCount={globalCount}
        globalIncrement={globalIncrement}
      />
    </div>
  );
};
