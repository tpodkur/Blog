import axios from 'axios';
import { z } from 'zod';

const baseURL = 'https://blog-platform.kata.academy/api';

const ArticleDto = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  tagList: z.array(z.string()).or(z.null()),
  body: z.string().or(z.undefined()),
  author: z.object({
    username: z.string(),
    image: z.string(),
    following: z.boolean(),
  }),
  createdAt: z.string(),
  favorited: z.boolean(),
  favoritesCount: z.number(),
});

const ArticlesDto = z.object({
  articles: z.array(ArticleDto),
  articlesCount: z.number(),
});

export const api = {
  getArticles: async (offset: number = 0) => {
    return await axios.get(`${baseURL}/articles?offset=${offset}`).then((response) => {
      return ArticlesDto.parse(response.data);
    });
  },

  getArticleById: async (articleId: string) => {
    return await axios.get(`${baseURL}/articles/${articleId}`).then((response) => {
      return ArticleDto.parse(response.data.article);
    });
  },
};
