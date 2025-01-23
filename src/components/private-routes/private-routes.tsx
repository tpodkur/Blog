import { Navigate, Outlet } from 'react-router-dom';

import { getToken } from '../../shared/token-provider.ts';

const PrivateRoutes = () => {
  const token = getToken();

  return token ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};

export default PrivateRoutes;
