import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/app/app.tsx';
import store from './redux/store.ts';
import { requestArticles } from './shared/request-articles.ts';

store.dispatch(requestArticles());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
