import { Component } from 'react';
import { FilterWrapper, FilterTitle } from './App.styled';
import PropTypes from 'prop-types';

export class Filter extends Component {
  render() {
    const { filter, handleChange } = this.props;
    return (
      <FilterWrapper>
        <FilterTitle>Find contacts by name:</FilterTitle>
        <input
          type=""
          name="filter"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
          value={filter}
        />
      </FilterWrapper>
    );
  }
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
