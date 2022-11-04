import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SearchArtist extends Component {
  render() {
    const { buttonSearch, searchInput, checkSearch, searchAlbum } = this.props;

    return (
      <p className="search">
        <input
          type="text"
          id="input-artist"
          data-testid="search-artist-input"
          value={ searchInput }
          onChange={ checkSearch }
        />

        <button
          id="button-search"
          data-testid="search-artist-button"
          type="button"
          disabled={ buttonSearch }
          onClick={ searchAlbum }
        >
          Pesquisar
        </button>
      </p>
    );
  }
}

SearchArtist.propTypes = {
  buttonSearch: PropTypes.bool,
  searchInput: PropTypes.string,
  checkSearch: PropTypes.func,
  searchAlbum: PropTypes.func,
}.isRequired;
