// App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/:slug" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
