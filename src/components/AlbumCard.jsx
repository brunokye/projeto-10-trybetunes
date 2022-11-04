import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class AlbumCard extends Component {
  render() {
    const { getText, artistInfo } = this.props;

    return (
      <>
        <p>
          Resultado de álbuns de:
          {' '}
          { getText }
          {' '}
        </p>

        { artistInfo.map(({
          artistName, collectionId, collectionName, artworkUrl100,
        }) => (
          <Link
            data-testid={ `link-to-album-${collectionId}` }
            key={ collectionId }
            type="button"
            to={ `/album/${collectionId}` }
          >
            <div>
              <img src={ artworkUrl100 } alt={ collectionName } />
              <h3>{collectionName}</h3>
              <p>{artistName}</p>
            </div>
          </Link>
        ))}
      </>
    );
  }
}

AlbumCard.propTypes = {
  artistInfo: PropTypes.shape({
    artistName: PropTypes.string,
  }),
}.isRequired;
