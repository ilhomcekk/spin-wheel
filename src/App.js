import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Wheels from "./Wheels";
import Spinner from "./Spinner";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wheels />} />
        <Route path="/spin/:id" element={<Spinner />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
