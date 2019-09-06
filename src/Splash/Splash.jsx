import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
//import { Test } from './Splash.styles';

class Splash extends PureComponent { 
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  componentWillMount = () => {
    console.log('Splash will mount');
  }

  componentDidMount = () => {
    console.log('Splash mounted');
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('Splash will receive props', nextProps);
  }

  componentWillUpdate = (nextProps, nextState) => {
    console.log('Splash will update', nextProps, nextState);
  }

  componentDidUpdate = () => {
    console.log('Splash did update');
  }

  componentWillUnmount = () => {
    console.log('Splash will unmount');
  }

  render () {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <div className="SplashWrapper">
        Test content
      </div>
    );
  }
}

Splash.propTypes = {
  // bla: PropTypes.string,
};

Splash.defaultProps = {
  // bla: 'test',
};

export default Splash;
