import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.tsx";
import LoginPage from "@/pages/login/LoginPage.tsx";
import AuthRouter from "@/components/container/AuthRouter.tsx";
import LoginRouteGuard from "@/components/container/LoginRouteGuard.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <LoginRouteGuard>
              <LoginPage />
            </LoginRouteGuard>
          }
        />
        <Route
          path="*"
          element={
            <AuthRouter>
              <App />
            </AuthRouter>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
