import { format } from 'date-fns';
import { useState } from 'react';

import classes from './user-info.module.scss';

type UserInfoProps = {
  author: string;
  avatar: string;
  date?: string;
};

const UserInfo = ({ author, avatar, date }: UserInfoProps) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={classes.user}>
      <div className={classes.user__label}>
        <p className={classes.user__name}>{author}</p>
        {date && <p className={classes.date}>{format(new Date(date), 'PP')}</p>}
      </div>
      <img
        className={classes.user__avatar}
        src={hasError ? '/src/assets/user.png' : avatar}
        alt="user avatar"
        onError={() => setHasError(!hasError)}
      />
    </div>
  );
};

export default UserInfo;
