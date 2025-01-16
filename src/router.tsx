import { createBrowserRouter } from 'react-router';
import { redirect } from 'react-router-dom';

import App from './components/app/app.tsx';
import ArticleList from './components/articles/article-list/article-list.tsx';
import ArticlePage from './components/articles/article-page/article-page.tsx';
import SignIn from './components/auth/sign-in/sign-in.tsx';
import SignUp from './components/auth/sign-up/sign-up.tsx';
import store from './store.ts';
import { requestArticles, requestArticle } from './components/articles/articles-thunks.ts';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        loader: () => redirect('/articles'),
      },
      {
        path: 'articles',
        Component: ArticleList,
        loader: () => {
          store.dispatch(requestArticles());
          return null;
        },
      },
      {
        path: 'articles/:articleId',
        Component: ArticlePage,
        loader: ({ params }) => {
          store.dispatch(requestArticle(params.id ?? ''));
          return null;
        },
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
