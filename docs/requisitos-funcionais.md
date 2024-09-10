## Requisitos Funcionais - Projeto de Gerenciamento de Abrigo de Animais

Este documento especifica os requisitos funcionais que o sistema deve atender, detalhando tanto as funcionalidades esperadas quanto as restrições do sistema.

### 1. Desenvolvimento de API

#### 1.1. Cadastro de Animais
- **Deve Fazer:**
  - [ ] A API deve permitir o cadastro de novos **animais** com as seguintes informações obrigatórias:
    - Nome.
    - Espécie (cão, gato, ou outro).
    - Sexo.
    - Data de nascimento ou idade estimada.
    - Condição de saúde inicial.
    - Estado (disponível para adoção ou não).
  - [ ] O sistema deve gerar um identificador único para cada **animal**.

- **Não Deve Fazer:**
  - [ ] A API não deve permitir o cadastro de animais com dados incompletos ou inválidos.

#### 1.2. Gerenciamento de Adoções
- **Deve Fazer:**
  - [ ] A API deve permitir registrar uma **adoção**, incluindo:
    - Nome do adotante.
    - Animal adotado (identificador do animal).
    - Data da adoção.
    - Condições especiais (se houver).
  - [ ] O sistema deve validar as informações do adotante antes de concluir a adoção.
  - [ ] O sistema deve atualizar o estado do **animal** para "não disponível para adoção" após a adoção.

- **Não Deve Fazer:**
  - [ ] O sistema não deve permitir adoções de animais que já tenham sido adotados ou que não estejam disponíveis.

#### 1.3. Registro de Castrações
- **Deve Fazer:**
  - [ ] A API deve permitir o registro de **castrações** para cada animal, com as seguintes informações:
    - Data da castração.
    - Nome do veterinário responsável.
    - Condições pós-operatórias (se houver).
  - [ ] O sistema deve associar cada castração a um **animal** específico.

- **Não Deve Fazer:**
  - [ ] O sistema não deve permitir o registro de castrações sem a devida validação dos dados.

#### 1.4. Controle de Vacinas
- **Deve Fazer:**
  - [ ] A API deve permitir o registro de **vacinas** administradas aos animais, incluindo:
    - Data da vacinação.
    - Tipo de vacina aplicada.
    - Nome do veterinário responsável.
  - [ ] O sistema deve associar cada vacina a um **animal** específico.

- **Não Deve Fazer:**
  - [ ] O sistema não deve permitir a duplicação de registros de vacinação para o mesmo animal e tipo de vacina.

#### 1.5. Registro de Gastos
- **Deve Fazer:**
  - [ ] A API deve permitir o registro dos **gastos com ração**, incluindo:
    - Data da compra.
    - Quantidade de ração comprada.
    - Valor gasto.
  - [ ] O sistema deve permitir o registro de outros **gastos** associados ao abrigo (ex: medicamentos, manutenção).

- **Não Deve Fazer:**
  - [ ] O sistema não deve permitir o registro de gastos sem a devida descrição ou categoria.

#### 1.6. Registro de Doações
- **Deve Fazer:**
  - [ ] A API deve permitir o registro de **doações** feitas ao abrigo, com as seguintes informações:
    - Nome do doador.
    - Data da doação.
    - Tipo de doação (financeira ou materiais).
    - Valor ou itens doados.

- **Não Deve Fazer:**
  - [ ] O sistema não deve permitir o registro de doações sem informações completas sobre o doador ou a doação.

### 2. Arquitetura Hexagonal

#### 2.1. Componentes da Arquitetura
- **Deve Fazer:**
  - [ ] O sistema deve ser estruturado seguindo a arquitetura hexagonal, com separação clara entre:
    - **Portas**: Interfaces de entrada e saída do sistema.
    - **Adaptadores**: Implementações concretas para interagir com o mundo externo (banco de dados, APIs externas).
    - **Aplicação**: Lógica de negócio e regras de domínio.

- **Não Deve Fazer:**
  - [ ] O sistema não deve misturar lógica de aplicação com a lógica de persistência ou com o código de interação externa.

### 3. Banco de Dados

#### 3.1. Modelagem de Dados
- **Deve Fazer:**
  - [ ] O banco de dados deve suportar:
    - Tabelas para **animais**, **adoções**, **vacinas**, **castrações**, **gastos com ração**, e **doações**.
    - Relacionamentos adequados entre tabelas (ex.: um animal pode ter várias vacinas).

- **Não Deve Fazer:**
  - [ ] O banco de dados não deve permitir dados inconsistentes ou violações de integridade referencial.

#### 3.2. Operações de Dados
- **Deve Fazer:**
  - [ ] O sistema deve suportar operações CRUD (Criar, Ler, Atualizar, Deletar) para todas as entidades.

- **Não Deve Fazer:**
  - [ ] O sistema não deve permitir operações que possam comprometer a integridade dos dados (ex.: exclusão de registros sem validação).

### 4. Implementação de Testes Unitários

#### 4.1. Cobertura de Testes
- **Deve Fazer:**
  - [ ] Testes unitários devem cobrir:
    - Lógica de negócio para o cadastro de animais, adoções, vacinas, castrações, gastos e doações.
    - Validações e regras de negócio.

- **Não Deve Fazer:**
  - [ ] O sistema não deve ser implantado sem a cobertura mínima de testes unitários e de integração.

#### 4.2. Ferramentas de Testes
- **Deve Fazer:**
  - [ ] Utilizar ferramentas de testes como Jest (para Node.js) ou PyTest (para Python), conforme a stack escolhida.

- **Não Deve Fazer:**
  - [ ] O sistema não deve utilizar ferramentas de testes desatualizadas ou não compatíveis com o stack utilizado.

### 5. Deploy da Aplicação

#### 5.1. Ambiente de Deploy
- **Deve Fazer:**
  - [ ] A aplicação deve ser capaz de ser implantada em ambientes de produção, como:
    - Servidores em nuvem (AWS, Azure, Google Cloud).
    - Plataformas de PaaS (Heroku, Railway).

- **Não Deve Fazer:**
  - [ ] A aplicação não deve ser implantada em ambientes de produção sem testes e validações completas.

#### 5.2. Automação de Deploy
- **Deve Fazer:**
  - [ ] O processo de deploy deve ser automatizado utilizando ferramentas como:
    - CI/CD (Integração e Entrega Contínua), por exemplo, GitHub Actions, Jenkins, ou GitLab CI.

- **Não Deve Fazer:**
  - [ ] O sistema não deve ser implantado manualmente sem a automação adequada do processo de deploy.

---

Esse formato proporciona uma visão clara tanto das funcionalidades esperadas quanto das restrições, ajudando a garantir que o desenvolvimento e a manutenção do sistema estejam alinhados com as necessidades do projeto.
