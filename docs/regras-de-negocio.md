## Regras de Negócio - Projeto de Gerenciamento de Abrigo de Animais

Este documento descreve as principais regras de negócio para o software de gerenciamento do abrigo de animais. As regras foram desenvolvidas para garantir a integridade dos dados e o fluxo correto das operações.

### Regras Gerais

- [ ] Um **animal** só pode ser registrado com um número de identificação único.
- [ ] Um **animal** pode ser classificado como: cão, gato, ou outro.
- [ ] Um **animal** deve ter seu estado de saúde atualizado sempre que uma consulta veterinária for realizada.
- [ ] Um **animal** só pode ser marcado como disponível para adoção se passar por avaliação comportamental.
- [ ] A idade do **animal** deve ser estimada caso não seja conhecida.
- [ ] O sistema deve permitir o registro de castrações realizadas em cada animal, incluindo:
  - [ ] Data da castração.
  - [ ] Nome do veterinário responsável.
  - [ ] Condições pós-operatórias (se houver).

### Regras de Adoção

- [ ] Um **adotante** deve preencher um formulário contendo:
  - [ ] Nome completo.
  - [ ] Documento de identificação válido (CPF).
  - [ ] Comprovante de residência.
  - [ ] Prova de renda.
- [ ] Um **adotante** não pode adotar mais de 3 animais em um intervalo de 12 meses.
- [ ] Um **adotante** só pode adotar se passar por entrevista com um responsável pelo abrigo.
- [ ] A adoção deve ser registrada no sistema com as seguintes informações:
  - [ ] Nome do adotante.
  - [ ] Animal adotado.
  - [ ] Data da adoção.
  - [ ] Condições especiais (caso aplicável).

### Regras de Saúde e Bem-estar dos Animais

- [ ] Todo **animal** deve passar por uma avaliação veterinária no momento da entrada no abrigo.
- [ ] O histórico de vacinação do **animal** deve ser mantido atualizado no sistema, incluindo:
  - [ ] Data da vacinação.
  - [ ] Tipo de vacina aplicada.
  - [ ] Nome do veterinário responsável.
- [ ] O abrigo deve realizar uma inspeção de bem-estar dos animais a cada 3 meses.
- [ ] O sistema deve permitir o registro de **castrações** e seu histórico para cada animal.

### Regras de Controle de Gastos e Doações

- [ ] O sistema deve permitir o registro dos **gastos com ração**, incluindo:
  - [ ] Data da compra.
  - [ ] Quantidade de ração comprada.
  - [ ] Valor gasto.
- [ ] O sistema deve permitir o registro de **doações feitas ao abrigo**, incluindo:
  - [ ] Nome do doador.
  - [ ] Data da doação.
  - [ ] Tipo de doação (financeira ou materiais).
  - [ ] Valor ou itens doados.


### Boas práticas

- [ ] O sistema deve emitir alertas quando uma regra de negócio for violada.


### Implementação

A desenvolvedora deve garantir que as regras de negócio sejam implementadas no código e que os testes automatizados cubram cada cenário de regra de negócio.
