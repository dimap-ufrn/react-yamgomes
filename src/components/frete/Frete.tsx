import { useRef, useState } from "react";
import { useCarrinho } from "../../contexts/CarrinhoContext";

export type Endereço = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  unidade: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
};

export default function Frete() {
  const { getFrete, setFrete } = useCarrinho();

  const cepRef = useRef<HTMLInputElement>(null);
  const [conteudoEndereco, setConteudoEndereco] = useState("");
  const [hasCep, setHasCep] = useState<boolean>(false);

  async function buscaCep() {
    if (!cepRef.current) {
      setHasCep(false);
      return;
    }
    const cep = cepRef.current.value;
    if (cep.length !== 9) {
      setConteudoEndereco("CEP inválido");
      return;
    }
    const cepInfo = await fetch(
      `https://viacep.com.br/ws/${cep.replace("-", "")}/json/`
    ).then((res) => res.json());
    if (cepInfo.erro) {
      setConteudoEndereco("CEP não encontrado");
      return;
    }
    setConteudoEndereco(`${cepInfo.localidade}, ${cepInfo.uf}`);
    if (cepInfo.uf === "RN") {
      setFrete(10.9);
    } else {
      setFrete(15.9);
    }
  }

  return (
    <div style={{ margin: "10px" }}>
      <div>
        <span style={{ marginRight: "10px" }}>Frete:</span>
        <input
          ref={cepRef}
          type="text"
          name="cep"
          style={{ maxWidth: "10em", marginRight: "10px" }}
          maxLength={9}
          placeholder="CEP Ex.: 00000-000"
          onChange={(e) => {
            e.target.value = e.target.value
              .replace(/\D/g, "")
              .replace(/(\d{5})(\d)/, "$1-$2");
            if (e.target.value.length === 9) {
              setHasCep(true);
            } else {
              setHasCep(false);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              buscaCep();
            }
          }}
        />
        <button
          disabled={!hasCep}
          onClick={() => {
            buscaCep();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
            width="1em"
            height="1em"
          >
            <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
          </svg>
        </button>
      </div>
      <div>
        <span>{conteudoEndereco}</span>
      </div>
      <div>
        <span>
          {getFrete().toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>
    </div>
  );
}
