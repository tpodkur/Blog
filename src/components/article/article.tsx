import { Article as ArticleType } from '../../redux/articles.slice.ts';

import classes from './article.module.scss';

const Article = ({ title, tags, text, author, avatar, date }: ArticleType) => {
  const shortenText = (charactersPerLine: number, linesCount: number, text: string) => {
    if (linesCount < 0) return '';
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
              <img src="./src/assets/like.svg" />
            </button>
            <span className={classes.likes__count}>12</span>
          </div>
        </div>
        <ul className={classes['tags-list']}>
          {tags.map((tag, ind) => (
            <li className={classes.tag} key={ind}>
              {tag}
            </li>
          ))}
        </ul>
        <p className={classes.article__text}>{shortText}</p>
      </div>
      <div className={classes.user}>
        <div className={classes.user__label}>
          <p className={classes.user__name}>{author}</p>
          <p className={classes.date}>{date}</p>
        </div>
        {/*<img className={classes.user__avatar} src="./src/assets/user.png" alt="user avatar" />*/}
        <img className={classes.user__avatar} src={avatar} alt="user avatar" />
      </div>
    </div>
  );
};

export default Article;
