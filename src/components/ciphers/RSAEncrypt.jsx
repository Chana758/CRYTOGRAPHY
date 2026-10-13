import { useState } from 'react';
import { modPow } from '@/utils/cryptoUtils';
import { Lock } from 'lucide-react';

const EXAMPLE_KEYS = [
  { name: 'Example 1 (p=61, q=53)', e: '17', n: '3233' },
  { name: 'Example 2 (p=23, q=29)', e: '5', n: '667' },
];

export default function RSAEncrypt() {
  const [message, setMessage] = useState('42');
  const [e, setE] = useState('17');
  const [n, setN] = useState('3233');
  const [ciphertext, setCiphertext] = useState('');
  const [error, setError] = useState('');
  const [steps, setSteps] = useState(null);

  const handleEncrypt = () => {
    try {
      setError('');
      const eBig = BigInt(e);
      const nBig = BigInt(n);
      const mBig = BigInt(message);

      if (nBig <= 1n) throw new Error('n must be greater than 1');
      if (mBig < 0n || eBig < 0n) throw new Error('Values must not be negative');
      if (mBig >= nBig) throw new Error(`Message must be less than n (${n})`);

      const C = modPow(mBig, eBig, nBig);
      setCiphertext(C.toString());
      setSteps({ formula: `C = ${message}^${e} mod ${n} = ${C.toString()}` });
    } catch (err) {
      setError(err.message);
      setCiphertext('');
      setSteps(null);
    }
  };

  const loadExample = (example) => {
    setE(example.e);
    setN(example.n);
    setMessage('42');
    setCiphertext('');
    setSteps(null);
    setError('');
  };

  return (
    <main className="flex-1 bg-slate-50 px-4 py-6 sm:px-6 md:px-8">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-3 mb-8">
          <Lock className="w-8 h-8 text-blue-600 mt-1" />
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 font-serif">
              RSA Encryption
            </h1>
            <p className="text-slate-600 mt-1 text-sm sm:text-base">
              Encrypt messages using RSA public key
            </p>
          </div>
        </div>

        {/* Formula Box */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 border-l-4 border-blue-500">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Formula</h2>
          <p className="text-slate-700 font-mono text-center bg-slate-50 p-3 sm:p-4 rounded mb-3 break-all">
            C = M^e mod n
          </p>

          <ul className="text-sm text-slate-600 space-y-1">
            <li>• M = plaintext message (as number)</li>
            <li>• e = public exponent</li>
            <li>• n = modulus</li>
            <li>• C = ciphertext</li>
          </ul>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Message (M)
              </label>
              <input
                type="number"
                value={message}
                onChange={(ev) => setMessage(ev.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Message as number"
              />
              <p className="text-xs text-slate-500 mt-1">Must be {'<'} n</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Public Exponent (e)
              </label>
              <input
                type="number"
                value={e}
                onChange={(ev) => setE(ev.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Modulus (n)
            </label>
            <input
              type="number"
              value={n}
              onChange={(ev) => setN(ev.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleEncrypt}
            className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors mb-4"
          >
            Encrypt
          </button>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm break-words">
              Error: {error}
            </div>
          )}

          {ciphertext && (
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Ciphertext (C)
              </label>
              <div className="w-full px-4 py-3 bg-yellow-100 border-2 border-yellow-300 rounded-lg font-mono text-yellow-900 font-bold break-all">
                {ciphertext}
              </div>
            </div>
          )}
        </div>

        {/* Calculation */}
        {steps && (
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Calculation</h2>
            <div className="bg-slate-50 p-4 rounded border border-slate-200 overflow-x-auto">
              <p className="font-mono text-sm text-slate-900 break-all">
                {steps.formula}
              </p>
            </div>
          </div>
        )}

        {/* Examples */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            Try These Examples
          </h2>

          <div className="space-y-2">
            {EXAMPLE_KEYS.map((example, idx) => (
              <button
                key={idx}
                onClick={() => loadExample(example)}
                className="w-full px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-lg text-left text-sm font-semibold transition-colors"
              >
                {example.name} (e={example.e}, n={example.n})
              </button>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}