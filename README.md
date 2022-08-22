# 🚀 Backend Challenge - E-commerce API

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Bem-vindo(a) ao meu projeto do desafio Backend!

# 📖 Menu

- [Manual de Instalação](#manual)
- [Tarefas](#tasks)
- [Extras](#extras)
- [Rotas](#routes)
- [Diagrama ER (Entidade-Relacionamento)](#diagram)

<br />

<a id="manual"></a>

# 📔 Manual de Instalação

- Primeiro execute o comando `chmod +x entrypoint.sh` para dar permissão de execução no arquivo de script que está no diretório .docker;

- Após dar permissão ao arquivo entrypoint, execute o container docker por meio do comando `docker-compose up -d` no diretório .docker, onde está localizado o docker-compose.yaml.

<br />

<a id="tasks"></a>

# 📝 Tarefas

O desafio será implementar uma **API** de e-commerce para venda de camisetas, canecas e adesivos que deverá ter as seguintes funcionalidades:

- [x] Gerenciamento de produtos (criação, deleção, atualização)
- [x] Busca de produtos com paginação e com a possibilidade de utilização de filtros
- [x] Busca por de produto por id
- [x] Busca de produtos por categoria

Também seria muito legal se você também implementasse:

- [x] Gerenciamento de usuários (criação, deleção, atualização, leitura)
- [x] Geração de pedido de compras com produtos selecionados
- [x] Histórico de pedidos
- [x] Permitir filtrar pedidos gerados

<br />

<a id="extras"></a>

# 📋 Extras

- [x] Utilizar clean architecture
- [x] Utilizar docker
- [ ] Implementar o projeto utilizando SAP CAP
- [x] Testes unitários
- [ ] Testes de integração
- [ ] Testes de stress
- [ ] Testes e2e

<br />

<a id="routes"></a>

# 📝 Rotas

Caso tenha o Insomnia, você pode baixar e importar todas as rotas: [rotas](https://drive.google.com/file/d/15NrQLuGioePdoz0hTg2Yc6MjWPg-PEPe/view?usp=sharing)

- Produto

  - GET | FIND ALL - `/api/v1/products`: busca todos os produtos;
  - GET | FIND BY ID - `/api/v1/products/:id`: busca um produto por id;
  - GET | FIND MANY BY FILTER - `/api/v1/products/filters?category=value&title=value&page=1&limit=10`: busca produtos por fitro de categoria e título com possiblidade de paginação;
  - POST | SAVE - `/api/v1/products`: salva um produto;
  - PATCH | UPDATE BY ID - `/api/v1/products/:id`: atualiza um produto;
  - DEL | DELETE BY ID - `/api/v1/products/:id`: deleta um produto.

- Usuário

  - GET | FIND ALL - `/api/v1/users`: busca todos os usuários;
  - GET | FIND BY ID - `/api/v1/users/:id`: busca um usuário por id;
  - POST | SAVE - `/api/v1/users`: salva um usuário;
  - PATCH | UPDATE BY ID - `/api/v1/users/:id`: atualiza um usuário;
  - DEL | DELETE BY ID - `/api/v1/users/:id`: deleta um usuário.

- Pedido
  - GET | FIND ALL - `/api/v1/purchases`: busca todas as ordens de pedido;
  - GET | FIND HISTORY - `/api/v1/purchases/history/:id?category=value&title=value`: busca pedidos por usuário com posssiblidade de fitro de categoria e título;
  - POST | SAVE - `/api/v1/purchases`: salva um pedido.

<br />

<a id="diagram"></a>

# 📊 Diagrama Entidade-Relacionamento

![image](https://user-images.githubusercontent.com/59940855/185805457-47acdb92-1c19-4fff-a394-8f15dd048bf4.png)
