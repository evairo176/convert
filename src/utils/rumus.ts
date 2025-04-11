// utils.ts

export const convertSentenceToNumber = (input: string): string =>
  [...input]
    .map((char) => {
      if (char === " ") return "0";

      if (/[A-Z]/.test(char)) {
        if (char === "A") return "0";
        if ("BCD".includes(char)) return "1";
        if (char === "E") return "2";
        if ("FGH".includes(char)) return "3";
        if (char === "I") return "4";
        if ("JKLMN".includes(char)) return "5";
        if (char === "O") return "6";
        if ("PQRST".includes(char)) return "7";
        if (char === "U") return "8";
        if ("VWXYZ".includes(char)) return "9";
      }

      if (/[a-z]/.test(char)) {
        if (char === "a") return "9";
        if ("bcd".includes(char)) return "8";
        if (char === "e") return "7";
        if ("fgh".includes(char)) return "6";
        if (char === "i") return "5";
        if ("jklmn".includes(char)) return "4";
        if (char === "o") return "3";
        if ("pqrst".includes(char)) return "2";
        if (char === "u") return "1";
        if ("vwxyz".includes(char)) return "0";
      }

      return "";
    })
    .join("");

export const alternateSum = (numbers: string): number => {
  return numbers
    .split("")
    .map(Number)
    .reduce(
      (acc, num, idx) => acc + (idx === 0 || idx % 2 === 1 ? num : -num),
      0
    );
};

export const formatExpression = (numbers: string): string =>
  numbers
    .split("")
    .map((num, idx) => {
      if (idx === 0) return num;
      return idx % 2 === 1 ? `+ ${num}` : `- ${num}`;
    })
    .join(" ");

export const convertToLetters = (num: number): string => {
  const abs = Math.abs(num);

  const breakdown: number[] = [];
  let total = 0;
  let next = 0;

  while (total < abs) {
    if (total + next <= abs) {
      breakdown.push(next);
      total += next;
    }
    next = (next + 1) % 10;
  }

  const letterMap = [
    "A", // 0
    "B", // 1 (B–D)
    "E", // 2
    "F", // 3 (F–H)
    "I", // 4
    "J", // 5 (J–N)
    "O", // 6
    "P", // 7 (P–T)
    "U", // 8
    "V", // 9 (V–Z)
  ];

  return breakdown.map((n) => letterMap[n]).join("");
};

export const getBreakdownExplanation = (num: number): string => {
  const abs = Math.abs(num);
  let total = 0;
  let current = 0;
  const parts: number[] = [];

  while (total < abs) {
    if (total + current <= abs) {
      parts.push(current);
      total += current;
    }
    current = (current + 1) % 10;
  }

  return parts.join(" + ");
};

export const getNumberLine = (num: number): string => {
  const abs = Math.abs(num);
  let total = 0;
  let current = 0;
  const numbers: number[] = [];

  while (total < abs) {
    if (total + current <= abs) {
      numbers.push(current);
      total += current;
    }
    current = (current + 1) % 10;
  }

  return numbers.join(" ");
};

const letterToNumber = (char: string): number => {
  const map: Record<string, number> = {
    A: 0,
    B: 1,
    C: 1,
    D: 1,
    E: 2,
    F: 3,
    G: 3,
    H: 3,
    I: 4,
    J: 5,
    K: 5,
    L: 5,
    M: 5,
    N: 5,
    O: 6,
    P: 7,
    Q: 7,
    R: 7,
    S: 7,
    T: 7,
    U: 8,
    V: 9,
    W: 9,
    X: 9,
    Y: 9,
    Z: 9,
  };
  return map[char.toUpperCase()] ?? 0;
};

// const reverseMap: Record<number, string> = {
//   0: "A",
//   1: "B",
//   2: "E",
//   3: "F",
//   4: "I",
//   5: "J",
//   6: "O",
//   7: "P",
//   8: "U",
//   9: "V",
// };

const convertToLetters_k = (num: number): string => {
  const map = ["A", "B", "E", "F", "I", "J", "O", "P", "U", "V"];
  const breakdown: number[] = [];

  let current = 0;
  let sum = 0;

  // Loop hingga mendekati num (tanpa melebihi)
  while (sum + current <= num) {
    breakdown.push(current);
    sum += current;
    current++;
  }

  // Tambah 0 agar panjang cukup
  breakdown.push(0);

  // Sisa setelah penjumlahan awal
  // const remaining = num - sum;

  // Tambahkan 1 sebanyak remaining (asal total 9 elemen)
  for (let i = 0; breakdown.length < 9; i++) {
    breakdown.push(1);
  }

  return breakdown.map((n) => map[n] ?? "A").join(" ");
};

export const convertLetterStringToNewOutput = (
  input: string
): {
  explanation: string;
  sampleOutput: string;
} => {
  const cleanLetters = input.replace(/\s/g, "").split("");
  const numbers = cleanLetters.map(letterToNumber);
  const total = numbers.reduce((a, b) => a + b, 0);
  const explanation = `${numbers.join(" + ")} = ${total}`;
  const sampleOutput = convertToLetters_k(total);
  return {
    explanation,
    sampleOutput,
  };
};

// Konversi angka ke huruf, sesuai A = 0, B = 1, ..., J = 9
export const digitToUppercaseLetterMap: Record<number, string> = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
  4: "E",
  5: "F",
  6: "G",
  7: "H",
  8: "I",
  9: "J",
};

// Versi kebalikan, konversi huruf ke angka
export const uppercaseLetterToDigitMap: Record<string, number> = Object.entries(
  digitToUppercaseLetterMap
).reduce((acc, [digit, letter]) => {
  acc[letter] = parseInt(digit, 10);
  return acc;
}, {} as Record<string, number>);
