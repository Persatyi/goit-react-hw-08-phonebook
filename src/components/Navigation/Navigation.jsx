import { useDispatch } from 'react-redux';
import { logOut } from 'redux/contacts-thunk';

const Navigation = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logOut());
  };

  return (
    <>
      <button onClick={logout}>logout</button>
    </>
  );
};

export default Navigation;
