import { AppThunk } from '../redux/store.ts';
import { publicationsSlice, Publication } from '../redux/publications.slice.ts';

export const requestArticles =
  (): AppThunk =>
  (dispatch, _, { api }) => {
    api.getPublications().then((response) => {
      const publications = response
        ? response?.articles.map(
            (article) =>
              ({
                id: article.slug,
                title: article.title,
                tags: article.tagList,
                text: article.body,
                author: article.author.username,
                avatar: article.author.image,
                date: article.createdAt,
              }) satisfies Publication
          )
        : [];

      dispatch(publicationsSlice.actions.savePublications({ publications }));
    });
  };
