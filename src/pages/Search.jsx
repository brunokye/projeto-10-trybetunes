import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    buttonSearch: true,
  };

  checkSearch = (event) => {
    const { value } = event.target;
    const minLength = 2;
    const verifyLength = value.length < minLength;

    this.setState({
      buttonSearch: verifyLength,
    });
  };

  render() {
    const { buttonSearch } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <p className="search">
          <input
            type="text"
            id="input-artist"
            data-testid="search-artist-input"
            onChange={ this.checkSearch }
          />

          <button
            id="button-search"
            data-testid="search-artist-button"
            type="button"
            disabled={ buttonSearch }
          >
            Pesquisar
          </button>
        </p>
      </div>
    );
  }
}
