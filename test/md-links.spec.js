const mdLinks = require('../mdLink.js');
// const fs = require('fs');

describe('mdLinks', () => {

  it('Deve devolver uma promisse', () => {
    const resultado = mdLinks('README.md')
    expect(resultado instanceof Promise).toBe(true)
  });

  it('Deve devolver o caso de erro', () => {
    const resultado = mdLinks('./arquivos/teste')
    expect(resultado instanceof Promise).toBe(false)
  });

 });