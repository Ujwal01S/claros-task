import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { BrowserRouter } from "react-router";
import ReactQueryProvider from "./providers/react-query.provider.tsx";
import { NuqsAdapter } from "nuqs/adapters/react";
import { Toaster } from "./components/ui/sonner.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <NuqsAdapter>
        <Provider store={store}>
          <BrowserRouter>
            <Toaster />

            <App />
          </BrowserRouter>
        </Provider>
      </NuqsAdapter>
    </ReactQueryProvider>
  </StrictMode>,
);
