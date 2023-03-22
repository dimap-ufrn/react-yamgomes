import ListaCarrinho from '../lista-carrinho/ListaCarrinho'
import Resumo from '../resumo/Resumo'
import './Carrinho.css'

export default function Carrinho() {
  return (
    <div className='carrinho'>
      <ListaCarrinho></ListaCarrinho>
      <Resumo></Resumo>
    </div>
  )
}
