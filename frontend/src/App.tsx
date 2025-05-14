import React from "react";
import LiveTable from "./components/LiveTable";
import "./App.css";
import HistoryTable from "./components/HistoryTable";

function App() {
  return (
    <div>
      <h1>Store Customer Dashboard</h1>
      <LiveTable />
      <HistoryTable />
    </div>
  );
}

export default App;
