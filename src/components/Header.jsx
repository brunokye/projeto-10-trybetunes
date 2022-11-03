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
      <header className="nav" data-testid="header-component">
        <span data-testid="header-user-name">
          Opa,
          {' '}
          {user}
        </span>
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        <Link data-testid="link-to-profile" to="/profile">Profile</Link>
      </header>
    );
  }
}
