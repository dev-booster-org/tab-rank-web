import {  RouterProvider } from "react-router";
import { ThemeProvider } from "../contexts/theme-provider";

import { router } from "../routes/router";

export function App() {
  return (
    <ThemeProvider>
     <RouterProvider router={router} />
    </ThemeProvider>
  );
}
