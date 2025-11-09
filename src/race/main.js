const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

function validateInput(input) {
  const trimmed = input.trim();
  if (trimmed === '') {
    return { error: null, value: null }; // デフォルト値を使用
  }
  
  const num = parseInt(trimmed, 10);
  if (isNaN(num) || num < 1 || num > 12) {
    return { error: 'レース番号は1から12の間で入力してください', value: null };
  }
  
  return { error: null, value: num };
}

function getRandomRace(start, end) {
  if (start > end) {
    return { error: '開始レース番号は終了レース番号以下にしてください', result: null };
  }
  
  const randomRace = Math.floor(Math.random() * (end - start + 1)) + start;
  return { error: null, result: `今日賭けるレース: ${randomRace}R` };
}

function main() {
  const rl = readline.createInterface({ input, output });
  
  let startRace = null;
  let endRace = null;
  
  // 開始レースの入力
  rl.question('開始レース番号は？（デフォルト: 1）> ', (startInput) => {
    const { error: startError, value: startValue } = validateInput(startInput);
    
    if (startError) {
      console.log(startError);
      rl.close();
      return;
    }
    
    startRace = startValue || 1; // デフォルト値は1
    
    // 終了レースの入力
    rl.question('終了レース番号は？（デフォルト: 12）> ', (endInput) => {
      const { error: endError, value: endValue } = validateInput(endInput);
      
      if (endError) {
        console.log(endError);
        rl.close();
        return;
      }
      
      endRace = endValue || 12; // デフォルト値は12
      
      // ランダムレース選択
      const { error, result } = getRandomRace(startRace, endRace);
      
      if (error) {
        console.log(error);
      } else {
        console.log(result);
      }
      
      rl.close();
    });
  });
}

module.exports = main;