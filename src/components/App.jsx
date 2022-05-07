import { refreshAccount } from 'redux/contacts-thunk';
import { useEffect, lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'components/Loader/Loader';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import PublicRoute from 'components/PublicRoute/PublicRoute';
const Login = lazy(() => import('components/Login/Login'));
const Navigation = lazy(() => import('components/Navigation/Navigation'));
const ContactForm = lazy(() => import('components/ContactForm/ContactForm'));
const Filter = lazy(() => import('components/Filter/Filter'));
const ContactList = lazy(() => import('components/ContactList/ContactList'));
const EditContact = lazy(() => import('components/EditContact/EditContact'));

export default function App() {
  // const { token } = useSelector(state => state);
  const editState = useSelector(state => state.edit);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshAccount());
  }, [dispatch]);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Switch>
          <PublicRoute path="/" restricted exact>
            <Login />
          </PublicRoute>
          <PrivateRoute path="/contacts">
            <Navigation />
            <ContactForm />
            <Filter />
            <ContactList />
            {!!editState ? <EditContact /> : null}
          </PrivateRoute>
        </Switch>
      </Suspense>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Loader />
    </>
  );
}
