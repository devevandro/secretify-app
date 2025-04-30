import { Route } from "react-router-dom";

import { Router } from "lib/electron-router-dom";

import LoginPage from "./screens/login/page";
import VerifyPage from "./screens/verify/page";
import Dashboard from "./screens/dashboard/page";
import FavoritesPage from "./screens/favorites/page";
import TrashPage from "./screens/trash/page";

export function AppRoutes() {
  return (
    <Router
      main={
        <>
          <Route path="/" element={<LoginPage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/trash" element={<TrashPage />} />
        </>
      }
    />
  );
}
