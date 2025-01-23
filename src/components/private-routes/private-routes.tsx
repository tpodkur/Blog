import { Navigate, Outlet } from 'react-router-dom';

import { getToken } from '../../shared/token-provider.ts';

const PrivateRoutes = () => {
  const token = getToken();

  return token ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default PrivateRoutes;
