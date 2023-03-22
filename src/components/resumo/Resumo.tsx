import React from "react";
import Frete from "../frete/Frete";
import ItemResumo from "../item-resumo/ItemResumo";
import "./Resumo.css";

export default function Resumo() {
  return (
    <div className="resumo">
      <div>Resumo</div>
      <hr></hr>
      <Frete/>
      <hr></hr>
      <ItemResumo/>
      <ItemResumo/>
      <hr></hr>
      <ItemResumo/>
    </div>
  );
}
