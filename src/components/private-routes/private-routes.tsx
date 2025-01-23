import { Navigate, Outlet } from 'react-router-dom';

import { getToken } from '../../shared/token-provider.ts';

const PrivateRoutes = () => {
  return getToken() ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};

export default PrivateRoutes;
