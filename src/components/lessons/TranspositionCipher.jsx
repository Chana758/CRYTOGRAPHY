import { useState } from 'react';
import { Grid3x3, Info, Lock, Unlock, ShieldCheck } from 'lucide-react';
import {
  transpositionEncrypt,
  transpositionDecrypt,
  buildGrid,
  getColumnOrder,
} from '@/utils/cryptoUtils';

export default function TranspositionCipher() {
  const [plaintext, setPlaintext] = useState('HELLOWORLD');
  const [keyword, setKeyword] = useState('KEY');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  // FIX: snapshot of the matrix taken at Encrypt time, so editing the inputs
  // afterwards does not change the matrix while the result stays the same.
  const [matrix, setMatrix] = useState(null); // { grid, keyword, order } | null

  const handleEncrypt = () => {
    try {
      setError('');
      const out = transpositionEncrypt(plaintext, keyword);
      setResult(out);
      setMatrix({
        grid: buildGrid(plaintext, keyword),
        keyword,
        order: getColumnOrder(keyword),
      });
    } catch (err) {
      setError(err.message);
      setResult('');
      setMatrix(null);
    }
  };

  const handleDecrypt = () => {
    try {
      setError('');
      setResult(transpositionDecrypt(plaintext, keyword));
      setMatrix(null);
    } catch (err) {
      setError(err.message);
      setResult('');
      setMatrix(null);
    }
  };

  // Use the result as the next input (e.g. Encrypt, then Decrypt)
  const useResultAsInput = () => {
    setPlaintext(result);
    setResult('');
    setMatrix(null);
    setError('');
  };

  const keyLen = keyword.length || 1;
  const rowCount = Math.ceil(plaintext.replace(/\s/g, '').length / keyLen);

  return (
    <div className="bg-white font-sans text-slate-700 py-10 px-4 md:px-12">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-500 px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest border border-purple-100">
            <ShieldCheck size={14} /> Cryptography Lab
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight uppercase">
            Transposition <span className="text-purple-400">Cipher</span>
          </h1>
          <p className="text-slate-400 text-base font-medium max-w-xl mx-auto">
            Rearranges letters based on a keyword. Matrix-based encryption.
          </p>
        </div>

        {/* Video */}
        <div className="overflow-hidden rounded-2xl bg-slate-100">
          <div className="aspect-video bg-slate-900 relative">
            <iframe
              src="https://www.youtube.com/embed/bcyUJK1BvHw"
              title="Tutorial"
              className="absolute inset-0 w-full h-full"
              allowFullScreen
            />
          </div>
        </div>

        {/* Workbench */}
        <div className="bg-white border-2 border-slate-100 rounded-[2rem] md:rounded-[3.5rem] p-6 md:p-14 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            <div className="space-y-8">
              <div>
                <label className="text-[11px] font-black text-slate-300 uppercase tracking-[0.3em] ml-1 mb-3 block">
                  Encryption Keyword
                </label>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) =>
                    setKeyword(e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase())
                  }
                  className="w-full px-6 py-4 bg-purple-50/50 border-2 border-purple-50 rounded-3xl outline-none font-bold text-purple-600 focus:border-purple-200 transition-all text-2xl uppercase"
                  placeholder="KEY..."
                />
              </div>

              <div>
                <label className="text-[11px] font-black text-slate-300 uppercase tracking-[0.3em] ml-1 mb-3 block">
                  Message / Ciphertext
                </label>
                <textarea
                  value={plaintext}
                  onChange={(e) => setPlaintext(e.target.value.toUpperCase())}
                  className="w-full px-6 py-4 bg-blue-50/50 border-2 border-blue-50 rounded-3xl outline-none font-bold text-blue-600 focus:border-blue-200 transition-all text-xl uppercase resize-none"
                  rows={4}
                  placeholder="TYPE HERE..."
                />
              </div>
            </div>

            <div className="flex flex-col justify-center bg-slate-50 border-2 border-slate-100 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 space-y-8">
              <div className="flex items-center gap-4 text-slate-300 border-b border-slate-200 pb-6">
                <Info size={20} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  System Configuration
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400 uppercase tracking-widest">Columns Count:</span>
                  <span className="text-purple-500 bg-purple-100 px-3 py-1 rounded-lg">
                    {keyword.length}
                  </span>
                </div>
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400 uppercase tracking-widest">Rows Count:</span>
                  <span className="text-blue-500 bg-blue-100 px-3 py-1 rounded-lg">
                    {rowCount}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <button
                  onClick={handleEncrypt}
                  className="flex items-center justify-center gap-3 bg-purple-400 hover:bg-purple-500 text-white font-black py-5 rounded-3xl text-[11px] uppercase tracking-widest transition-all active:scale-95"
                >
                  <Lock size={16} /> Encrypt
                </button>
                <button
                  onClick={handleDecrypt}
                  className="flex items-center justify-center gap-3 bg-pink-400 hover:bg-pink-500 text-white font-black py-5 rounded-3xl text-[11px] uppercase tracking-widest transition-all active:scale-95"
                >
                  <Unlock size={16} /> Decrypt
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-100 text-red-700 rounded-2xl text-sm font-semibold">
              Error: {error}
            </div>
          )}

          {/* Output */}
          <div className="space-y-5">
            <label className="text-[11px] font-black text-slate-300 uppercase tracking-[0.5em] text-center block">
              Processed Output
            </label>

            <div className="bg-emerald-50/50 border-2 border-emerald-50 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 text-center">
              <span className="font-mono text-3xl md:text-5xl font-black text-emerald-600 uppercase break-all leading-tight">
                {result || '...'}
              </span>
            </div>

            {result && (
              <div className="text-center space-y-3">
                <button
                  onClick={useResultAsInput}
                  className="px-5 py-2 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-black uppercase tracking-widest hover:bg-emerald-200 transition-colors"
                >
                  ↑ Use result as input
                </button>
                {/* FIX: explain padding so users are not confused by trailing X */}
                <p className="text-[11px] text-slate-400 font-medium">
                  Note: a trailing <span className="font-bold">X</span> is padding added to fill the matrix.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Matrix (only after Encrypt, built from the snapshot) */}
        {matrix && result && (
          <div className="bg-white border-2 border-slate-100 rounded-[2rem] md:rounded-[3.5rem] p-6 md:p-16 space-y-10">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="p-4 bg-purple-50 rounded-2xl text-purple-400 mb-2">
                <Grid3x3 size={28} />
              </div>
              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
                Logic Visualization Matrix
              </h2>
              <div className="h-1.5 w-12 bg-purple-100 rounded-full" />
            </div>

            <div className="overflow-x-auto pb-6">
              <table className="mx-auto border-separate border-spacing-3">
                <thead>
                  <tr>
                    {Array.from(matrix.keyword).map((char, idx) => (
                      <th
                        key={idx}
                        className="w-14 h-14 md:w-20 md:h-20 bg-purple-400 text-white rounded-2xl relative border-b-[6px] border-purple-500"
                      >
                        <span className="text-2xl font-black">{char}</span>
                        <span className="absolute -top-2 -right-2 w-8 h-8 bg-slate-800 rounded-full text-[10px] font-black flex items-center justify-center border-4 border-white text-white">
                          {matrix.order.indexOf(idx) + 1}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matrix.grid.map((row, rIdx) => (
                    <tr key={rIdx}>
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className={`w-14 h-14 md:w-20 md:h-20 border-2 rounded-2xl text-center font-mono font-black text-2xl ${
                            cell === 'X'
                              ? 'bg-slate-50 border-slate-50 text-slate-200'
                              : 'bg-white border-slate-100 text-slate-500'
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 max-w-sm mx-auto text-center">
              <p className="text-[10px] font-black text-purple-400 uppercase tracking-[0.3em]">
                Read columns:{' '}
                {/* FIX: n = reading order (1st, 2nd, ...), i = column index in the keyword */}
                {matrix.order.map((i, n) => `${matrix.keyword[i]}(${n + 1})`).join(' → ')}
              </p>
            </div>
          </div>
        )}

        <div className="text-center pb-12">
          <p className="text-[10px] font-bold text-slate-200 uppercase tracking-[0.6em]">
            Cryptography Education Dashboard
          </p>
        </div>
      </div>
    </div>
  );
}