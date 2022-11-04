import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  state = {
    user: {},
    loading: true,
  };

  async componentDidMount() {
    const response = await getUser();

    this.setState({
      user: response.name,
      loading: false,
    });
  }

  render() {
    const { user, loading } = this.state;
    if (loading) return <Loading />;

    return (
      <header data-testid="header-component">
        <h1>TrybeTunes</h1>
        <span data-testid="header-user-name">
          Perdemo,
          {' '}
          {user}
        </span>
        <div className="nav">
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </div>
      </header>
    );
  }
}
