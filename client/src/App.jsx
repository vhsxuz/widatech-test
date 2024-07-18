import React from 'react'
import Center from './components/Center'
import Header from './components/Header'
import { AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import InvoiceInfo from './components/InvoiceInfo';


function App() {
  const location = useLocation()

  return (
    <div className=' dark:bg-[#141625] duration-300 min-h-screen bg-[#f8f8fb]'>
      <Header />

      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          < Route element={<Center />} path='/' />
          < Route element={<InvoiceInfo />} path='/invoice' />
        </Routes>
      </AnimatePresence>

    </div>
  )
}

export default App
