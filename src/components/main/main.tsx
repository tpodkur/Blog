import PublicationList from '../publication-list/publication-list.tsx';

import classes from './main.module.scss';

const Main = () => {
  return (
    <main className={classes.main}>
      <PublicationList />
    </main>
  );
};

export default Main;
