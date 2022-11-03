import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  state = {
    userName: '',
    buttonLogin: true,
    loading: false,
    redirect: false,
  };

  checkLogin = (event) => {
    const { value } = event.target;
    const minValue = 3;
    const verifyLength = value.length < minValue;

    this.setState({
      userName: value,
      buttonLogin: verifyLength,
    });
  };

  handleClick = async () => {
    const { userName } = this.state;

    this.setState({
      loading: true,
    });

    await createUser({ name: userName });

    this.setState({
      redirect: true,
    });
  };

  render() {
    const { buttonLogin, loading, redirect } = this.state;
    if (redirect) return <Redirect to="/search" />;
    if (loading) return <Loading />;

    return (
      <div className="login" data-testid="page-login">
        <label htmlFor="input-name">
          Nome
          <input
            id="input-name"
            data-testid="login-name-input"
            type="text"
            onChange={ this.checkLogin }
          />
        </label>

        <button
          id="button-login"
          data-testid="login-submit-button"
          type="button"
          disabled={ buttonLogin }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}
