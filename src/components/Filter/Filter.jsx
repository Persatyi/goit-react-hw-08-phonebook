import s from './Filter.module.css';
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { filterContacts } from 'redux/actions';
// import { useState, useEffect } from 'react';

export default function Filter(props) {
  const dispatch = useDispatch();
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

  const searchHandler = e => {
    const value = e.target.value.toLowerCase().trim();
    dispatch(filterContacts(value));
  };

  return (
    <Fragment>
      <input
        value={props.value}
        onChange={searchHandler}
        className={s.input}
        placeholder="Search contact"
      />
    </Fragment>
  );
}

// Filter.propTypes = {
//   findTarget: PropTypes.func.isRequired,
//   value: PropTypes.string.isRequired,
// };
