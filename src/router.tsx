import { createBrowserRouter } from 'react-router';

import App from './components/app/app.tsx';
import ArticleList from './components/articles/article-list/article-list.tsx';
import ArticlePage from './components/articles/article-page/article-page.tsx';

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
    ],
  },
]);

export default router;
