import Markdown from 'markdown-to-jsx';
import { Link } from 'react-router-dom';

import UserInfo from '../../user-info/user-info.tsx';
import { Article as ArticleType } from '../articles.slice.ts';

import classes from './article.module.scss';

type ArticleProps = {
  article: ArticleType;
  smallSize: boolean;
};

const Article = ({ article, smallSize }: ArticleProps) => {
  const { title, tags, text, author, avatar, date, favorited, favoritesCount } = article;

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
        <UserInfo author={author} avatar={avatar} date={date} />
      </div>
    </div>
  );
};

export default Article;
