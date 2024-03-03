// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { DataProvider } from "./context/DataContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <AuthProvider>
      <DataProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </DataProvider>
    </AuthProvider>
);
