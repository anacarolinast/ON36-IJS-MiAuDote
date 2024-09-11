## Regras de Negócio - Projeto de Gerenciamento de Abrigo de Animais MiAuDote

Este documento descreve as principais regras de negócio para o software de gerenciamento do abrigo de animais. As regras foram desenvolvidas para garantir a integridade dos dados e o fluxo correto das operações.

### Regras Gerais

- [x] Um **animal** só pode ser registrado com um número de identificação único.
- [x] Um **animal** pode ser classificado como: cão, gato, ou outro.
- [x] A idade do **animal** deve ser estimada caso não seja conhecida.
- [x] O sistema deve permitir o registro de castrações realizadas em cada animal, incluindo:
  - [x] Data da castração.
  - [x] Nome do veterinário responsável.
  - [x] Condições pós-operatórias (se houver).

### Regras de Adoção

- [x] Um **adotante** deve preencher um formulário contendo:
  - [x] Nome completo.
  - [x] Documento de identificação válido (CPF).
  - [x] Comprovante de residência.
  - [x] Prova de renda.
- [x] Um **adotante** não pode adotar mais de 3 animais em um intervalo de 12 meses.
- [x] Um **adotante** só pode adotar se passar por entrevista com um responsável pelo abrigo.
- [x] A adoção deve ser registrada no sistema com as seguintes informações:
  - [x] Nome do adotante.
  - [x] Animal adotado.
  - [x] Data da adoção.
  - [x] Condições especiais (caso aplicável).

### Regras de Saúde e Bem-estar dos Animais

- [x] Todo **animal** deve passar por uma avaliação veterinária no momento da entrada no abrigo.
- [x] O histórico de vacinação do **animal** deve ser mantido atualizado no sistema, incluindo:
  - [x] Data da vacinação.
  - [x] Tipo de vacina aplicada.
  - [x] Nome do veterinário responsável.
- [x] O sistema deve permitir o registro de **castrações** e seu histórico para cada animal.

### Regras de Controle de Gastos e Doações

- [x] O sistema deve permitir o registro dos **gastos com consumíveis**, incluindo:
  - [x] Data da compra.
  - [x] Quantidade comprada.
  - [x] Valor gasto.
- [x] O sistema deve permitir o registro de **doações feitas ao abrigo**, incluindo:
  - [x] Nome do doador.
  - [x] Data da doação.
  - [x] Tipo de doação (financeira ou materiais).
  - [x] Valor ou itens doados.


### Boas práticas

- [x] O sistema deve emitir alertas quando uma regra de negócio for violada.


### Implementação

A desenvolvedora deve garantir que as regras de negócio sejam implementadas no código e que os testes automatizados cubram cada cenário de regra de negócio.
