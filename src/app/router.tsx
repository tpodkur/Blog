import { createBrowserRouter } from 'react-router';
import { redirect } from 'react-router-dom';

import { requestArticles, requestArticle } from '../components/articles/articles-thunks.ts';
import App from '../components/app/app.tsx';
import PrivateRoutes from '../components/private-routes/private-routes.tsx';
import ArticleList from '../components/articles/article-list/article-list.tsx';
import ArticlePage from '../components/articles/article-page/article-page.tsx';
import SignIn from '../components/forms/auth/sign-in/sign-in.tsx';
import SignUp from '../components/forms/auth/sign-up/sign-up.tsx';
import EditProfile from '../components/forms/edit-profile/edit-profile.tsx';
import CreateArticle from '../components/articles/create-article/create-article.tsx';
import EditArticle from '../components/articles/edit-article/edit-article.tsx';
import PleaseAuthMessage from '../components/please-auth-message/please-auth-message.tsx';
import PageNotFound from '../components/page-not-found/page-not-found.tsx';

import store from './store.ts';

const loadStore = () => new Promise((resolve) => setTimeout(() => resolve(store), 0));

const privateRoutes = {
  editProfile: '/edit-profile',
  newArticle: '/new-article',
  editArticle: /\/articles\/.*\/edit/,
};

export const isPrivateRoute = (pathname: string) => {
  const { editProfile, newArticle, editArticle } = privateRoutes;
  return editProfile === pathname || newArticle === pathname || editArticle.test(pathname);
};

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
          loadStore().then(() => store.dispatch(requestArticles({})));
          return null;
        },
      },
      {
        path: 'articles/:articleId',
        Component: ArticlePage,
        loader: ({ params }) => {
          loadStore().then(() => store.dispatch(requestArticle(params.articleId ?? '')));
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
      {
        path: 'unauthorized',
        Component: PleaseAuthMessage,
      },
      {
        Component: PrivateRoutes,
        children: [
          {
            path: 'edit-profile',
            Component: EditProfile,
          },
          {
            path: 'new-article',
            Component: CreateArticle,
          },
          {
            path: 'articles/:articleId/edit',
            Component: EditArticle,
            loader: ({ params }) => {
              loadStore().then(() => store.dispatch(requestArticle(params.articleId ?? '')));
              return null;
            },
          },
        ],
      },
      {
        path: '*',
        Component: PageNotFound,
      },
    ],
  },
]);

export default router;
