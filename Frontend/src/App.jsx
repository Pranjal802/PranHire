// import './App.css';
// import Header from './Components/Header';
// import Footer from './Components/Footer';
// import Login from './Pages/Login';
// import Landingpage from './Pages/Landingpage';
// import Signup from './Pages/Signup';
// import Dashboard from './Pages/Dashboard';
// import EmailVerification from './Pages/EmailVerification';
// import { Routes, Route } from 'react-router-dom';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { login, logout } from './Features/Auth/authSlice';


// function App() {

//     const dispatch = useDispatch();
//     useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       fetch('http://localhost:8000/api/auth/check-auth', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       })
//         .then(res => res.json())
//         .then(data => {
//           if (data.success && data.user) {
//             // dispatch(login(data.user));
//             dispatch(login({ user: data.user, token }));
//           } else {
//             localStorage.removeItem('token');
//             dispatch(logout());
//           }
//         })
//         .catch(() => {
//           localStorage.removeItem('token');
//           dispatch(logout());
//         });
//     }
//   }, [dispatch]);

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
//       <main className="flex-1">
//         <Routes>
//           <Route path="/" element={<Landingpage />} />
//           <Route path="/signup" element={<Signup />} /> 
//           <Route path="/login" element={<Login />} /> 
//           <Route path="/dashboard" element={<Dashboard />} /> 
//           <Route path="/emailverification" element={<EmailVerification />} /> 
//         </Routes>
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default App;


import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Login from './Pages/Login';
import Landingpage from './Pages/Landingpage';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import EmailVerification from './Pages/EmailVerification';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from './Features/Auth/authSlice';
import ResumeUpload from './Pages/ResumeUploadPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/auth/check-auth', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok && data.success && data.user) {
          dispatch(login({ user: data.user, token }));
        } else {
          console.warn("Token invalid or expired");
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          dispatch(logout());
        }
      } catch (err) {
        console.error("Auth check failed, but not logging out:", err);
        // Optionally, show a toast or notification here
        // Don't log out just because of a network failure
      }
    };

    checkAuth();
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/emailverification" element={<EmailVerification />} />
          <Route path="/resume-upload" element={<ResumeUpload />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
