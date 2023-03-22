import React from "react";
import Carrinho from "../carrinho/Carrinho";
import ItemCarrinho from "../item-carrinho/ItemCarrinho";
import ListaCarrinho from "../lista-carrinho/ListaCarrinho";
import Resumo from "../resumo/Resumo";
import type { Story } from "@ladle/react";
import { ProdutoCarrinho } from "../../types/Produto";
import { useCarrinho } from "../../contexts/CarrinhoContext";

const item: ProdutoCarrinho = {
  id: "1",
  nome: "Pizza",
  descricao: "hmmm",
  preco: 10,
  imagem: "",
  quantidade: 1,
};

export const MyItemCarrinho: Story = () => {

  return (<ItemCarrinho {...item}></ItemCarrinho>);
};
