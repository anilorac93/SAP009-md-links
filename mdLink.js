const fs = require('fs'); 
const chalk = require('chalk'); 
const fetch = require('node-fetch'); 
//const { error } = require('console');// APARECEU SOZINHO

function mdLinks(pathFile, options = {}) { 
    return new Promise((resolve, reject) => {
        const existingFile = fs.existsSync(pathFile); //verifica se o arquivo existe
        // const tamanhoArquivo = fs.statSync(pathFile).size; //stat irá trazer a informação sobre o arquivo
    
        if(!existingFile) {
            reject(chalk.green('\u2620') + '    ' + `O seguinte arquivo não existe: ${chalk.red.bold(pathFile)}`);
        } else {
            fs.readFile(pathFile, 'utf-8', (err, data) => { //dados: dados gerado na expressão da string
                if(err) {
                    reject(err);
                } else {
                    const linkRegex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
                    const searchLink = data.match(linkRegex) 

                    const linkFound = searchLink.map(link => { 
                        const removeLink = link.replace(/.$/, '').replace('[', ''); //O método replace() retorna uma nova string com algumas ou todas as correspondências de um padrão substituídas por um determinado caractere (ou caracteres)  
                        const dividir = removeLink.split(']('); 
                        const newObject = {
                            href: dividir[1], //(read.me)
                            text: dividir[0],
                            file: pathFile,
                        };
                        return newObject;
                    });

                    if(options.validate) {
                        const promises = linkFound.map(element => fetch(element)); //mandando informação para o promise
                        Promise.all(promises)
                            .then(linkArray => {
                                resolve(linkArray)
                            })
                            .catch(error => {
                                reject(error)
                            });
                        } else {
                        resolve(linkFound);
                    }
                }
            });
        }
    });
}

module.exports = mdLinks;