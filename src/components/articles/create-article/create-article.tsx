import ArticleForm from '../../forms/article-form/article-form.tsx';

const CreateArticle = () => {
  return <ArticleForm id={''} formName={'Create new article'} doReset={true} formType={'create'} />;
};

export default CreateArticle;
