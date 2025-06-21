import { Route } from "react-router-dom";

import { Router } from "lib/electron-router-dom";

import LoginScreen from "./screens/login";
import VerifyScreen from "./screens/verify";
import Dashboard from "./screens/dashboard";
import FavoritesScreen from "./screens/favorites";
import TrashScreen from "./screens/trash";
import SignupScreen from "./screens/signup";
import PasswordsScreen from "./screens/passwords";
import FavoritesSitesScreen from "./screens/favorites-sites";
import SetupScreen from "./screens/setup-2fa";
import CommandsScreen from "./screens/commands";

export function AppRoutes() {
  return (
    <Router
      main={
        <>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/verify" element={<VerifyScreen />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/favorites" element={<FavoritesScreen />} />
          <Route path="/commands" element={<CommandsScreen />} />
          {/* <Route path="/favorites-sites" element={<FavoritesSitesScreen />} /> */}
          <Route path="/trash" element={<TrashScreen />} />
          <Route path="/signup" element={<SetupScreen />} />
          <Route path="/passwords" element={<PasswordsScreen />} />
        </>
      }
    />
  );
}
