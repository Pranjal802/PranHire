import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Login from './Pages/Login';
import Landingpage from './Pages/Landingpage';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/signup" element={<Signup />} /> 
          <Route path="/login" element={<Login />} /> 
          <Route path="/dashboard" element={<Dashboard />} /> 
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;