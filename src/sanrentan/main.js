
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const { validateAndGenerateTrifecta } = require('./horseLogic');

function main() {
  const rl = readline.createInterface({ input, output });
  rl.setPrompt('出馬数は？ > ');
  rl.prompt();
  rl.on('line', (input) => {
    const { error, result } = validateAndGenerateTrifecta(input);
    if (error) {
      console.log(error);
      rl.prompt();
      return;
    }
    console.log(result);
    rl.close();
  });
}

module.exports = main;
