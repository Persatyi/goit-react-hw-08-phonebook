import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoute({ children, ...routeProps }) {
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  return (
    <Route {...routeProps}>{isLoggedIn ? children : <Redirect to="/" />}</Route>
  );
}
