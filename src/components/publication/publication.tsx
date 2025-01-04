import classes from './publication.module.scss';

const Publication = () => {
  return (
    <div className={classes.publication}>
      <div className={classes.publication__content}>
        <div className={classes.publication__header}>
          <h3 className={classes.publication__title}>Some article title</h3>
          <div className={`${classes.publication__likes} ${classes.likes}`}>
            <button className={classes.likes__logo}>
              <img src="./src/assets/like.svg" />
            </button>
            <span className={classes.likes__count}>12</span>
          </div>
        </div>
        <ul className={classes['tags-list']}>
          <li className={classes.tag}>Tag1</li>
          <li className={classes.tag}>Tag2</li>
          <li className={classes.tag}>Tag3Tag3Tag3Tag3Tag3Tag3Tag3Tag3</li>
          <li className={classes.tag}>Tag3Tag3Tag3Tag3Tag3Tag3Tag3Tag3</li>
          <li className={classes.tag}>Tag1</li>
        </ul>
        <p className={classes.publication__text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.{' '}
        </p>
      </div>
      <div className={classes.user}>
        <div className={classes.user__label}>
          <p className={classes.user__name}>John Doe</p>
          <p className={classes.date}>March 5, 2020</p>
        </div>
        <img className={classes.user__avatar} src="./src/assets/user.png" alt="user avatar" />
      </div>
    </div>
  );
};

export default Publication;
