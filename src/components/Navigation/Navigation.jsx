import s from './Navigation.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from 'redux/contacts-thunk';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { AiOutlineUser } from 'react-icons/ai';

const Navigation = () => {
  const dispatch = useDispatch();
  const email = useSelector(state => state.user.email);

  const logout = () => {
    dispatch(logOut());
  };

  return (
    <nav className={s.navigation}>
      <div className={s.logo}>
        <AiOutlineUser />
      </div>
      <p className={s.email}>{email}</p>
      <button className={s.logout} onClick={logout} title="Logout">
        <RiLogoutBoxRLine />
      </button>
    </nav>
  );
};

export default Navigation;
