import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ArticleId = string;

export type Article = {
  id: string;
  title: string;
  tags: string[];
  text: string;
  author: string;
  avatar: string;
  date: string;
  favorited: boolean;
  favoritesCount: number;
};

type ArticlesState = {
  entities: Record<ArticleId, Article>;
  ids: ArticleId[];
  page: number;
  count: number;
  requestArticlesStatus: 'idle' | 'pending' | 'success' | 'failed';
  requestArticleStatus: 'idle' | 'pending' | 'success' | 'failed';
};

const initialArticlesState: ArticlesState = {
  entities: {},
  ids: [],
  page: 1,
  count: 0,
  requestArticlesStatus: 'idle',
  requestArticleStatus: 'idle',
};

export const articlesSlice = createSlice({
  name: 'article',
  initialState: initialArticlesState,
  selectors: {
    articles: createSelector(
      (state: ArticlesState) => state.entities,
      (state: ArticlesState) => state.ids,
      (entities, ids) => {
        return ids.map((id) => entities[id]);
      }
    ),
    page: (state) => state.page,
    count: (state) => state.count,
    articleById: (state, articleId: string) => state.entities[articleId],
    isRequestArticlesIdle: (state) => state.requestArticlesStatus === 'idle',
    isRequestArticlesPending: (state) => state.requestArticlesStatus === 'pending',
    isRequestArticlesFailed: (state) => state.requestArticlesStatus === 'failed',
    isRequestArticlesSuccess: (state) => state.requestArticlesStatus === 'success',
    isRequestArticlePending: (state) => state.requestArticleStatus === 'pending',
    isRequestArticleFailed: (state) => state.requestArticleStatus === 'failed',
    isRequestArticleSuccess: (state) => state.requestArticleStatus === 'success',
  },
  reducers: {
    saveArticles: (state, action: PayloadAction<{ articles: Article[]; count: number }>) => {
      const { articles, count } = action.payload;
      return {
        ...state,
        entities: {
          ...articles.reduce((acc: Record<ArticleId, Article>, article: Article) => {
            return {
              ...acc,
              [article.id]: article,
            };
          }, {}),
        },
        ids: [...articles.map((a) => a.id)],
        requestArticlesStatus: 'success',
        count,
      };
    },
    changePage: (state, action: PayloadAction<{ page: number }>) => {
      const { page } = action.payload;
      return {
        ...state,
        page,
      };
    },
    requestArticlesPending: (state) => {
      return {
        ...state,
        requestArticlesStatus: 'pending',
      };
    },
    requestArticlesFailed: (state) => {
      return {
        ...state,
        requestArticlesStatus: 'failed',
      };
    },
    saveArticle: (state, action: PayloadAction<{ article: Article }>) => {
      const { article } = action.payload;
      return {
        ...state,
        requestArticleStatus: 'success',
        entities: {
          ...state.entities,
          [article.id]: article,
        },
      };
    },
    requestArticlePending: (state) => {
      return {
        ...state,
        requestArticleStatus: 'pending',
      };
    },
    requestArticleFailed: (state) => {
      return {
        ...state,
        requestArticleStatus: 'failed',
      };
    },
  },
});
