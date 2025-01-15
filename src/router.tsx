import { createBrowserRouter } from 'react-router';

import App from './components/app/app.tsx';
import ArticleList from './components/articles/article-list/article-list.tsx';
import ArticlePage from './components/articles/article-page/article-page.tsx';
import SignIn from './components/auth/sign-in/sign-in.tsx';
import SignUp from './components/auth/sign-up/sign-up.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: ArticleList,
      },
      {
        path: 'articles/:articleId',
        Component: ArticlePage,
      },
      {
        path: 'sign-in',
        Component: SignIn,
      },
      {
        path: 'sign-up',
        Component: SignUp,
      },
    ],
  },
]);

export default router;
