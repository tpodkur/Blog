import axios from 'axios';
import { z } from 'zod';

const baseURL = 'https://blog-platform.kata.academy/api';

const ArticleDto = z.object({
  articles: z.array(
    z.object({
      slug: z.string(),
      title: z.string(),
      description: z.string(),
      tagList: z.array(z.string()),
      body: z.string(),
      author: z.object({
        username: z.string(),
        image: z.string(),
        following: z.boolean(),
      }),
      createdAt: z.string(),
      favorited: z.boolean(),
      favoritesCount: z.number(),
    })
  ),
  articlesCount: z.number(),
});

export const api = {
  getArticles: async () => {
    return await axios
      .get(`${baseURL}/articles`)
      .then((response) => {
        return ArticleDto.parse(response.data);
      })
      .catch(console.log);
  },
};
