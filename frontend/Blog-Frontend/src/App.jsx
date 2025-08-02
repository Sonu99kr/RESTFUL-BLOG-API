import { useState } from "react";
import "./App.css";
import LoginPage from "./Components/Pages/LoginPage";
import HomePage from "./Components/Pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
