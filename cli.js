#!/usr/bin/env node
const chalk = require('chalk'); 
const mdLinks = require('./mdLink');

const pathFile = process.argv[2]; //retorna matriz com argumentos de cli passados ​​quando o node.js foi iniciado
const options = process.argv[3];

const messageStatus = {
  '200': 'OK!',
  '201': 'Novo recurso criado',
  '202': 'A requisição foi recebida mas nenhuma ação foi tomada sobre ela',
  '204': 'Não há conteúdo para enviar para esta solicitação',
  '400': 'O servidor não entendeu a requisição pois possivelmente está com uma sintaxe inválida',
  '401': 'Não autorizado, o cliente deve se autenticar para obter a resposta solicitada',
  '403': 'Proibido, o cliente não tem direitos de acesso ao conteúdo',
  '404': 'Não encontrado',
  '405': 'Método desativado',
  '407': 'Não autorizado, o cliente deve se autenticar para obter a resposta solicitada e a autenticação deve ser feita por um proxy',
  '500': 'O servidor encontrou uma situação com a qual não sabe lidar',
  '502': 'Falha de comunicação entre os servidores responsáveis por entregar o conteúdo que o usuário acessou pelo navegador de internet',
  '503': 'Serviço indisponível',
};

function searchLinks(element) {
    if (!element || !element.href) {
        return Promise.reject(new Error(`Elemento inválido ou não possui uma URL`));
    }

    return fetch(element.href)
        .then(response => {
            element.status = response.status;
            element.statusText = messageStatus[response.status.toString()] || response.statusText //pega resposta do status e tranforma em string
            return element;
        })
        .catch(error => {
            element.status = 'Elemento não encontrado';
            element.statusText = error.message;
            return element;
        });
};

function showStatistics(result) {
    const checkLink = [...new Set(result.map(element => element.href))];
    const receiveStatistics = {
        total: result.length, 
        unique: checkLink.length,
    };
     console.log(chalk.cyan('Total:'), receiveStatistics.total);
     console.log(chalk.green('Unique:'), receiveStatistics.unique);
};

function validationResult(element) {
    const statusColor = element.status >= 200 && element.status < 300 ? chalk.cyan : chalk.red;
    console.log(
    statusColor('\u2620'),
    chalk.cyan(element.file),
    chalk.white(element.href),
    statusColor(`${element.status} ${element.statusText}`),
    chalk.green(element.text)
  );
};

function failedStatistics(result) {
    const promise = result.map(element => searchLinks(element));
    
    Promise.all(promise)
        .then(linksArray => {
            const checkLink = [...new Set(linksArray.map(element => element.href))];
            const receiveStatistics = {
                total: linksArray.length,
                unique: checkLink.length,
                broken: linksArray.filter(element => element.status !== 200).length,
            };

            console.log(chalk.cyan('Total:'), receiveStatistics.total);
            console.log(chalk.green('Unique:'), receiveStatistics.unique);
            console.log(chalk.red('Broken:'), receiveStatistics.broken);
            })
        .catch(error => {
            console.error(error);
        });
};

function statisticsWithValidationOption() {
    mdLinks(pathFile)
    .then(result => {
        failedStatistics(result);
    })
    .catch(error => {
        console.log('Error');
        console.error(error);
    });
};

function handleValidatedOption() {
    mdLinks(pathFile)
    .then(result => {
      const promises = result.map(element => searchLinks(element));

      Promise.all(promises)
        .then(linksArray => {
            linksArray.forEach(element => {
                validationResult(element);
            });
        })
        .catch(error => {
            console.error(error);
        });
    })
    .catch(error => {
        console.log('Error');
        console.error(error);
    })  
};

function manipulateStatisticalOption() {
    mdLinks(pathFile)
    .then(result => {
        showStatistics(result);
    })
    .catch(error => {
        console.log('Error');
        console.error(error);
    }); 
};

if(options === '--stats' && process.argv.includes('--validate')) {
    statisticsWithValidationOption();
} else if(options === '--validate') {
    handleValidatedOption();
} else if(options === '--stats') {
    manipulateStatisticalOption();
} else {
    mdLinks(pathFile)
        .then(result => {
            result.forEach(element => {
                console.log(chalk.blue(element.file), chalk.green(element.text), chalk.white(element.href));
            });
        })
        .catch(error => {
            console.log('Error');
            console.error(error);
        }); 
}

        