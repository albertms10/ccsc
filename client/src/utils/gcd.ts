// Source: https://www.w3resource.com/javascript-exercises/javascript-math-exercise-9.php

export default (...numbers: number[]): number | null => {
  if (numbers.length < 1) return null;

  let a = numbers[0];

  for (let i = 1; i < numbers.length; i++) a = gcdTwoNumbers(a, numbers[i]);

  return a;
};

const gcdTwoNumbers = (x: number, y: number): number => {
  x = Math.abs(x);
  y = Math.abs(y);

  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }

  return x;
};
