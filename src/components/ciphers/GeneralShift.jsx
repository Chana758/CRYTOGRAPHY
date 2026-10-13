import { useState, useMemo } from 'react';
import { shiftEncrypt, shiftDecrypt, bruteForceShift } from '@/utils/cryptoUtils';

export default function GeneralShift() {
  const [plaintext, setPlaintext] = useState('HELLO');
  const [key, setKey] = useState(5);
  const [result, setResult] = useState('MJQQT');
  const [showBruteForce, setShowBruteForce] = useState(false);

  const handleEncrypt = () => {
    setResult(shiftEncrypt(plaintext, key));
    setShowBruteForce(false);
  };

  const handleDecrypt = () => {
    setResult(shiftDecrypt(plaintext, key));
    setShowBruteForce(false);
  };

  // Calculate only when the plaintext changes.
  const bruteForceResults = useMemo(() => bruteForceShift(plaintext), [plaintext]);

  return (
    <main className="flex-1 bg-slate-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-2xl md:text-4xl font-bold text-slate-900 mb-2 font-serif">
          General Shift Cipher
        </h1>

        <p className="text-slate-600 mb-6 md:mb-8 text-sm md:text-base">
          Also called Caesar cipher generalization. Shift by any value from 0 to 25.
        </p>

        {/* Formula */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6 border-l-4 border-blue-500">
          <h2 className="text-base md:text-lg font-bold text-slate-900 mb-3">
            How It Works
          </h2>

          <p className="text-slate-700 font-mono text-center bg-slate-50 p-3 rounded">
            E(x) = (x + k) mod 26
          </p>

          <p className="text-xs md:text-sm text-slate-600 mt-3">
            Each letter is replaced with the letter k positions ahead.
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Plaintext
              </label>
              <input
                type="text"
                value={plaintext}
                onChange={(e) => setPlaintext(e.target.value.toUpperCase())}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter text"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Shift Key: {key}
              </label>
              <input
                type="range"
                min="0"
                max="25"
                value={key}
                onChange={(e) => setKey(parseInt(e.target.value, 10))}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={handleEncrypt}
              className="flex-1 sm:flex-none px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Encrypt
            </button>

            <button
              onClick={handleDecrypt}
              className="flex-1 sm:flex-none px-6 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
            >
              Decrypt
            </button>

            <button
              onClick={() => setShowBruteForce((v) => !v)}
              className="flex-1 sm:flex-none px-6 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
            >
              Brute Force
            </button>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Result
            </label>
            <div className="w-full px-4 py-3 bg-yellow-100 border-2 border-yellow-300 rounded-lg font-mono text-yellow-900 font-semibold break-words min-h-[3rem]">
              {result}
            </div>
          </div>

        </div>

        {/* Brute Force */}
        {showBruteForce && (
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              Brute Force Attack (All 26 Shifts)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {bruteForceResults.map((item) => (
                <div
                  key={item.shift}
                  className="bg-slate-50 p-3 rounded border border-slate-200"
                >
                  <div className="text-xs font-semibold text-slate-600 mb-1">
                    Shift: {item.shift}
                  </div>
                  <div className="font-mono text-sm font-bold text-slate-900 bg-yellow-100 p-2 rounded break-words">
                    {item.decrypted}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}