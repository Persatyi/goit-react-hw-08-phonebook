import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import Loader from 'components/Loader/Loader';
import Login from 'components/Login/Login';
import Navigation from 'components/Navigation/Navigation';
import EditContact from 'components/EditContact/EditContact';
import { refreshAccount } from 'redux/contacts-thunk';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const { token } = useSelector(state => state);
  const editState = useSelector(state => state.edit);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshAccount());
  }, [dispatch]);

  return !token ? (
    <>
      <Login />
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
  ) : (
    <div
      style={{
        padding: '10px',
      }}
    >
      <Navigation />
      <h1 className="title">Phonebook</h1>
      <ContactForm />
      <h2 className="title">Contacts</h2>
      <Filter />
      <ContactList />
      {!!editState ? <EditContact /> : null}
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
    </div>
  );
}
