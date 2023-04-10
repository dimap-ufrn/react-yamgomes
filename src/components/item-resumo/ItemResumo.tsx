import "./ItemResumo.css"

export default function ItemResumo({ texto = "", valor = 0 }) {
  return (
    <div className="item-resumo">
      <span>{texto}</span>
      <span>{valor.toLocaleString("pt-BR", {style: 'currency', currency:"BRL"})}</span>
    </div>
  );
}
