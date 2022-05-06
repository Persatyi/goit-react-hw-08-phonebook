import { refreshAccount } from 'redux/contacts-thunk';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import Loader from 'components/Loader/Loader';
import Login from 'components/Login/Login';
import Navigation from 'components/Navigation/Navigation';
import EditContact from 'components/EditContact/EditContact';
// import { useHistory } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import PublicRoute from 'components/PublicRoute/PublicRoute';
// const Loader = lazy(() => import('components/Loader/Loader'));
// const Login = lazy(() => import('components/Login/Login'));
// const Navigation = lazy(() => import('components/Navigation/Navigation'));
// const ContactForm = lazy(() => import('components/ContactForm/ContactForm'));
// const Filter = lazy(() => import('components/Filter/Filter'));
// const ContactList = lazy(() => import('components/ContactList/ContactList'));
// const EditContact = lazy(() => import('components/EditContact/EditContact'));

export default function App() {
  // const { token } = useSelector(state => state);
  const editState = useSelector(state => state.edit);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshAccount());
  }, [dispatch]);

  return (
    <>
      <Switch>
        <PublicRoute path="/" restricted exact>
          <Login />
        </PublicRoute>
        <PrivateRoute path="/contacts">
          <Navigation />
          <h1 className="title">Phonebook</h1>
          <ContactForm />
          <h2 className="title">Contacts</h2>
          <Filter />
          <ContactList />
          {!!editState ? <EditContact /> : null}
        </PrivateRoute>
      </Switch>
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
