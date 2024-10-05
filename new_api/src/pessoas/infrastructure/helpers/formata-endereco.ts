export function formatarEndereco(data) {
    const { logradouro, bairro, cep, localidade, uf } = data;
  
    const endereco = `${logradouro}, ${bairro}. CEP: ${cep}. ${localidade} - ${uf}.`;
  
    return endereco;
  }