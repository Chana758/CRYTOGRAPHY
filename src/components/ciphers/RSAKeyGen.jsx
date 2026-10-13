import { useState } from 'react';
import { rsaKeyGen, isPrime } from '@/utils/cryptoUtils';

const COMMON_PRIMES = [
  { p: 11, q: 13 },
  { p: 17, q: 19 },
  { p: 23, q: 29 },
  { p: 37, q: 41 },
  { p: 43, q: 47 },
  { p: 53, q: 61 },
  { p: 61, q: 53 },
];

export default function RSAKeyGen() {
  // Use a string instead of BigInt in the state (<input> has limited support for BigInt).
  const [p, setP] = useState('61');
  const [q, setQ] = useState('53');
  const [e, setE] = useState('17');
  const [publicKey, setPublicKey] = useState(null);
  const [privateKey, setPrivateKey] = useState(null);
  const [error, setError] = useState('');
  const [details, setDetails] = useState(null);

  const generateKeys = () => {
    try {
      setError('');
      const pBig = BigInt(p);
      const qBig = BigInt(q);
      const eBig = BigInt(e);

      if (!isPrime(pBig)) {
        throw new Error(`${p} is not a prime number`);
      }
      if (!isPrime(qBig)) {
        throw new Error(`${q} is not a prime number`);
      }

      // rsaKeyGen checks p ≠ q, the range of e, and gcd(e, φ(n)) = 1
      const keys = rsaKeyGen(pBig, qBig, eBig);
      setPublicKey(keys.publicKey);
      setPrivateKey(keys.privateKey);

      setDetails({
        n: (pBig * qBig).toString(),
        phi: ((pBig - 1n) * (qBig - 1n)).toString(),
        e: eBig.toString(),
        d: keys.privateKey.d.toString(),
      });
    } catch (err) {
      setError(err.message);
      setPublicKey(null);
      setPrivateKey(null);
      setDetails(null);
    }
  };

  return (
    <main className="flex-1 bg-slate-50 px-4 py-6 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2 font-serif">
          RSA Key Generation
        </h1>
        <p className="text-slate-600 mb-8 text-sm sm:text-base">
          Generate RSA public and private key pairs from prime numbers.
        </p>

        {/* Steps */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 border-l-4 border-blue-500">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Steps</h2>
          <ol className="text-sm text-slate-600 space-y-2">
            <li>1. Choose two large prime numbers p and q</li>
            <li>2. Calculate n = p × q</li>
            <li>3. Calculate φ(n) = (p-1) × (q-1)</li>
            <li>4. Choose e such that 1 {'<'} e {'<'} φ(n) and gcd(e, φ(n)) = 1</li>
            <li>5. Calculate d = e⁻¹ mod φ(n)</li>
            <li>6. Public Key: (e, n) | Private Key: (d, n)</li>
          </ol>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Prime p
              </label>
              <input
                type="number"
                value={p}
                onChange={(ev) => setP(ev.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Prime q
              </label>
              <input
                type="number"
                value={q}
                onChange={(ev) => setQ(ev.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Public e
              </label>
              <input
                type="number"
                value={e}
                onChange={(ev) => setE(ev.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            onClick={generateKeys}
            className="w-full px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors mb-4"
          >
            Generate Keys
          </button>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm break-words">
              Error: {error}
            </div>
          )}

          {/* Quick Select */}
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-sm font-semibold text-slate-900 mb-3">Quick Selection:</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {COMMON_PRIMES.map((pair, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setP(String(pair.p));
                    setQ(String(pair.q));
                  }}
                  className="px-3 py-2 bg-blue-100 text-blue-700 rounded text-xs font-semibold hover:bg-blue-200 transition-colors"
                >
                  p={pair.p}, q={pair.q}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        {details && (
          <>
            {/* Calculation Details */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">
                Calculation Details
              </h2>

              <div className="space-y-3 text-sm font-mono">
                <div className="bg-slate-50 p-3 rounded">
                  <p className="text-slate-600">n = p × q</p>
                  <p className="font-bold text-slate-900 break-all">n = {details.n}</p>
                </div>

                <div className="bg-slate-50 p-3 rounded">
                  <p className="text-slate-600">φ(n) = (p-1) × (q-1)</p>
                  <p className="font-bold text-slate-900 break-all">φ(n) = {details.phi}</p>
                </div>

                <div className="bg-slate-50 p-3 rounded">
                  <p className="text-slate-600">e (public exponent)</p>
                  <p className="font-bold text-slate-900">e = {details.e}</p>
                </div>

                <div className="bg-slate-50 p-3 rounded">
                  <p className="text-slate-600">d = e⁻¹ mod φ(n)</p>
                  <p className="font-bold text-slate-900 break-all">d = {details.d}</p>
                </div>
              </div>
            </div>

            {/* Key Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border-t-4 border-green-500">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Public Key</h3>

                <div className="bg-green-50 p-4 rounded border border-green-200">
                  <p className="text-xs text-slate-600 mb-1">e:</p>
                  <p className="font-mono font-bold text-green-900 mb-3 break-all">
                    {publicKey?.e.toString()}
                  </p>

                  <p className="text-xs text-slate-600 mb-1">n:</p>
                  <p className="font-mono font-bold text-green-900 break-all">
                    {publicKey?.n.toString()}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border-t-4 border-red-500">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Private Key</h3>

                <div className="bg-red-50 p-4 rounded border border-red-200">
                  <p className="text-xs text-slate-600 mb-1">d:</p>
                  <p className="font-mono font-bold text-red-900 mb-3 break-all">
                    {privateKey?.d.toString()}
                  </p>

                  <p className="text-xs text-slate-600 mb-1">n:</p>
                  <p className="font-mono font-bold text-red-900 break-all">
                    {privateKey?.n.toString()}
                  </p>
                </div>
              </div>

            </div>
          </>
        )}

      </div>
    </main>
  );
}