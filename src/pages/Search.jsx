import React, { Component } from 'react';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import SearchArtist from '../components/SearchArtist';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state = {
    waiting: true,
    buttonSearch: true,
    searchInput: '',
    getText: '',
    artistInfo: [],
  };

  checkSearch = (event) => {
    const { value } = event.target;
    const minLength = 2;
    const verifyLength = value.length < minLength;

    this.setState({
      searchInput: value,
      buttonSearch: verifyLength,
    });
  };

  searchAlbum = async () => {
    const { searchInput } = this.state;
    const getAlbum = await searchAlbumsAPI(searchInput);

    this.setState({
      waiting: false,
      getText: searchInput,
      searchInput: '',
      artistInfo: getAlbum,
    });
  };

  render() {
    const { waiting, buttonSearch, searchInput, getText, artistInfo } = this.state;
    const { checkSearch, searchAlbum } = this;
    const searchArtistAlbum = (artistInfo.length === 0
      ? <p>Nenhum álbum foi encontrado</p>
      : <AlbumCard getText={ getText } artistInfo={ artistInfo } />
    );

    return (
      <div data-testid="page-search">
        <Header />
        <SearchArtist
          buttonSearch={ buttonSearch }
          searchInput={ searchInput }
          checkSearch={ checkSearch }
          searchAlbum={ searchAlbum }
        />
        { waiting ? '' : searchArtistAlbum }
      </div>
    );
  }
}
