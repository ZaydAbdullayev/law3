import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./home.jsx";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { LawDetail } from "./components/templates/details.jsx";

export const Layout = () => {
  return <div className="w100">{<Outlet />}</div>;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="law/:id" element={<LawDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
