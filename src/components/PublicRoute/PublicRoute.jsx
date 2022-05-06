import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children, restricted = false, ...routeProps }) => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  return (
    <Route {...routeProps}>
      {isLoggedIn && restricted ? <Redirect to="/contacts" /> : children}
    </Route>
  );
};

export default PublicRoute;
