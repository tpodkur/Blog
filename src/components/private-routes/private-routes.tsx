import { Outlet } from 'react-router-dom';

import store from '../../app/store.ts';
import { getUser } from '../user/user-thunks.ts';
import router from '../../app/router.tsx';

const PrivateRoutes = () => {
  store.dispatch(getUser()).then((res) => {
    if (res.meta.requestStatus === 'rejected') {
      router.navigate('/unauthorized');
    }
  });

  return <Outlet />;
};

export default PrivateRoutes;
