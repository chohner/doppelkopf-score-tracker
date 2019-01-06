import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

class ErrorCatcher extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <Header as='h3' textAlign='center' content="Something went wrong - try resetting (top right) + reloading"/>;
    }
    return this.props.children;
  }
}

export default ErrorCatcher;
