import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    loading: false,
    favorite: false,
  };

  handleFavorite = async () => {
    this.setState({ loading: true });
    await addSong();
    this.setState({
      loading: false,
      favorite: true,
    });
  };

  render() {
    const { trackId, trackName, previewUrl } = this.props;
    const { loading, favorite } = this.state;
    const musicCard = (
      <>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor="input-favorite">
          Favorita
          <input
            id="input-favorite"
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            checked={ favorite }
            onChange={ this.handleFavorite }
          />
        </label>
      </>
    );

    return (
      <div className="music-card">
        { loading
          ? <Loading />
          : musicCard }
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;
