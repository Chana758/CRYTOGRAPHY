// ---------- Helpers ----------
const mod = (n, m) => ((n % m) + m) % m;

function toInt(value, name) {
  const n = Number(value);
  if (value === '' || value === null || !Number.isInteger(n)) {
    throw new Error(`${name} must be an integer`);
  }
  return n;
}

function mapLetters(text, fn) {
  return String(text)
    .toUpperCase()
    .split('')
    .map((char) => {
      if (!/[A-Z]/.test(char)) return char;
      return String.fromCharCode(fn(char.charCodeAt(0) - 65) + 65);
    })
    .join('');
}

// ---------- Caesar / General Shift ----------
export function shiftEncrypt(text, key) {
  const k = toInt(key, 'Key');
  return mapLetters(text, (x) => mod(x + k, 26));
}

export function shiftDecrypt(text, key) {
  return shiftEncrypt(text, -toInt(key, 'Key'));
}

export const caesarEncrypt = (text, shift = 3) => shiftEncrypt(text, shift);
export const caesarDecrypt = (text, shift = 3) => shiftDecrypt(text, shift);

export function bruteForceShift(text) {
  return Array.from({ length: 26 }, (_, shift) => ({
    shift,
    decrypted: shiftDecrypt(text, shift),
  }));
}

// ---------- Affine ----------
function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) [a, b] = [b, a % b];
  return a;
}

function modInverse(a, m) {
  a = mod(a, m);
  for (let x = 1; x < m; x++) if ((a * x) % m === 1) return x;
  return null;
}

export function affineEncrypt(text, a, b) {
  a = toInt(a, 'a');
  b = toInt(b, 'b');
  if (gcd(a, 26) !== 1) throw new Error('a must be coprime with 26');
  return mapLetters(text, (x) => mod(a * x + b, 26));
}

export function affineDecrypt(text, a, b) {
  a = toInt(a, 'a');
  b = toInt(b, 'b');
  if (gcd(a, 26) !== 1) throw new Error('a must be coprime with 26');
  const aInv = modInverse(a, 26);
  if (aInv === null) throw new Error('Modular inverse does not exist');
  return mapLetters(text, (y) => mod(aInv * (y - b), 26));
}

// ---------- Transposition ----------
export function getColumnOrder(keyword) {
  return Array.from(keyword.toUpperCase())
    .map((char, index) => ({ char, index }))
    .sort((p, q) => (p.char < q.char ? -1 : p.char > q.char ? 1 : p.index - q.index))
    .map((item) => item.index);
}

export function buildGrid(text, keyword) {
  const clean = text.replace(/\s/g, '').toUpperCase();
  const keyLen = keyword.length || 1;
  const rows = Math.ceil(clean.length / keyLen);
  const padded = clean.padEnd(rows * keyLen, 'X');
  const grid = [];
  for (let r = 0; r < rows; r++) {
    grid.push(padded.slice(r * keyLen, (r + 1) * keyLen).split(''));
  }
  return grid;
}

export function transpositionEncrypt(plaintext, keyword) {
  if (!keyword) throw new Error('Keyword is required');
  const grid = buildGrid(plaintext, keyword);
  let out = '';
  for (const col of getColumnOrder(keyword)) {
    for (const row of grid) out += row[col];
  }
  return out;
}

// FIX: Decrypt no longer rejects ciphertext whose length is not a multiple
// of the keyword length. When the grid is not full, the leftmost columns
// (index < extra) are one letter longer than the others, so we compute each
// column's real length while refilling the grid.
export function transpositionDecrypt(ciphertext, keyword) {
  if (!keyword) throw new Error('Keyword is required');
  const text = ciphertext.replace(/\s/g, '').toUpperCase();
  if (text.length === 0) throw new Error('Please enter a ciphertext to decrypt');

  const keyLen = keyword.length;
  const fullRows = Math.floor(text.length / keyLen);
  const extra = text.length % keyLen; // columns 0..extra-1 have one extra letter
  const rows = fullRows + (extra ? 1 : 0);

  const grid = Array.from({ length: rows }, () => Array(keyLen).fill(''));
  let i = 0;
  for (const col of getColumnOrder(keyword)) {
    const colLen = fullRows + (col < extra ? 1 : 0);
    for (let r = 0; r < colLen; r++) grid[r][col] = text[i++];
  }
  return grid.map((row) => row.join('')).join('');
}

// ---------- RSA (BigInt) ----------
export function extendedGcd(a, b) {
  if (b === 0n) return { gcd: a, x: 1n, y: 0n };
  const { gcd: g, x: x1, y: y1 } = extendedGcd(b, a % b);
  return { gcd: g, x: y1, y: x1 - (a / b) * y1 };
}

export function modPow(base, exp, m) {
  if (m <= 0n) throw new Error('n must be greater than 0');
  if (exp < 0n) throw new Error('Exponent must not be negative');
  let result = 1n;
  base = ((base % m) + m) % m;
  while (exp > 0n) {
    if (exp & 1n) result = (result * base) % m;
    exp >>= 1n;
    base = (base * base) % m;
  }
  return result;
}

export function modInverseBigInt(a, m) {
  const { gcd: g, x } = extendedGcd(a, m);
  if (g !== 1n) throw new Error('e is not coprime with φ(n), choose a different e');
  return ((x % m) + m) % m;
}

export function isPrime(n) {
  if (n < 2n) return false;
  if (n === 2n) return true;
  if (n % 2n === 0n) return false;
  for (let i = 3n; i * i <= n; i += 2n) if (n % i === 0n) return false;
  return true;
}

export function rsaKeyGen(p, q, e) {
  if (p === q) throw new Error('p and q must be different primes');
  const n = p * q;
  const phi = (p - 1n) * (q - 1n);
  if (e <= 1n || e >= phi) throw new Error(`e must be between 2 and φ(n)-1 (φ(n) = ${phi})`);
  const d = modInverseBigInt(e, phi);
  return { publicKey: { e, n }, privateKey: { d, n } };
}

export function rsaEncrypt(message, e, n) {
  const M = BigInt(message);
  if (M >= n) throw new Error('Message must be less than n');
  return modPow(M, e, n);
}

export function rsaDecrypt(ciphertext, d, n) {
  return modPow(BigInt(ciphertext), d, n);
}