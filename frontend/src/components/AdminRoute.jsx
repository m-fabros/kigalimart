import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  try {
    const storedUser = window.localStorage.getItem('kigalimart_user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    if (user?.isAdmin === true) return children;
  } catch {
    // invalid storage
  }
  return <Navigate to="/admin/login" replace />;
};

export default AdminRoute;