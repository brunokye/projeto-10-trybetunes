import React, { Component } from 'react';
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
        <span data-testid="header-user-name">
          Perdemo,
          {' '}
          {user}
        </span>
      </header>
    );
  }
}
