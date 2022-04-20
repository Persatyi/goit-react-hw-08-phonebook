import s from './Filter.module.css';
import { Fragment } from 'react';
import PropTypes from 'prop-types';

export default function Filter(props) {
  const searchHandler = e => {
    const value = e.target.value.toLowerCase().trim();
    props.findTarget(value);
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

Filter.propTypes = {
  findTarget: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
