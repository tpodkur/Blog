import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '../../redux.ts';
import { userSlice } from '../user/user.slice.ts';

const PrivateRoutes = () => {
  const isLoggedIn = useAppSelector((state) => userSlice.selectors.isLoggedIn(state));

  return isLoggedIn ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};

export default PrivateRoutes;
