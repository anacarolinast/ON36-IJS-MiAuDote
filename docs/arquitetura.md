# Arquitetura do Sistema - Projeto de Gerenciamento de Abrigo de Animais MiAuDote

Este documento descreve a arquitetura do sistema, incluindo a modelagem das entidades, a estrutura da aplicação e orientações para a inclusão de fluxogramas e diagramas.


## 1. Visão Geral da Arquitetura

O sistema de gerenciamento de abrigo de animais é estruturado com base na arquitetura hexagonal, que separa claramente a lógica de aplicação da interação com o mundo externo. Isso inclui a camada de domínio, a camada de aplicação e a camada de infraestrutura.

## 2. Entidades do Sistema

### 2.1. Animais
- **Descrição:** Representa os aznimais que estão no abrigo.
- **Atributos:**
  - `id`: Identificador único do animal.
  - `nome`: Nome do animal.
  - `especie`: Espécie do animal (cão, gato, etc.).
  - `sexo`: Sexo do animal.
  - `data_nascimento`: Data de nascimento ou idade estimada.
  - `condicao_saude`: Condição de saúde inicial.
  - `estado_adocao`: Estado de disponibilidade para adoção.

### 2.2. Adoções
- **Descrição:** Representa as adoções realizadas.
- **Atributos:**
  - `id`: Identificador único da adoção.
  - `adotante_id`: Identificador do adotante.
  - `animal_id`: Identificador do animal adotado.
  - `data_adoção`: Data da adoção.
  - `condicoes_especiais`: Condições especiais associadas à adoção.
  - `status_adocao`: Registra se a adoção foi aprovada pelo abrigo.

### 2.3. Vacinas
- **Descrição:** Representa as vacinas administradas aos animais.
- **Atributos:**
  - `id`: Identificador único da vacina.
  - `animal_id`: Identificador do animal vacinado.
  - `data_vacinacao`: Data da vacinação.
  - `tipo_vacina`: Tipo de vacina aplicada.
  - `veterinario_id`: Identificador do veterinário responsável.
  - `gasto_id`: Identificador do gasto gerado.

### 2.4. Castrações
- **Descrição:** Representa as castrações realizadas.
- **Atributos:**
  - `id`: Identificador único da castração.
  - `animal_id`: Identificador do animal castrado.
  - `data_castracao`: Data da castração.
  - `veterinario_id`: Identificador do veterinário responsável.
  - `condicoes_pos`: Condições pós-operatórias.

### 2.5. Medicamentos
- **Descrição:** Representa gastos com medicamentos.
- **Atributos:**
  - `id`: Identificador único da medicação.
  - `animal_id`: Identificador do animal que necessitou da medicação.
  - `descricao`: Descrição da medicação.
  - `veterinario_id`: Identificador do veterinário responsável.
  - `gasto_id`: Identificador do gasto gerado.

### 2.5. Consumíveis
- **Descrição:** Representa gastos com itens consumíveis como: ração, areia para gato, etc.
- **Atributos:**
  - `id`: Identificador único da medicação.
  - `tipo_animal`: Tipo de animal que utiliza.
  - `descricao`: Descrição do consumível.
  - `gasto_id`: Identificador do gasto gerado.

### 2.6. Gastos
- **Descrição:** Representa os gastos do abrigo, como compra de ração, vacinas, castrações, etc. Nesta entidade, doações entram com valor negativo.
- **Atributos:**
  - `id`: Identificador único do gasto.
  - `data_gasto`: Data da compra.
  - `quantidade`: Quantidade de ração ou outros itens.
  - `valor`: Valor gasto.

### 2.7. Doações
- **Descrição:** Representa as doações feitas ao abrigo.
- **Atributos:**
  - `id`: Identificador único da doação.
  - `doador_id`: Nome do doador.
  - `data_doacao`: Data da doação.
  - `tipo_doacao`: Tipo de doação (financeira ou materiais).
  - `valor_estimado`: Valor ou itens doados.
  - `gasto_id`: Identificador do gasto.

### 2.8. Pessoas
- **Descrição:** Representa as pessoas atribuídas ao abrigo. São registrados todas as informações destas pessoas.
- **Atributos:**
  - `id`: Identificador único da pessoa.
  - `nome`: Nome da pessoa.
  - `endereco`: Endereço da pessoa.
  - `telefone`: Telefones da pessoa.
  - `email`: Email da pessoa.
  - `cpf`: cpf da pessoa.

### 2.9. Veterinário
- **Descrição:** Representa as informações referentes aos veterinários que prestaram serviços ao abrigo.
- **Atributos:**
  - `id`: Identificador único do veterinário.
  - `especialidade`: Especialidade de atuação do veterinário.
  - `registro_crmv`: Registro do conselho regional de medicina veterinária.
  - `pessoa_id`: Identificador de pessoa.

### 2.10. Adotante
- **Descrição:** Representa as informações referentes aos adotantes do abrigo.
- **Atributos:**
  - `id`: Identificador único do adotante.
  - `renda`: renda do adotante.
  - `condicao_entrevista`: condição da entrevista para a adoção do animal.
  - `pessoa_id`: Identificador de pessoa.

### 2.10. Doador
- **Descrição:** Representa as informações referentes aos doadores do abrigo.
- **Atributos:**
  - `id`: Identificador único do veterinário.
  - `tipo_doacao`: tipo de doação (valores, alimentos, medicamentos, etc).
  - `descricao`: descrição da doação.
  - `pessoa_id`: Identificador de pessoa.


## 3. Diagramas e Fluxogramas

### 3.1. Diagrama de Entidades e Relacionamentos (ERD)

- **Descrição:** Diagrama que mostra as entidades do sistema e seus relacionamentos.

<p align="center">
  <img src="docs\diagrams\diagrama-uml.jpg" width="200" alt="Nest Logo" /></a>
</p>

<!-- ### 3.2. Fluxograma de Processos

- **Descrição:** Fluxograma que ilustra o fluxo de processos, como o processo de adoção ou registro de um novo animal.
- **Orientação para Inserir:**
  - Crie o fluxograma utilizando ferramentas como [draw.io](https://www.draw.io) ou [Lucidchart](https://www.lucidchart.com).
  - Exporte o fluxograma como imagem (PNG, JPEG) ou PDF.
  - Insira o fluxograma no repositório com a seguinte sintaxe Markdown:

    ```markdown
    ![Fluxograma de Processos](path/to/fluxograma-processos.png)
    ``` -->

---

Este arquivo Markdown deve fornecer uma visão clara da arquitetura do sistema, incluindo a modelagem de entidades, o uso de diagramas e fluxogramas, e a estrutura geral do sistema.
