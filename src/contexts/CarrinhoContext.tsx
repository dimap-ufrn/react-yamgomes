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
  getFrete: () => number;
  setFrete: (frete: number) => void;
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
      const novoCarrinho = [...carrinhoItens];
      novoCarrinho[index].quantidade++;
      setCarrinhoItems(novoCarrinho);
    }
  };

  const removeItem = (id: string) => {
    const index = carrinhoItens.findIndex((item) => item.id === id);
    if (index > -1) {
      if (carrinhoItens[index].quantidade > 1) {
        const novoCarrinho = [...carrinhoItens];
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
        "Sabonete Royal Jelly",
        "Kit de cinco sabonetes Royal Jelly para uma pele mais macia e bem nutrida.",
        29.99,
        "https://www.jafra.com.br/wp-content/uploads/2019/04/16088_Royal-Jelly-Sabonetes.jpg"
      ),
      new ProdutoCarrinho(
        "2",
        "S.O.S. Cachos Salon Line",
        "Conjunto S.O.S. Cachos + Poderosos da Salon Line Para você ondulada, cacheada e crespa manter o cabelo bonito e saudável na correria do dia a dia.",
        93.9,
        "https://www.salonline.com.br/ccstore/v1/images/?source=/file/v6258473197814921107/products/43169_at.jpg"
      ),
      new ProdutoCarrinho(
        "3",
        "Skala Camomila Hidratante Corporal",
        "Esse creminho maravilhoso faz com que sua pele fique bem macia, hidratada, sedosa, envolvente e perfumada.",
        10.9,
        "https://www.perfumariasumire.com.br/media/catalog/product/cache/baa3aaf16c708939a78d2263dd7e0e67/l/o/lo_o-hidratante-corporal-skala-camomila-400ml_.jpg"
      ),
      new ProdutoCarrinho(
        "4",
        "Depil Bella Cera Depilatória",
        "A linha profissional de ceras quente alto rendimento depil bella possui composição com ativos especiais, em uma formulação diferenciada. Com rápida secagem, elasticidade superior e aderência perfeita, remove os pelos com menos aplicações, resultando numa depilação eficaz e com maior rendimento.",
        20,
        "https://www.perfumariasumire.com.br/media/catalog/product/cache/baa3aaf16c708939a78d2263dd7e0e67/c/e/cera_quente_depilatoria_depil_bella_propolis_400g.jpg"
      ),
    ];
    setCarrinhoItems(produtos);
  };

  const [frete, setFrete] = useState(0);

  const getFrete = () => {
    return frete;
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
        getFrete,
        setFrete,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}
