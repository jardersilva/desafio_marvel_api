Esta é uma aplicação [Next.js](https://nextjs.org/) feita com [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Nesta aplicação é possivel consumir a API restFull da marvel onde nela obtemos as informações de revistas em quadrinhos

## Fluxo de uso

* O web app contem uma tela index onde nela e possivel ver os comics da Marvel podem realizar um filtro usando o titulo como parametro de consulta
* Nos cards no qual mostra o resultado da consulta a API é possivel executar algumas ações, visitar detalhes do comic, ou favorita-lo
* No appbar e possivel acessar a outra pagina disponivel na aplicação, que é a pagina de favoritos, nela listará os  comics marcados como favorito, podendo também remove-lo.

## Iniciando o projeto

Primeiro, clone o repositorio:

```bash
git clone https://github.com/jardersilva/desafio_marvel_api.git
```
Depois  instale as dependências da aplicação:

```bash
npm install
# ou
yarn install
```
Em seguida execute a aplicação:
```bash
npm run dev
# ou
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu browser para ver a aplicação rodando


## Estrutura do projeto

Além da estrutura padrão do nextJS o projeto foi organizado da forma padrão com o destaque explicativo das pastas abaixo:

    assets/ # pasta com recursos visuais como por exemplo imagens

    components/  # pasta com componentes desenvolvido no projeto
       Cards.tsx # Componente que mostra as informações do comics marvel
	   Header.tsx # Componente da toolbar ou appbar
	   Loading.tsx # Componente do efeito de loading enquanto e feita a requisição
       NoConection.tsx #Componente para informar que o usuário está sem acesso a internet
	   SearchBar.tsx #Componente da barra de consulta da aplicação

    styles/  # Pasta com as estilizações da aplicação com os arquivos .css

    utilites/
       api.tsx  #Responsável por montar uma conexão com a api usando o axios

## Bibliotecas utilizadas 

* Axios -  oferece a capacidade de aproveitar o async e await do JavaScript para um código assíncrono mais legível. Também é possível interceptar e cancelar solicitações, e existe uma proteção integrada do lado do cliente contra a falsificação de solicitações entre sites.

* Material-UI (MUI React) - É  uma das populares bibliotecas de componentes React. Ele segue as diretrizes, componentes e ferramentas de material design do Google para tornar os aplicativos da web mais rápidos e agiliza o processo de desenvolvimento da aplicação.