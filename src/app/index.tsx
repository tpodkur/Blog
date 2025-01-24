import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { getUser } from '../components/user/user-thunks.ts';
import { getToken } from '../shared/token-provider.ts';

import store from './store.ts';
import router from './router.tsx';

const token = getToken();
if (token) {
  store.dispatch(getUser());
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
