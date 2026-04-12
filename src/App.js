import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AdminPannel from "./Admin/AdminPannel";

function App() {
  return (
    <Router>
      <div className="App">
        <AdminPannel />
      </div>
    </Router>
  );
}

export default App;
