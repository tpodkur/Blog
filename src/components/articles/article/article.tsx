import { useState } from 'react';
import { format } from 'date-fns';
import Markdown from 'markdown-to-jsx';

import { Article as ArticleType } from '../articles.slice.ts';

import classes from './article.module.scss';

type ArticleProps = {
  article: ArticleType;
  smallSize: boolean;
};

const Article = ({ article, smallSize }: ArticleProps) => {
  const [hasError, setHasError] = useState(false);
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
          <h3 className={classes.article__title}>{title}</h3>
          <div className={`${classes.article__likes} ${classes.likes}`}>
            <button className={classes.likes__logo}>
              <img src={favorited ? '/src/assets/like--active.svg' : '/src/assets/like.svg'} />
            </button>
            <span className={classes.likes__count}>{favoritesCount}</span>
          </div>
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
      <div className={classes.user}>
        <div className={classes.user__label}>
          <p className={classes.user__name}>{author}</p>
          <p className={classes.date}>{format(new Date(date), 'PP')}</p>
        </div>
        <img
          className={classes.user__avatar}
          src={hasError ? '/src/assets/user.png' : avatar}
          alt="user avatar"
          onError={() => setHasError(!hasError)}
        />
      </div>
    </div>
  );
};

export default Article;
