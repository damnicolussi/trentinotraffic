import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";

import Home from "./pages/home/Home";
import Webcams from "./pages/webcams/Webcams";
import Data from "./pages/data/Data";

import WebcamData from "./pages/webcam-data/WebcamData.tsx";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const intervalId = setInterval(() => {
      window.location.reload();
    }, 300000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="app">
      <Header />

      <div className="container">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/webcams" element={<Webcams />} />
          <Route path="/webcams/:cam" element={<WebcamData />} />
          <Route path="/data/:data" element={<Data />} />
          <Route path="*" element={<Navigate to="/home" replace={true} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
