import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { DataProvider } from "./context/DataContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
// import ImageLoad from './testing/ImageLoad.tsx';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <DataProvider>
        <ChakraProvider>
          <App />
          {/* <ImageLoad /> */}
        </ChakraProvider>
      </DataProvider>
    </AuthProvider>
  </React.StrictMode>
);
