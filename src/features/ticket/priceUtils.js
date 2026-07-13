// '13,000원' 같은 표시용 가격 문자열에서 숫자만 뽑아낸다.
export function parseWon(text) {
  if (typeof text === 'number') return text;
  if (!text) return 0;
  return Number(String(text).replace(/[^0-9]/g, '')) || 0;
}

export function formatWon(amount) {
  return `${amount.toLocaleString()}원`;
}
