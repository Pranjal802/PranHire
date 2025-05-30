/* === /frontend/src/components/Header.jsx === */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Features/Auth/authSlice.js';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-blue-600">PranHire</h1>
        <div>
          {isAuth ? (
            <nav className="hidden md:flex space-x-6">
              <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
              <Link to="/resume-upload" className="hover:text-blue-600">Resume Upload</Link>
              <Link to="/tracker" className="hover:text-blue-600">Job Tracker</Link>
              <Link to="/assistant" className="hover:text-blue-600">AI Assistant</Link>
              <Link to="/profile" className="hover:text-blue-600">Profile</Link>
              <button onClick={handleLogout} className="text-red-600 hover:underline">Logout</button>
            </nav>  
          ) : (
            <nav className="hidden md:flex space-x-6"> 
              <Link to="/login" className="text-green-600 hover:underline">Login</Link>
              <Link to="/signup" className="text-green-600 hover:underline">Signup</Link>
            </nav>
          )}
        </div>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link to="/dashboard" className="block" onClick={() => setIsOpen(false)}>Dashboard</Link>
          <Link to="/upload" className="block" onClick={() => setIsOpen(false)}>Resume Upload</Link>
          <Link to="/tracker" className="block" onClick={() => setIsOpen(false)}>Job Tracker</Link>
          <Link to="/assistant" className="block" onClick={() => setIsOpen(false)}>AI Assistant</Link>
          <Link to="/profile" className="block" onClick={() => setIsOpen(false)}>Profile</Link>
          {isAuth ? (
            <button onClick={handleLogout} className="text-red-600">Logout</button>
          ) : (
            <Link to="/login" className="text-green-600" onClick={() => setIsOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
