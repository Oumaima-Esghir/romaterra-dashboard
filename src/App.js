import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AdminPanel from "./Admin/AdminPannel";

function App() {
  return (
    <Router>
      <div className="App">
        <AdminPanel />
      </div>
    </Router>
  );
}

export default App;
