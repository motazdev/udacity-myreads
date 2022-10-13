import "./App.css";
// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";



function App() {

  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
