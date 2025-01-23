import { createBrowserRouter } from 'react-router';
import { redirect } from 'react-router-dom';

import { requestArticles, requestArticle } from '../components/articles/articles-thunks.ts';
import App from '../components/app/app.tsx';
import ArticleList from '../components/articles/article-list/article-list.tsx';
import ArticlePage from '../components/articles/article-page/article-page.tsx';
import SignIn from '../components/forms/auth/sign-in/sign-in.tsx';
import SignUp from '../components/forms/auth/sign-up/sign-up.tsx';
import EditProfile from '../components/forms/edit-profile/edit-profile.tsx';
import CreateArticle from '../components/articles/create-article/create-article.tsx';
import EditArticle from '../components/articles/edit-article/edit-article.tsx';

import store from './store.ts';

const loadStore = () => new Promise((resolve) => setTimeout(() => resolve(store), 0));

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
          loadStore().then(() => store.dispatch(requestArticles()));
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
]);

export default router;
