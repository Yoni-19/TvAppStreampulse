import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // 1. Revisamos si existe el permiso en el navegador
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  // 2. Si NO está autenticado, lo mandamos al login de una vez
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 3. Si SÍ está autenticado, dejamos que vea la ruta (Outlet)
  return <Outlet />;
};

export default ProtectedRoute;