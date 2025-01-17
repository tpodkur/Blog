import { useAppSelector } from '../../store.ts';
import { userSlice } from '../user-info/user.slice.ts';

export const useAuth = () => {
  const { username, email, avatar } = useAppSelector((state) => userSlice.selectors.user(state));

  return {
    isLoggedIn: !!username,
    username,
    email,
    avatar,
  };
};
