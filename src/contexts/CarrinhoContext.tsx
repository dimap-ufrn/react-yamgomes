import { ReactNode, createContext, useContext, useState } from "react";
import { ProdutoCarrinho } from "../types/Produto";

type CarrinhoProviderProps = {
  children: ReactNode;
};

const CarrinhoContext = createContext({} as CarrinhoContext);

type CarrinhoContext = {
  addItem: (produto: ProdutoCarrinho) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  getCarrinhoItems: () => Array<ProdutoCarrinho>;
  getCarrinhoTotal: () => number;
  deleteItem: (id: string) => void;
  fillCarrinho: () => void;
  quantidadeItens: number;
};

export function useCarrinho() {
  return useContext(CarrinhoContext);
}

export function CarrinhoProvider({ children }: CarrinhoProviderProps) {
  const [carrinhoItens, setCarrinhoItems] = useState<Array<ProdutoCarrinho>>(
    []
  );
  const quantidadeItens = carrinhoItens.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  const addItem = (produto: ProdutoCarrinho) => {
    const index = carrinhoItens.findIndex((item) => item.id === produto.id);
    if (index > -1) {
      const novoCarrinho = [...carrinhoItens]
      novoCarrinho[index].quantidade++;
      setCarrinhoItems(novoCarrinho);
    }
  };

  const removeItem = (id: string) => {
    const index = carrinhoItens.findIndex((item) => item.id === id);
    if (index > -1) {
      if (carrinhoItens[index].quantidade > 1) {
        const novoCarrinho = [...carrinhoItens]
        novoCarrinho[index].quantidade--;
        setCarrinhoItems(novoCarrinho);
      } else {
        setCarrinhoItems(carrinhoItens.filter((item) => item.id !== id));
      }
    }
  };

  const clear = () => {
    setCarrinhoItems([]);
  };

  const getCarrinhoItems = () => {
    return carrinhoItens;
  };

  const getCarrinhoTotal = () => {
    return carrinhoItens.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0
    );
  };

  const deleteItem = (id: string) => {
    setCarrinhoItems(carrinhoItens.filter((item) => item.id !== id));
  };

  const fillCarrinho = () => {
    const produtos = [
      new ProdutoCarrinho(
        "1",
        "Produto 1",
        "Descrição do produto 1",
        10,
        "https://picsum.photos/200/300"
      ),
      new ProdutoCarrinho(
        "2",
        "Produto 2",
        "Descrição do produto 2",
        20,
        "https://picsum.photos/200/300"
      ),
      new ProdutoCarrinho(
        "3",
        "Produto 3",
        "Descrição do produto 3",
        30,
        "https://picsum.photos/200/300"
      ),
      new ProdutoCarrinho(
        "4",
        "Produto 4",
        "Descrição do produto 4",
        40,
        "https://picsum.photos/200/300"
      ),
      new ProdutoCarrinho(
        "5",
        "Produto 5",
        "Descrição do produto 5",
        50,
        "https://picsum.photos/200/300"
      ),
      new ProdutoCarrinho(
        "6",
        "Produto 6",
        "Descrição do produto 6",
        60,
        "https://picsum.photos/200/300"
      ),
    ];
    setCarrinhoItems(produtos);
  };

  return (
    <CarrinhoContext.Provider
      value={{
        addItem,
        clear,
        getCarrinhoItems,
        getCarrinhoTotal,
        removeItem,
        deleteItem,
        fillCarrinho,
        quantidadeItens,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}
