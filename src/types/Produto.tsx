export class Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;

  constructor(id:string = "",nome: string = "", descricao: string = "", preco: number = 0, imagem: string = "") {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.preco = preco;
    this.imagem = imagem;
  }
}

export class ProdutoCarrinho extends Produto {
  quantidade: number;

  constructor(id:string = "",nome: string = "", descricao: string = "", preco: number = 0, imagem: string = "", quantidade: number = 1) {
    super(id, nome, descricao, preco, imagem);
    this.quantidade = quantidade;
  }
}