// 出馬数のバリデーションと3連単生成ロジック
const { shuffle } = require('./shuffle');

function validateAndGenerateTrifecta(input) {
  const num = parseInt(input.trim(), 10);
  if (isNaN(num) || num < 3) {
    return { error: '3以上の数字を入力してください。' };
  }
  const horses = Array.from({ length: num }, (_, i) => i + 1);
  const shuffled = shuffle(horses);
  return { result: `3連単: ${shuffled[0]} → ${shuffled[1]} → ${shuffled[2]}` };
}

module.exports = { validateAndGenerateTrifecta };
