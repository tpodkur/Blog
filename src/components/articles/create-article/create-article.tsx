import ArticleForm from '../../forms/article-form/article-form.tsx';
import { createArticle } from '../articles-thunks.ts';

const CreateArticle = () => {
  return <ArticleForm formName={'Create new article'} actionThunkToDispatchBySubmit={createArticle} doReset={true} />;
};

export default CreateArticle;
