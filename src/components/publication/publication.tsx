import classes from './publication.module.scss';

const Publication = () => {
  return (
    <div className={classes.publication}>
      <div className={classes.publication__content}></div>
      <div className={classes.publication__author}></div>
    </div>
  );
};

export default Publication;
