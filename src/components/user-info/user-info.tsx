import { format } from 'date-fns';
import { useState } from 'react';

import classes from './user-info.module.scss';

type UserInfoProps = {
  author: string;
  image: string;
  date?: string;
};

const UserInfo = ({ author, image, date }: UserInfoProps) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={classes.user}>
      <div className={classes.user__label}>
        <p className={classes.user__name}>{author}</p>
        {date && <p className={classes.date}>{format(new Date(date), 'PP')}</p>}
      </div>
      <img
        className={classes.user__image}
        src={hasError ? '/src/assets/user.png' : image}
        alt="user image"
        onError={() => setHasError(!hasError)}
      />
    </div>
  );
};

export default UserInfo;
