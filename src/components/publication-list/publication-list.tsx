import Pagination from '../pagination/pagination.tsx';
import Publication from '../publication/publication.tsx';

import classes from './publication-list.module.scss';

const PublicationList = () => {
  return (
    <>
      <ul className={classes['publication-list']}>
        <li className={classes.publication}>
          <Publication />
        </li>
      </ul>
      <Pagination page={1} onPageChange={console.log} totalItemsCount={100} />
    </>
  );
};

export default PublicationList;
