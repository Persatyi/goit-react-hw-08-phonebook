import s from './Filter.module.css';
import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class Filter extends Component {
  static propTypes = {
    findTarget: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
  };

  searchHandler = e => {
    const value = e.target.value.toLowerCase().trim();
    this.props.findTarget(value);
  };

  render() {
    return (
      <Fragment>
        <input
          value={this.props.filter}
          onChange={this.searchHandler}
          className={s.input}
          placeholder="Search contact"
        />
      </Fragment>
    );
  }
}

export default Filter;
