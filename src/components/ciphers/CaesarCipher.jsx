import { useState } from 'react';
import { caesarEncrypt, caesarDecrypt } from '@/utils/cryptoUtils';

export default function CaesarCipher() {
  const [text, setText] = useState('HELLO');
  const [shift, setShift] = useState(3);
  const [result, setResult] = useState('KHOOR');
  const [error, setError] = useState('');

  const run = (fn) => {
    try {
      setError('');
      setResult(fn(text, Number(shift)));
    } catch (err) {
      setError(err.message);
      setResult('');
    }
  };

  return (
    <main className="flex-1 bg-slate-50 p-4 sm:p-6 lg:p-10">
      <div className="max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2 font-serif">
          Caesar Cipher
        </h1>

        <p className="text-slate-600 mb-6 sm:mb-8 text-sm sm:text-base">
          A substitution cipher where each letter is shifted by a fixed number of positions in the alphabet.
        </p>

        {/* Formula Box */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 border-l-4 border-blue-500">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-3">
            How It Works
          </h2>

          <p className="text-slate-700 font-mono text-center bg-slate-50 p-3 sm:p-4 rounded text-sm sm:text-base">
            E(x) = (x + shift) mod 26
          </p>

          <p className="text-xs sm:text-sm text-slate-600 mt-3">
            Each letter is replaced with the letter shifted forward or backward by the specified key value (traditionally 3).
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Shift Value (1-25)
              </label>
              <input
                type="number"
                min="1"
                max="25"
                value={shift}
                onChange={(e) => setShift(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Input Text
            </label>

            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value.toUpperCase())}
              className="w-full px-3 sm:px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter text to encrypt/decrypt"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button
              onClick={() => run(caesarEncrypt)}
              className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Encrypt
            </button>

            <button
              onClick={() => run(caesarDecrypt)}
              className="w-full sm:w-auto px-6 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
            >
              Decrypt
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              Error: {error}
            </div>
          )}

          {result && (
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Result
              </label>

              <div className="w-full px-4 py-3 bg-yellow-100 border-2 border-yellow-300 rounded-lg font-mono text-yellow-900 font-semibold break-words min-h-[3rem]">
                {result}
              </div>
            </div>
          )}

        </div>

        {/* Example */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-4">
            Example (Shift = 3)
          </h2>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <span className="text-slate-600">Plaintext:</span>
              <span className="font-mono font-semibold break-words">
                A B C D E F G H I
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between">
              <span className="text-slate-600">Ciphertext:</span>
              <span className="font-mono font-semibold break-words">
                D E F G H I J K L
              </span>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}