/* istanbul ignore file */

import React from 'react';

type BoundaryProps = {
  children: any
}

class Boundary extends React.Component<BoundaryProps, { error: any }> {
  public state = {
    error: false
  };

  static getDerivedStateFromError (error) {
    return { error };
  }

  componentDidCatch (error, errorInfo) {
    console.groupCollapsed('Caught Error');
    console.info(error);
    console.info(errorInfo);
    console.groupEnd();
  }

  render () {
    return !this.state.error ? this.props.children : (
      <section className='bad'>
        An unhandled error occurred.
      </section>
    );
  }
}

export default Boundary;
