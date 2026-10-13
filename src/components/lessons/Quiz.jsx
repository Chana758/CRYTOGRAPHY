import { useState } from 'react';
import { RotateCcw, CheckCircle, XCircle, Award } from 'lucide-react';

const quizQuestions = [
  {
    id: 1,
    question: 'In Caesar cipher with shift 3, what is the ciphertext for "A"?',
    options: ['B', 'C', 'D', 'E'],
    correct: 2,
    explanation: 'Shift 3 means A → D (A=0, shift by 3 = position 3 = D)',
  },
  {
    id: 2,
    question: 'What does "coprime with 26" mean in Affine cipher?',
    options: [
      'The number equals 26',
      'GCD(a, 26) = 1',
      'The number is greater than 26',
      'The number is a multiple of 26',
    ],
    correct: 1,
    explanation: 'Two numbers are coprime if their greatest common divisor (GCD) is 1',
  },
  {
    id: 3,
    question: 'Which of these values of "a" can be used in Affine cipher (mod 26)?',
    options: ['2', '4', '6', '7'],
    correct: 3,
    explanation: 'Valid values: 1,3,5,7,9,11,15,17,19,21,23,25. Only 7 is coprime with 26',
  },
  {
    id: 4,
    question: 'In RSA, what is the formula for calculating n?',
    options: ['n = p + q', 'n = p × q', 'n = p² + q²', 'n = (p-1) × (q-1)'],
    correct: 1,
    explanation: 'The modulus n is the product of the two prime numbers p and q',
  },
  {
    id: 5,
    question: 'In RSA encryption, C = M^e mod n. What does "e" represent?',
    options: [
      'The private exponent',
      'The public exponent',
      'The plaintext message',
      "Euler's number",
    ],
    correct: 1,
    explanation: 'e is the public exponent, which is part of the public key',
  },
  {
    // The previous answer "All of the above" is incorrect because the public key is not a secret.
    id: 6,
    question: 'What should be kept secret in RSA?',
    options: [
      'The public key (e, n)',
      'The private exponent d and the primes p, q',
      'The ciphertext C',
      'The modulus n',
    ],
    correct: 1,
    explanation:
      'The private exponent d and the primes p and q must stay secret. Anyone may know (e, n).',
  },
  {
    id: 7,
    question: 'In Transposition cipher, what determines the column order?',
    options: [
      'The message length',
      'The alphabetical order of keyword letters',
      'Random selection',
      'The keyword length only',
    ],
    correct: 1,
    explanation: 'Columns are numbered by the alphabetical position of each letter in the keyword',
  },
  {
    id: 8,
    question: 'In RSA, to decrypt C = 2790 with private key (d=2753, n=3233), which formula is used?',
    options: ['M = C^e mod n', 'M = C^d mod n', 'M = C × d mod n', 'M = (C + d) mod n'],
    correct: 1,
    explanation: 'Decryption formula is M = C^d mod n, using the private exponent d',
  },
  {
    id: 9,
    question: 'What is φ(n) in RSA key generation?',
    options: ['φ(n) = p × q', 'φ(n) = (p-1) × (q-1)', 'φ(n) = p + q', 'φ(n) = p² - q²'],
    correct: 1,
    explanation: "φ(n) is Euler's totient function: φ(n) = (p-1) × (q-1)",
  },
  {
    id: 10,
    question: 'Which cipher method rearranges letters without substitution?',
    options: ['Caesar cipher', 'Affine cipher', 'Transposition cipher', 'RSA encryption'],
    correct: 2,
    explanation:
      'Transposition cipher rearranges letters by position, unlike substitution ciphers that replace letters',
  },
];

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);
  const [answered, setAnswered] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const selected = answers[currentQuestion.id];
  const isCorrect = selected === currentQuestion.correct;
  const isLast = currentQuestionIndex === quizQuestions.length - 1;

  const handleAnswer = (optionIndex) => {
    if (answered) return;
    setAnswers({ ...answers, [currentQuestion.id]: optionIndex });
    if (optionIndex === currentQuestion.correct) {
      setScore(score + 1);
    }
    setAnswered(true);
  };

  const handleNext = () => {
    if (!isLast) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers({});
    setFinished(false);
    setAnswered(false);
  };

  /* ---------- Result screen ---------- */
  if (finished) {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    const isPassed = percentage >= 70;

    return (
      <main className="flex-1 bg-slate-50 p-4 sm:p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-sm p-6 sm:p-8">
          <div className="flex flex-col items-center mb-6">
            {isPassed ? (
              <div className="flex flex-col items-center gap-3">
                <Award className="w-16 h-16 text-green-500" />
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 font-serif">
                  Great Job!
                </h1>
              </div>
            ) : (
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 font-serif">
                Quiz Complete
              </h1>
            )}
          </div>

          <div className="text-center mb-8">
            <div className="text-5xl sm:text-6xl font-bold text-blue-600 mb-2">
              {score}/{quizQuestions.length}
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-2">{percentage}%</div>
            <p className="text-slate-600">
              {percentage >= 90 && 'Excellent! You mastered cryptography!'}
              {percentage >= 70 && percentage < 90 && 'Good understanding of the concepts!'}
              {percentage >= 50 && percentage < 70 && 'You got the basics, but review would help.'}
              {percentage < 50 && 'Keep studying to improve your score!'}
            </p>
          </div>

          {/* Answer summary */}
          <div className="mb-8 max-h-96 overflow-y-auto">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Answer Summary</h2>
            <div className="space-y-3">
              {quizQuestions.map((q) => {
                const correct = answers[q.id] === q.correct;
                return (
                  <div
                    key={q.id}
                    className={`p-3 rounded-lg border ${
                      correct ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {correct ? (
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                      )}
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{q.question}</p>
                        <p className={`text-xs ${correct ? 'text-green-700' : 'text-red-700'}`}>
                          {correct ? '✓ Correct' : '✗ Incorrect'}
                        </p>
                        {!correct && (
                          <p className="text-xs text-slate-600 mt-1">
                            Correct answer: {q.options[q.correct]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleRestart}
            className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Restart Quiz
          </button>
        </div>
      </main>
    );
  }

  /* ---------- Question screen ---------- */
  return (
    <main className="flex-1 bg-slate-50 p-4 sm:p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-sm p-6 sm:p-8">

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-slate-900">
              Question {currentQuestionIndex + 1} of {quizQuestions.length}
            </span>
            <span className="text-sm font-semibold text-slate-600">Score: {score}</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{
                width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Question */}
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-8 font-serif">
          {currentQuestion.question}
        </h2>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {currentQuestion.options.map((option, index) => {
            const isThisCorrect = index === currentQuestion.correct;
            const isThisSelected = index === selected;

            let buttonStyle = 'bg-white border-2 border-slate-200 hover:border-blue-400';
            let badgeStyle = 'border-slate-300';

            if (answered) {
              if (isThisCorrect) {
                buttonStyle = 'bg-green-100 border-2 border-green-500 text-green-900';
                badgeStyle = 'bg-green-500 border-green-500 text-white';
              } else if (isThisSelected) {
                buttonStyle = 'bg-red-100 border-2 border-red-500 text-red-900';
                badgeStyle = 'bg-red-500 border-red-500 text-white';
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={answered}
                className={`w-full p-4 rounded-lg font-semibold text-left transition-colors ${buttonStyle} ${
                  answered ? 'cursor-default' : 'cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 shrink-0 rounded-full border-2 flex items-center justify-center font-bold text-xs ${badgeStyle}`}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {answered && (
          <div
            className={`p-4 rounded-lg mb-6 ${
              isCorrect
                ? 'bg-green-50 border border-green-200'
                : 'bg-yellow-50 border border-yellow-200'
            }`}
          >
            <p className="text-sm font-semibold text-slate-900 mb-1">
              {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
            </p>
            <p className="text-sm text-slate-700">{currentQuestion.explanation}</p>
          </div>
        )}

        {/* Next */}
        {answered && (
          <button
            onClick={handleNext}
            className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors text-white ${
              isLast ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isLast ? 'See Results' : 'Next Question'}
          </button>
        )}
      </div>
    </main>
  );
}