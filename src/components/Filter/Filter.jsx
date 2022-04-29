import s from './Filter.module.css';
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { filterContacts } from 'redux/actions';
import { filterSelector } from 'redux/selectors';
// import { useState, useEffect } from 'react';

export default function Filter() {
  const dispatch = useDispatch();
  const value = useSelector(state => filterSelector(state));

  const searchHandler = e => {
    const value = e.target.value.toLowerCase().trim();
    dispatch(filterContacts(value));
  };
  // const [filter, setFilter] = useState('');

  // useEffect(() => {
  //   save(contactKey, contacts);
  // }, [contacts]);

  // const findTarget = () => {
  //   return contacts.filter(el => el.name.toLowerCase().includes(filter));
  // };

  // const changeFilter = word => {
  //   setFilter(word);
  // };

  return (
    <Fragment>
      <input
        value={value}
        onChange={searchHandler}
        className={s.input}
        placeholder="Search contact"
      />
    </Fragment>
  );
}

Filter.propTypes = {
  searchHandler: PropTypes.func,
  value: PropTypes.string,
};
