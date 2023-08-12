const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function readAndProcessFile(filePath) {
  const start = Date.now();
  let sumOfNumbers = 0;
  let textLineCount = 0;

  const fileStream = fs.createReadStream(filePath, 'utf-8');

  fileStream.on('data', chunk => {
    const lines = chunk.split('\n');
    lines.forEach(line => {
      if (/^\d+$/.test(line)) {
        sumOfNumbers += parseInt(line);
      } else {
        textLineCount++;
      }
    });
  });

  fileStream.on('end', () => {
    const end = Date.now();
    const executionTime = (end - start) / 1000;

    console.log('Resumo:');
    console.log(`\nSoma dos números: ${sumOfNumbers}`);
    console.log(`Linhas com texto: ${textLineCount}`);
    console.log(`Tempo de execução: ${executionTime} segundos`);

    rl.question('Deseja executar novamente? (S/N): ', answer => {
      if (answer.toLowerCase() === 's') {
        rl.close();
        startApp();
      } else {
        rl.close();
      }
    });
  });
}

function startApp() {
  rl.question('Digite o caminho do arquivo txt: ', filePath => {
    const absoluteFilePath = path.resolve(filePath);
    readAndProcessFile(absoluteFilePath);
  });
}

startApp();