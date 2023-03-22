import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Carrinho from "./components/carrinho/Carrinho";
import { CarrinhoProvider } from "./contexts/CarrinhoContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CarrinhoProvider>
      <Carrinho />
    </CarrinhoProvider>
  </React.StrictMode>
);
