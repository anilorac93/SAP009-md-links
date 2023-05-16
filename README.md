# Markdown Links

<div align="center">
  <br>
  <img align="center" alt="simbolo do git" height="40" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" />
  <img align="center" alt="simbolo do Javascript" height="40" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg">
  <img align="center" alt="simbolo do Jest" height="40" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" /> 
  <img  align="center" alt="simbolo do Node" height="40" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" />
  <br>
  <br>
</div>

## Resumo do projeto

Neste projeto foi criada uma ferramenta de linha de comando (CLI) assim como
a sua própria biblioteca (library) em Javascript.

## Instalação

O módulo é instalável através do comando:

    npm install md-links-cmas
       
## CLI (Interface de Linha de Comando)

Quando apenas entregamos o caminho do arquivo (caminho abaixo), o comportamento esperado é que ele devolva o caminho do arquivo, o nome e o link.

    md-links ./caminho-para-o-arquivo/arquivo.md

<br>

## Sobre as options: `--validate` e `--stats`

Ao passar a opção `--validate`, o módulo, através de uma requisição HTTP verifica se este link é válido e está funcionando:

    md-links ./caminho-do-arquivo/arquivo.md --validate

<br>

Já com a option `--stats` recebemos as estatísticas dos links, ou seja o número de links:

    md-links ./caminho-do-arquivo/arquivo.md --stats

 <br>

E inclusive para obter estatísticas que combinem os resultados de ambas as options `--stats` e `--validate`:
         
      md-links ./caminho-do-arquivo/arquivo.md --stats --validate
   
 <br>

## Testes

![testes](https://github.com/anilorac93/SAP009-md-links/assets/110473504/1e0cd22e-5827-4491-b7a6-a668c2e05dd5)
