import * as React from 'react';

export const useElementWidth = (ref: React.MutableRefObject<HTMLElement>) => {
  const [ width, setWidth ] = React.useState(0);

  const observer = React.useMemo(() => (
    new ResizeObserver((events) => {
      for (const event of events) {
        if (event.contentBoxSize) {
          setWidth(event.contentRect.width);
        }
      }
    })
  ), [ setWidth ]);

  React.useLayoutEffect(() => {
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [ observer, ref ]);

  return width;
};
