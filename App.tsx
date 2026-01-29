
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { mockApi } from './services/mockApi';
import { AdminUser } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = mockApi.getAuth();
    setUser(auth);
    setLoading(false);
  }, []);

  if (loading) return <div className="h-screen w-screen flex items-center justify-center">Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/admin/login" 
          element={user ? <Navigate to="/admin" /> : <AdminLogin onLogin={setUser} />} 
        />
        <Route 
          path="/admin/*" 
          element={user ? <AdminDashboard user={user} onLogout={() => setUser(null)} /> : <Navigate to="/admin/login" />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
