import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'
// import StickyNote from '@/components/StickyNote'

import Dashboard from '@/components/lessons/Dashboard'
import ClassicalCiphers from '@/components/lessons/ClassicalCiphers'
import TranspositionCipher from '@/components/lessons/TranspositionCipher'
import RSACryptography from '@/components/lessons/RSACryptography'
import Quiz from '@/components/lessons/Quiz'

// Default lesson of each page (when changing page, reset lesson)
const DEFAULT_LESSON = {
  classical: 'caesar',
  rsa: 'rsakeygen',
  transposition: 'transposition',
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [currentLesson, setCurrentLesson] = useState('caesar')

  const handlePageChange = (page) => {
    setCurrentPage(page)
    setCurrentLesson(DEFAULT_LESSON[page] ?? '')
  }

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [currentPage, currentLesson])

  const renderMainContent = () => {
    switch (currentPage) {
      case 'classical':
        return <ClassicalCiphers currentLesson={currentLesson} />
      case 'transposition':
        return <TranspositionCipher />
      case 'rsa':
        return <RSACryptography currentLesson={currentLesson} />
      case 'quiz':
        return <Quiz />
      case 'dashboard':
      default:
        return <Dashboard />
    }
  }

  const showSidebar = currentPage !== 'dashboard' && currentPage !== 'quiz'

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar currentPage={currentPage} onPageChange={handlePageChange} />

      {/* flex-1 pushes the footer to the very bottom. */}
      <div className="flex-1 lg:flex">
        {showSidebar && (
          <Sidebar
            currentPage={currentPage}
            currentLesson={currentLesson}
            onLessonChange={setCurrentLesson}
          />
        )}

        <div className="flex-1 min-w-0 flex flex-col">{renderMainContent()}</div>
      </div>

      <Footer onPageChange={handlePageChange} />

      {/* <StickyNote currentPage={currentPage} currentLesson={currentLesson} /> */}
    </div>
  )
}