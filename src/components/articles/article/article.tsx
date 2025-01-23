import Markdown from 'markdown-to-jsx';
import { Link } from 'react-router-dom';
import { Button, ConfigProvider } from 'antd';

import { useAppSelector } from '../../../redux.ts';
import { userSlice } from '../../user-info/user.slice.ts';
import UserInfo from '../../user-info/user-info.tsx';
import { Article as ArticleType } from '../articles.slice.ts';

import classes from './article.module.scss';

type ArticleProps = {
  article: ArticleType;
  smallSize: boolean;
  showButtonsBlock: boolean;
};

const Article = ({ article, smallSize, showButtonsBlock = false }: ArticleProps) => {
  const { title, tags, text, author, image, date, favorited, favoritesCount } = article;
  const user = useAppSelector((state) => userSlice.selectors.user(state));
  const isMineArticle = author === user?.username;

  const shortenText = (charactersPerLine: number, linesCount: number, text: string) => {
    if (linesCount <= 0) return '';
    if (text.length <= charactersPerLine) return text;
    const slicedTextInArr = text.slice(0, charactersPerLine * linesCount).split(' ');
    slicedTextInArr.pop();
    return slicedTextInArr.join(' ') + ' ...';
  };

  const tagsLengthInSymbols = tags.reduce((acc, tag) => {
    return acc + tag.length;
  }, 0);
  // card width 820 -- 1 line tags: 42 symbols -- 1 text line: 100 symbols
  const tagsLinesCount = Math.ceil(tagsLengthInSymbols / 42);
  const shortText = shortenText(100, 3 - tagsLinesCount, text);

  const actionButtons = (
    <div className={classes.buttons}>
      <Button danger>Delete</Button>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              defaultColor: '#52C41A',
              defaultBorderColor: '#52C41A',
              defaultHoverBorderColor: 'rgba(82,196,26,0.7)',
              defaultHoverColor: 'rgba(82,196,26,0.7)',
            },
          },
        }}
      >
        <Link to={`/edit-article/${article.id}`}>
          <Button>Edit</Button>
        </Link>
      </ConfigProvider>
    </div>
  );

  return (
    <div className={classes.article}>
      <div className={classes.article__content}>
        <div className={classes.article__header}>
          <Link to={`/articles/${article.id}`} className={classes.link}>
            <h3 className={classes.article__title}>{title}</h3>
          </Link>
          <button className={`${classes.article__likes} ${classes.likes}`} disabled={true}>
            <span className={classes.likes__logo}>
              <img src={favorited ? '/src/assets/like--active.svg' : '/src/assets/like.svg'} />
            </span>
            <span className={classes.likes__count}>{favoritesCount}</span>
          </button>
        </div>
        <ul className={classes['tags-list']}>
          {tags
            .filter((tag) => !!tag.trim().length)
            .map((tag, ind) => (
              <li className={classes.tag} key={ind}>
                {tag}
              </li>
            ))}
        </ul>
        <Markdown className={classes.article__text}>{smallSize ? shortText : text}</Markdown>
      </div>
      <div>
        <UserInfo author={author} image={image} date={date} />
        {showButtonsBlock && isMineArticle && actionButtons}
      </div>
    </div>
  );
};

export default Article;
