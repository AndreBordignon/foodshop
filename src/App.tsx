import "./global.css";

import { HelmetProvider, Helmet } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme/theme-provider";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="foodshop-theme" defaultTheme="dark">
        <Toaster richColors />
        <Helmet titleTemplate="%s | foods" />
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
