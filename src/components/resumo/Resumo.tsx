import React from "react";
import Frete from "../frete/Frete";
import ItemResumo from "../item-resumo/ItemResumo";
import "./Resumo.css";
import { CarrinhoProvider, useCarrinho } from "../../contexts/CarrinhoContext";

export default function Resumo() {
  const { getCarrinhoTotal, getCarrinhoItems, getFrete } = useCarrinho();

  return (
    <div className="resumo">
      <h3>Resumo</h3>
      <hr></hr>
      <Frete />
      <hr></hr>
      <div style={{ margin: "10px" }}>
        <ItemResumo
          texto={`Itens (${getCarrinhoItems().length})`}
          valor={getCarrinhoTotal()}
        ></ItemResumo>
        <ItemResumo texto="Frete" valor={getFrete()} />
      </div>
      <hr></hr>
      <div style={{ margin: "10px" }}>
        <ItemResumo texto="Total" valor={getCarrinhoTotal() + getFrete()} />
      </div>
    </div>
  );
}
