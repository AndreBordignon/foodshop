import "./global.css";

import { HelmetProvider, Helmet } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme/theme-provider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="foodshop-theme" defaultTheme="dark">
        <QueryClientProvider client={queryClient}>
          <Toaster richColors />
          <Helmet titleTemplate="%s | foods" />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
