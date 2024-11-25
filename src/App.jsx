import { useState } from 'react'
import './App.css'
import Navbar from './componets/Navbar'
import Manager from './componets/Manager'
import Footer from './componets/Footer'

function App() {

  return (
    <>
      <Navbar/>
      <div className='min-h-[80vh]'>
      <Manager/>
      </div>
      <Footer />

    </>
  )
}

export default App
