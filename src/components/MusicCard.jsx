import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    loading: false,
    favorite: false,
  };

  async componentDidMount() {
    const { trackName } = this.props;
    const response = await getFavoriteSongs();

    this.setState({
      favorite: response.some(({ trackName: name }) => name === trackName),
    });
  }

  handleFavorite = async (event, music) => {
    const { checked } = event.target;
    const { favorite } = this.state;

    this.setState({
      loading: true,
      favorite: checked,
    });

    if (favorite) await removeSong(music);
    if (!favorite) await addSong(music);

    this.setState({ loading: false });
  };

  render() {
    const { music, trackId, trackName, previewUrl } = this.props;
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
            onChange={ (event) => this.handleFavorite(event, music) }
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
  trackId: PropTypes.string,
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;
