import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    image: '',
    album: '',
    artist: '',
    tracks: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    const { artworkUrl100, collectionName, artistName } = response[0];

    this.setState({
      image: artworkUrl100,
      album: collectionName,
      artist: artistName,
      tracks: response.slice(1),
    });
  }

  render() {
    const { image, album, artist, tracks } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <p>Album</p>
        <div>
          <img src={ image } alt={ album } />
          <h3 data-testid="album-name">{album}</h3>
          <p data-testid="artist-name">{artist}</p>
          { tracks.map((music) => (
            <MusicCard
              key={ music.trackId }
              music={ music }
              trackId={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
            />
          ))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string,
}.isRequired;
