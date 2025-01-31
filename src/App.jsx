import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Dashboard from './components/Dashboard';
import AuthScreen from './components/AuthScreen';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user?.email) {
        recordLogin(session.user.email, import.meta.env.VITE_PUBLIC_APP_ENV).catch(console.error);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Caricamento...</div>;

  return (
    <Router>
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">Virtual Organizer</Link>
          {session && (
            <button
              onClick={() => supabase.auth.signOut()}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Esci
            </button>
          )}
        </div>
      </nav>

      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={session ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/add-appointment" element={session ? <AddAppointment clients={[]} onAdd={() => {}} /> : <Navigate to="/login" />} />
          <Route path="/add-client" element={session ? <AddClient onAdd={() => {}} /> : <Navigate to="/login" />} />
          <Route path="/login" element={!session ? <AuthScreen /> : <Navigate to="/" />} />
        </Routes>
      </div>

      <footer className="bg-white border-t mt-8">
        <div className="max-w-6xl mx-auto px-4 py-4 text-center text-sm text-gray-600">
          Made on <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">ZAPT</a>
        </div>
      </footer>
    </Router>
  );
}

export default App;