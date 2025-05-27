import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Wrapper from "./pages/Wrapper";
import Goalpage from "./pages/Goalpage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* home */}
        <Route path="/" element={<Home />} />

        {/* register */}
        <Route path="/register" element={<Register />} />

        {/* login */}
        <Route path="/login" element={<Login />} />

        {/* dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <Wrapper>
              <Dashboard />
            </Wrapper>
          } 
        />
        {/* goalpage */}
        <Route 
          path="/goalpage/:id" 
          element={
            <Wrapper>
              <Goalpage />
            </Wrapper>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;