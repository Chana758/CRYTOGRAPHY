import { Lightbulb } from 'lucide-react';

const NOTES = {
  dashboard: {
    title: 'Welcome!',
    content: 'Learn cryptography fundamentals through interactive demonstrations.',
  },
  caesar: {
    title: 'Caesar Cipher',
    content: 'Also called ROT-3. Shifts each letter by a fixed number (3).\nHistorically used by Julius Caesar.',
  },
  shift: {
    title: 'Shift Cipher',
    content: 'A generalization of Caesar cipher. Each letter shifted by variable key (0-25).\nAlso called Monoalphabetic Substitution.',
  },
  affine: {
    title: 'Affine Cipher',
    content: 'Formula: E(x) = (ax + b) mod 26\nRequires: gcd(a, 26) = 1\nCombines multiplication and addition.',
  },
  transposition: {
    title: 'Transposition',
    content: 'Rearranges letter positions without substitution.\nUses keyword to define column order.\nAlso called Permutation Cipher.',
  },
  rsakeygen: {
    title: 'RSA Key Gen',
    content: '1. Choose primes p, q\n2. n = p × q\n3. φ(n) = (p-1)(q-1)\n4. Find e, d\nPublic: (e,n), Private: (d,n)',
  },
  rsaencrypt: {
    title: 'RSA Encrypt',
    content: 'C = M^e mod n\nM = plaintext number\ne = public exponent\nn = modulus',
  },
  rsadecrypt: {
    title: 'RSA Decrypt',
    content: 'M = C^d mod n\nC = ciphertext number\nd = private exponent\nn = modulus',
  },
};

export default function StickyNote({ currentPage, currentLesson }) {
  const note = NOTES[currentLesson] || NOTES[currentPage] || NOTES.dashboard;

  return (
    <div className="fixed right-6 bottom-6 w-64 bg-yellow-100 rounded-lg shadow-lg p-4 border-2 border-yellow-300 transform -rotate-3">
      <div className="flex items-start gap-2 mb-3">
        <Lightbulb className="w-5 h-5 text-yellow-700 shrink-0 mt-0.5" />
        <h3 className="font-bold text-yellow-900 text-sm">{note.title}</h3>
      </div>
      <p className="text-xs text-yellow-800 whitespace-pre-line leading-relaxed">
        {note.content}
      </p>
    </div>
  );
}