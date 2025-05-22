import { JSX } from "react";

import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "../lib/react-query";
import { AppRoutes } from "./routes";

export function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  );
}
