import { useState } from 'react'
import { ChevronRight, BookOpen, Lock } from 'lucide-react'

const MENUS = {
  dashboard: [],
  classical: [
    { id: 'caesar', label: 'Caesar Cipher' },
    { id: 'shift', label: 'General Shift' },
    { id: 'affine', label: 'Affine Cipher' },
  ],
  transposition: [
    { id: 'transposition', label: 'Transposition Cipher' },
  ],
  rsa: [
    { id: 'rsakeygen', label: 'Key Generation' },
    { id: 'rsaencrypt', label: 'Encryption' },
    { id: 'rsadecrypt', label: 'Decryption' },
  ],
  quiz: [],
}

const PAGE_TITLES = {
  classical: 'Classical Ciphers',
  transposition: 'Transposition',
  rsa: 'RSA Cryptography',
}

export default function Sidebar({ currentPage, currentLesson, onLessonChange }) {
  const [open, setOpen] = useState(false)

  const menuItems = MENUS[currentPage] || []

  if (menuItems.length === 0) return null

  const pageTitle = PAGE_TITLES[currentPage] || currentPage

  return (
    <>
      {/* MOBILE LESSON BUTTON */}
      <div className="lg:hidden p-4 bg-white border-b border-slate-300 shadow">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between w-full font-bold text-slate-700"
        >
          Lessons
          <ChevronRight
            size={20}
            className={`transition-transform ${open ? 'rotate-90' : ''}`}
          />
        </button>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-white border-r border-slate-200 shadow-sm">

        {/* Header */}
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <BookOpen className="w-5 h-5" />
            <span className="font-bold tracking-wide uppercase text-xs">
              Curriculum
            </span>
          </div>

          <h2 className="text-xl font-bold text-slate-800">
            {pageTitle}
          </h2>
        </div>

        {/* Lesson Menu */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = currentLesson === item.id

            return (
              <button
                key={item.id}
                onClick={() => onLessonChange(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-1.5 rounded-lg ${
                      isActive ? 'bg-blue-500' : 'bg-slate-100'
                    }`}
                  >
                    <Lock
                      className={`w-3.5 h-3.5 ${
                        isActive ? 'text-white' : 'text-slate-500'
                      }`}
                    />
                  </div>

                  {item.label}
                </div>

                <ChevronRight
                  className={`w-4 h-4 transition-transform ${
                    isActive ? 'rotate-90' : 'opacity-40'
                  }`}
                />
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <div className="text-[10px] text-slate-400 font-medium uppercase text-center tracking-widest">
            Cryptography Course 1
          </div>
        </div>
      </aside>

      {/* MOBILE DROPDOWN MENU */}
      {open && (
        <div className="lg:hidden bg-white border-b border-slate-200 p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = currentLesson === item.id

            return (
              <button
                key={item.id}
                onClick={() => {
                  onLessonChange(item.id)
                  setOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Lock
                  className={`w-4 h-4 ${
                    isActive ? 'text-white' : 'text-slate-500'
                  }`}
                />

                {item.label}
              </button>
            )
          })}
        </div>
      )}
    </>
  )
}