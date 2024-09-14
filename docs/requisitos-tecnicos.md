## Requisitos Funcionais - Projeto de Gerenciamento de Abrigo de Animais MiAuDote

Este documento detalha os requisitos funcionais que o sistema deverá atender. Esses requisitos definem como o sistema deve se comportar em termos de funcionalidade.

### 1. Desenvolvimento de API

#### 1.1. Cadastro de Animais
- [x] A API deve permitir o cadastro de novos **animais** com os seguintes dados obrigatórios:
  - Nome.
  - Espécie (cão, gato, ou outro).
  - Sexo.
  - Data de nascimento ou idade estimada.
  - Condição de saúde inicial.
  - Estado (disponível para adoção ou não).

#### 1.2. Gerenciamento de Adoções
- [x] A API deve permitir registrar uma **adoção**, incluindo:
  - Nome do adotante.
  - Animal adotado.
  - Data da adoção.
  - Condições especiais (se houver).

#### 1.3. Registro de Castrações
- [x] A API deve permitir o registro de **castrações**, com:
  - Data da castração.
  - Nome do veterinário responsável.
  - Condições pós-operatórias (se houver).

#### 1.4. Controle de Vacinas
- [x] A API deve permitir o registro de **vacinas**, com:
  - Data da vacinação.
  - Tipo de vacina aplicada.
  - Nome do veterinário responsável.

#### 1.5. Registro de Gastos
- [x] A API deve permitir o registro dos **gastos com ração**, incluindo:
  - Data da compra.
  - Quantidade de ração comprada.
  - Valor gasto.

#### 1.6. Registro de Doações
- [x] A API deve permitir o registro de **doações**, com:
  - Nome do doador.
  - Data da doação.
  - Tipo de doação (financeira ou materiais).
  - Valor ou itens doados.

### 2. Arquitetura Hexagonal

#### 2.1. Componentes da Arquitetura
- [x] O sistema deve ser estruturado seguindo a arquitetura hexagonal, com separação clara entre:
  - **Portas**: Interfaces de entrada e saída do sistema.
  - **Adaptadores**: Implementações concretas para interagir com o mundo externo (banco de dados, APIs externas).
  - **Aplicação**: Lógica de negócio e regras de domínio.

### 3. Banco de Dados

#### 3.1. Modelagem de Dados
- [x] O banco de dados deve suportar:
  - Tabelas para **animais**, **adoções**, **vacinas**, **castrações**, **gastos**, e **doações**.
  - Relacionamentos adequados entre tabelas (ex.: um animal pode ter várias vacinas).

#### 3.2. Operações de Dados
- [x] O sistema deve suportar operações CRUD (Criar, Ler, Atualizar, Deletar) para todas as entidades.

### 4. Implementação de Testes Unitários

#### 4.1. Cobertura de Testes
- [x] Testes unitários devem cobrir:
  - Lógica de negócio para o cadastro de animais, adoções, vacinas, castrações, gastos e doações.
  - Validações e regras de negócio.
  
#### 4.2. Ferramentas de Testes
- [x] Utilizar ferramentas de testes como Jest (para Node.js) ou PyTest (para Python), conforme a stack escolhida.

### 5. Deploy da Aplicação

#### 5.1. Ambiente de Deploy
- [x] A aplicação deve ser capaz de ser implantada em ambientes de produção, como:
  - Servidores em nuvem (AWS, Azure, Google Cloud).
  - Plataformas de PaaS (Heroku, Railway).

#### 5.2. Automação de Deploy
- [x] O processo de deploy deve ser automatizado utilizando ferramentas como:
  - CI/CD (Integração e Entrega Contínua), por exemplo, GitHub Actions, Jenkins, ou GitLab CI.
