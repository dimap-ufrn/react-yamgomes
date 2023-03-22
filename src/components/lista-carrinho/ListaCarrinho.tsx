import { useCarrinho } from "../../contexts/CarrinhoContext";
import ItemCarrinho from "../item-carrinho/ItemCarrinho";
import "./ListaCarrinho.css";

export default function ListaCarrinho() {
  const { getCarrinhoItems, fillCarrinho, quantidadeItens } = useCarrinho();

  return (
    <div className="lista-carrinho">
      <h2>
        Carrinho de compras{" "}
        <button onClick={fillCarrinho}> adicionar itens exemplo</button>
      </h2>
      {quantidadeItens === 0 ? (
        <p>Carrinho vazio</p>
      ) : (
        <p>
          Você tem {quantidadeItens} ite{quantidadeItens > 1 ? "ns" : "m"}
        </p>
      )}
      {getCarrinhoItems().map((p) => (
        //with key
        <ItemCarrinho key={p.id} {...p} />
      ))}
    </div>
  );
}
