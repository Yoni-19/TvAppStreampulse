
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Series from './pages/Series';
import Profile from './pages/Profile';
import { PageRoute } from './interfaces/types';
import Favorites from './pages/Favorites';
import Details from './pages/Details';
import Search from './pages/Search';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          
          {/* RUTAS PÚBLICAS (Cualquiera las puede ver) */}
          <Route path="/login" element={<Login />} />


          {/* RUTAS PROTEGIDAS (Solo si hay login) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path={`/${PageRoute.SERIES}`} element={<Series />} />
            <Route path={`/${PageRoute.PROFILE}`} element={<Profile />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/details/:type/:id" element={<Details />} />
            <Route path="/search" element={<Search />} />
          </Route>


          {/* Comodín: si no conoce la ruta, al Home (el guardia decidirá si lo deja entrar) */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
