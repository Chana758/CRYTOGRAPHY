import { BookOpen, Users, Award } from 'lucide-react';

const FEATURES = [
  {
    icon: BookOpen,
    title: 'Learn',
    text: 'Explore classical and modern encryption techniques with step-by-step explanations.',
    border: 'border-blue-500',
    bg: 'bg-blue-50',
    color: 'text-blue-600',
  },
  {
    icon: Users,
    title: 'Practice',
    text: 'Interact with cipher demonstrations and encrypt/decrypt your own messages.',
    border: 'border-green-500',
    bg: 'bg-green-50',
    color: 'text-green-600',
  },
  {
    icon: Award,
    title: 'Test',
    text: 'Challenge yourself with quizzes to reinforce your understanding.',
    border: 'border-yellow-500',
    bg: 'bg-yellow-50',
    color: 'text-yellow-600',
  },
];

const CURRICULUM = [
  {
    no: '01',
    title: 'Classical Ciphers',
    text: 'Learn Caesar, General Shift, and Affine ciphers used throughout history.',
  },
  {
    no: '02',
    title: 'Transposition Ciphers',
    text: 'Discover how rearranging letters can hide messages.',
  },
  {
    no: '03',
    title: 'RSA Cryptography',
    text: 'Understand modern public-key cryptography and key generation.',
  },
];

export default function Dashboard() {
  return (
    <main className="flex-1 bg-slate-50 px-4 sm:px-6 lg:px-8 py-8 flex justify-center">
      <div className="max-w-4xl w-full flex flex-col items-center text-center">

        {/* Header */}
        <div className="mb-10 flex flex-col items-center w-full">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-2 font-serif uppercase tracking-tight">
            ENCRYPTION AND DECRYPTION DEMO
          </h1>

          <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-12 text-sm text-slate-600 mt-8 border-y border-slate-200 py-4 w-full max-w-2xl">
            <div className="text-center">
              <p className="font-black text-slate-900 uppercase tracking-widest text-[10px] mb-1">
                Submitted by
              </p>
              <p className="font-medium">Mr. LIM Seyha</p>
            </div>

            <div className="text-center">
              <p className="font-black text-slate-900 uppercase tracking-widest text-[10px] mb-1">
                Created by
              </p>
              <p className="font-medium">Mr. SAM CHANNA</p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-3xl shadow-sm p-6 sm:p-8 lg:p-10 mb-8 border-t-4 border-blue-500 w-full">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 font-serif italic">
            Welcome to Cryptography Lab
          </h2>

          <p className="text-slate-700 leading-relaxed mb-4 text-base sm:text-lg">
            Cryptography is the science of writing and reading secret messages.
            This interactive platform will guide you through fundamental
            cryptographic concepts, from classical ciphers to modern RSA encryption.
          </p>

          <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
            You will learn how to encrypt and decrypt messages using various
            techniques, understand the mathematics behind RSA, and test your
            knowledge with interactive quizzes.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {FEATURES.map(({ icon: Icon, title, text, border, bg, color }) => (
            <div
              key={title}
              className={`bg-white rounded-2xl shadow-sm p-6 sm:p-8 border-b-4 ${border} flex flex-col items-center transition-transform hover:-translate-y-1`}
            >
              <div className={`p-3 ${bg} rounded-xl mb-4`}>
                <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${color}`} />
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
              <p className="text-sm text-slate-600">{text}</p>
            </div>
          ))}
        </div>

        {/* Curriculum */}
        <div className="bg-white rounded-3xl shadow-sm p-6 sm:p-8 lg:p-10 mt-8 w-full">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-8 font-serif italic">
            Course Curriculum
          </h3>

          <div className="space-y-6 max-w-2xl mx-auto">
            {CURRICULUM.map((item, idx) => (
              <div
                key={item.no}
                className={`flex items-start gap-4 sm:gap-6 text-left ${
                  idx < CURRICULUM.length - 1 ? 'pb-6 border-b border-slate-100' : ''
                }`}
              >
                <span className="text-2xl sm:text-3xl font-black text-blue-100 italic">
                  {item.no}
                </span>

                <div>
                  <h4 className="font-bold text-slate-900 uppercase text-sm tracking-wide">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-500">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}