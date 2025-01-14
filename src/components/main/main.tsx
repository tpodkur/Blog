import { Outlet } from 'react-router-dom';

import classes from './main.module.scss';

const Main = () => {
  return (
    <main className={classes.main}>
      <Outlet />
    </main>
  );
};

export default Main;
