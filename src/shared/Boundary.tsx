/* istanbul ignore file */

import React from 'react';

type BoundaryProps = {
  children: any
}

class Boundary extends React.Component<BoundaryProps, { error: any }> {
  constructor(props) {
    super(props);
    this.state = { error: false };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    console.groupCollapsed('Caught Error');
    console.info(error);
    console.info(errorInfo);
    console.groupEnd();
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;

    return !error ? children : (
      <section className='bad'>
        An unhandled error occurred.
      </section>
    );
  }
}

export default Boundary;
