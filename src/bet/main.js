const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

function validateInput(input, min = 1, max = 100) {
  const trimmed = input.trim();
  if (trimmed === '') {
    return { error: null, value: null }; // デフォルト値を使用
  }
  
  const num = parseInt(trimmed, 10);
  if (isNaN(num) || num < min || num > max) {
    return { error: `点数は${min}から${max}の間で入力してください`, value: null };
  }
  
  return { error: null, value: num };
}

function getRandomBetCount(min, max) {
  if (min > max) {
    return { error: '最小点数は最大点数以下にしてください', result: null };
  }
  
  const randomCount = Math.floor(Math.random() * (max - min + 1)) + min;
  return { error: null, result: `今回の買い目点数: ${randomCount}点` };
}

function main() {
  const rl = readline.createInterface({ input, output });
  
  let minBet = null;
  let maxBet = null;
  
  // 最小点数の入力
  rl.question('最小点数は？（デフォルト: 1）> ', (minInput) => {
    const { error: minError, value: minValue } = validateInput(minInput, 1, 100);
    
    if (minError) {
      console.log(minError);
      rl.close();
      return;
    }
    
    minBet = minValue || 1; // デフォルト値は1
    
    // 最大点数の入力
    rl.question('最大点数は？（デフォルト: 10）> ', (maxInput) => {
      const { error: maxError, value: maxValue } = validateInput(maxInput, minBet, 100);
      
      if (maxError) {
        console.log(maxError);
        rl.close();
        return;
      }
      
      maxBet = maxValue || 10; // デフォルト値は10
      
      // 最大点数が最小点数より小さい場合のチェック
      if (maxBet < minBet) {
        console.log('最大点数は最小点数以上にしてください');
        rl.close();
        return;
      }
      
      // ランダム点数選択
      const { error, result } = getRandomBetCount(minBet, maxBet);
      
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
