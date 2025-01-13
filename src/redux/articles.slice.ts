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
  requestStatus: 'idle' | 'pending' | 'success' | 'failed';
};

const initialArticlesState: ArticlesState = {
  entities: {},
  ids: [],
  page: 1,
  count: 0,
  requestStatus: 'idle',
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
    page: (state: ArticlesState) => state.page,
    count: (state: ArticlesState) => state.count,
    isRequestPending: (state: ArticlesState) => state.requestStatus === 'pending',
    isRequestFailed: (state: ArticlesState) => state.requestStatus === 'failed',
    isRequestSuccess: (state: ArticlesState) => state.requestStatus === 'success',
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
        requestStatus: 'success',
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
    requestPending: (state) => {
      return {
        ...state,
        requestStatus: 'pending',
      };
    },
    requestFailed: (state) => {
      return {
        ...state,
        requestStatus: 'failed',
      };
    },
  },
});
