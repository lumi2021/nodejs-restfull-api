# Node.js RESTfull API
[(pt-br) clique aqui para pular para o conteúdo em português](#api-restfull-em-nodejs)

# (en) Sumary

Complete RESTfull API developed for the Trackfy selective proccess.
The API is developed in typescript with less dependencies possible (is it even possible with node?).

**The project includes:**
- Modular structure with dependence injection
- Input data validation
- Error handling with HTTP responses

All code comments, part of the member names and the rest of this README
are written in portuguese to have sure there will be no problems with the code review.

# API RESTfull em Node.js

API RESTfull completa desenvolvida para o processo seletivo da Trackfy.
A API é desenvolvida em typescript e foca em usar o mínimo possível de dependências externas.

**O projeto inclui:**
- Estrutura modular com injeção de dependência
- Validação de dados de entrada
- Tratamento de erros com respostas HTTP

## Guia de execução

**usando tsc + node:**
- clone o repositório;
- abra o terminal dentro do diretório do projeto;
- execute `tsc`;
- execute `node dist/main.js`

**usando ts-node:**
- clone o repositório;
- abra o terminal dentro do diretório do projeto;
- execute `npx ts-node src/main.ts`

## Processo de desenvolvimento

O desenvolvimento começou dia 16 de setembro, no mesmo dia em que recebi as instruções.
Mesmo com um praso mais curto, o projeto não se mostrou um desafio, visto que eu já tive
experiência com processos maiores e mais exigentes. Admito que foi muito interessante tentar
construir um modelo de software que eu aprendi em C# em uma linguagem tão diferente como o
typescript.

Devido ao tempo curto e a falta de comunicação com qualquer orientador, eu preferi seguir
um design mais literal do que foi apresentado no documento de instrução, usando a base que
eu tenho sobre os serviços da empresa e o possível contexto do programa. Visto também que
a interface da API foi planejada em um modelo de design inside-out, procurei fazer os endpoints
retornarem dados gerais e mais genéricos, de forma que um frontend possa manipular da forma que
preferir. Isso também implica que, em certos casos, talvez seja necessário fazer mais de uma
requisição para obter um conjunto de dados mais amplo, mas acredito não ser problema visto que
nada do tipo foi solicitado.

Todos os endpoints foram testados manualmente usando postman, visto que devido ao tempo não pude
tentar automatizar o processo.


## Decisões técnicas

**Modularidade:** \
Como um dos requisitos do teste, a extrutura da API é completamente modular,
seguindo os principais padrões de design do mercado.
A API é dividida em componentes de rota, controladores, serviços e repositório,
sendo conectados através de ijeção de dependência. A declaração e implementação
dos componentes são separadas, permitindo modificações, incrementação e refatoração
independente.

**Validação de dados:** \
Validação dos dados é um problema em qualquer API, mas ter que assegurar isso em
uma linguagem como typescript é um desafio adicional, visto que a tipagem é garantida
apenas em tempo de compilação. Devido a isso, preferi optar por redundância, fazendo
verificações dos valores de parâmetros sempre que possível.

**Tratamento de erros:** \
É importante que a API sempre retorne erros legiveis para que o cliente saiba tratar
a dependência faltante. Devido a modularidade, preferi deixar qualquer coisa relacionada
a requisição no escopo do controlador e usar `throw` para retornar erros internos.
Erros esses que são retornados através de estruturas para assegurar seus tipos. \
Usando blocos `try...catch` o controlador decide a melhor maneira de retornar o erro,
geralmente com um status code adequado e um pequeno objeto contendo uma mensagem de erro
legivel e, algumas vezes, uma mensagem que pode ser direcionada ao usuário.

**Banco de dados:** \
Para simplificação do desenvolvimento, o banco de dados é emulado no componente
interno do repositório. Pela natureza modular do sistema, não seria
necessário muito esforço para incluir um componente específico para
se conectar a um banco de dados real.


## Sujesstões de melhoria

Honestamente não vejo muito o que se melhorar na arquitetura do projeto, visto que segue
um bom padrão de design. 

Alguns recursos podem ser substituidos por dependências externas, o que eu procurei não
fazer por não ter tanto costume com o ecocistema muitas vezes perigoso dos pacotes NPM.

Melhorias menores incluem:

- Implementar verificação de CORS;
- Adicionar rotinas para higienização de dados caso bancos de dados SQL sejam integrados;
- Implementar o registro de presença usando websockets, visto que são um pouco mais 
rápidos e leves que http.
