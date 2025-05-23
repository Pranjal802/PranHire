import { useState } from 'react'
import './App.css'
import Header from './Components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './Components/Footer'
import Login from './Pages/Login'
import Register from './Pages/Register'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* <Outlet /> */}
        <Register/>
      </main>
      <Footer />
    </div>
  );
}

export default App
