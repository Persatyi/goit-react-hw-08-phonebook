import s from './Login.module.css';
import { Fragment, useReducer } from 'react';
import data from 'db/input.json';
import { useDispatch } from 'react-redux';
import { createAccount, loginUser } from 'redux/contacts-thunk';
import image from 'images/5.jpg';

const Login = () => {
  const dispatch = useDispatch();

  const initialState = { name: '', email: '', password: '', isRegister: true };

  const initialTypes = {
    name: 'name',
    password: 'password',
    reset: 'reset',
    email: 'email',
    login: 'login',
  };

  const login = e => {
    e.preventDefault();

    const userData = {
      email: state.email,
      password: state.password,
    };

    dispatch(loginUser(userData));
  };

  const signUp = e => {
    e.preventDefault();

    const userData = {
      name: state.name,
      email: state.email,
      password: state.password,
    };

    dispatch(createAccount(userData));
  };

  const [state, dispatchLocal] = useReducer(reducer, initialState);

  function reducer(state, action) {
    const { type, payload } = action;
    switch (type) {
      case initialTypes.name:
        return { ...state, name: payload };
      case initialTypes.password:
        return { ...state, password: payload };
      case initialTypes.reset:
        return initialState;
      case initialTypes.email:
        return { ...state, email: payload };
      case initialTypes.login:
        return { ...state, isRegister: false };
      default:
        return state;
    }
  }

  const controlTheInput = e => {
    const { value, name } = e.target;
    dispatchLocal({ type: name, payload: value });
  };

  const switchForm = e => {
    const { name } = e.target;
    dispatchLocal({ type: name });
  };

  const { name, email, password } = data;
  return (
    <Fragment>
      <div className={s.wrapper}>
        <h1>Welcome to phonebook</h1>
        <p className={s.text}>
          If you want to continue please login or create an account
        </p>
        <div className={s.positionWrapper}>
          <div className={s.imgWrapper}>
            <img src={image} alt="meme" className={s.img} />
          </div>
          <form className={s.form} onSubmit={state.isRegister ? signUp : login}>
            <div className={s.switcherWrapper}>
              <button
                className={state.isRegister ? s.switcher : s.activeSwitcher}
                type="button"
                name="login"
                onClick={switchForm}
              >
                Login
              </button>
              <button
                className={state.isRegister ? s.activeSwitcher : s.switcher}
                type="button"
                name="reset"
                onClick={switchForm}
              >
                Sign Up
              </button>
            </div>
            {state.isRegister && (
              <>
                <label className={s.label} htmlFor={name.id}>
                  {name.name}
                </label>
                <input
                  onChange={controlTheInput}
                  value={state.name}
                  id={name.id}
                  className={s.input}
                  type={name.type}
                  name={name.name}
                  pattern={name.pattern}
                  title={name.title}
                  required
                />
              </>
            )}
            <label className={s.label} htmlFor={email.id}>
              {email.name}
            </label>
            <input
              onChange={controlTheInput}
              value={state.email}
              id={email.id}
              className={s.input}
              type={email.type}
              name={email.name}
              pattern={email.pattern}
              title={email.title}
              required
            />
            <label className={s.label} htmlFor={password.id}>
              {password.name}
            </label>
            <input
              onChange={controlTheInput}
              value={state.password}
              id={password.id}
              className={s.input}
              type={password.type}
              name={password.name}
              pattern={password.pattern}
              title={password.title}
              required
            />
            <button className={s.button} type="submit">
              {state.isRegister ? 'Create Account' : "Ok, I'll do it"}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
