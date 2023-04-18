import Frete from "../frete/Frete";
import ItemResumo from "../item-resumo/ItemResumo";
import "./Resumo.css";
import { CarrinhoProvider, useCarrinho } from "../../contexts/CarrinhoContext";

export default function Resumo() {
  const { getCarrinhoTotal, getCarrinhoItems, getFrete } = useCarrinho();

  const submit = () => {
    if (getCarrinhoItems().length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }
    const f = getFrete();
    if (f > 0) {
      alert(
        `Pedido enviado com valor de ${(
          getCarrinhoTotal() + getFrete()
        ).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`
      );
      console.log(getCarrinhoItems())
    } else {
      alert("Defina seu endereço!");
    }
  };

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
      <button
        onClick={submit}
        style={{ margin: "10px", width: "100%", height: "2em" }}

      >
        Fechar pedido
      </button>
    </div>
  );
}
