import { useCarrinho } from "../../contexts/CarrinhoContext";
import { ProdutoCarrinho } from "../../types/Produto";
import "./ItemCarrinho.css";

export default function ItemCarrinho(produto: ProdutoCarrinho) {
  const { addItem, removeItem, deleteItem } = useCarrinho();

  return (
    <div className="item-carrinho">
      <img className="imagem-carrinho" src={produto.imagem}></img>
      <div className="info-item-carrinho">
        <p className="nome-item-carrinho">{produto.nome}</p>
        <p className="descricao-item-carrinho">{produto.descricao}</p>
        <p className="preco-item-carrinho">
          {produto.preco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>
      <div className="resto-carrinho">
        <div className="contador-item-carrinho">
          <span className="quantidade-item-carrinho">
            {produto.quantidade} ite{produto.quantidade > 1 ? "ns" : "m"}
          </span>
          <div className="botoes-item-carrinho">
            <button
              className="botao-item-carrinho"
              onClick={() => addItem(produto)}
            >
              +
            </button>
            <button
              className="botao-item-carrinho"
              onClick={() => removeItem(produto.id)}
            >
              -
            </button>
          </div>
        </div>
        <p className="preco-final-item-carrinho">
          {(produto.preco * produto.quantidade).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
        <button
          className="botao-remover-item-carrinho"
          onClick={() => deleteItem(produto.id)}
        >
          remover
        </button>
      </div>
    </div>
  );
}
