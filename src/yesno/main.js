const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

function getRandomYesNo() {
  const answers = ['Yes', 'No'];
  const randomIndex = Math.floor(Math.random() * answers.length);
  return answers[randomIndex];
}

function main() {
  const rl = readline.createInterface({ input, output });
  
  console.log('質問を心に浮かべてください');
  
  rl.question('（Enterキーを押してください）> ', () => {
    const answer = getRandomYesNo();
    console.log(`答え: ${answer}`);
    rl.close();
  });
}

module.exports = main;
