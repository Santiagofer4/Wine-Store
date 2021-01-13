import React, { useEffect, useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import tokenManager from '../utils/tokenManager';
import { tokenSelector } from '../../selectors';

import store from '../../store';
import { useSelector } from 'react-redux';

function checkAuth({ children, ...rest }) {
  const token = useSelector(tokenSelector);
  const [logged, setLogged] = useState(false);

  const isLogged = (token) => {
    if (!token) {
      tokenManager.tryToRestoreToken();
    } else setLogged(true);
  };

  const isAdmin = () => {};
  useEffect(() => {}, []);
  return (
    <>
      {
        <Route
          {...rest}
          render={(props) =>
            logged ? { children } : <Redirect to="/form/user/login" />
          }
        />
      }
    </>
  );
}

export default checkAuth;

class RequireAuth extends Component {
  state = { isAuthenticated: false };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.props.location.pathname !== prevProps.location.pathname &&
      !this.state.isAuthenticated
    ) {
      this.props.history.push('/');
    }
  };

  isAuthed = () => this.setState({ isAuthenticated: true });

  unAuth = () => this.setState({ isAuthenticated: false });

  render = () =>
    !this.state.isAuthenticated ? (
      <Login isAuthed={this.isAuthed} />
    ) : (
      <Fragment>
        <Header unAuth={this.unAuth} />
        {this.props.children}
      </Fragment>
    );
}

export default withRouter(RequireAuth);
