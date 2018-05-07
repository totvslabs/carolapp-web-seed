export function getPercentageChange(oldNumber, newNumber): number {
  if (oldNumber === 0) {
    return 100;
  }
  const result = newNumber - oldNumber;
  return roundTwoDecimals((result / oldNumber) * 100);
}

export function roundTwoDecimals(num) {
  return Math.round(num * 100) / 100;
}

export function numberPunctation(num: number) {
  return num.toLocaleString('pt-BR', {
    maximumFractionDigits: 2
  });
}

export function currencyPunctation(num: number) {
  if (num > 1000) {
    return abbreviateNumber(num);
  } else {
    return num.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
}

function abbreviateNumber(num, fixed = 0) {
  if (num === null) { return null; } // terminate early
  if (num === 0) { return '0'; } // terminate early
  const b = (num).toPrecision(2).split('e'), // get power
      k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
      c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3) ).toFixed(1 + fixed), // divide by power
      d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
      e = d + ['', ' mil', ' mi', ' bi', ' tri'][k]; // append power
  return e;
}
