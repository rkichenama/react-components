import * as React from 'react';
import { measureText } from './measureText';

export const useTextWidth = (target: React.MutableRefObject<HTMLSpanElement>) => {
  // const context = getContext();
  const measurer = measureText();
  return React.useMemo(() => {
    const el = target.current;
    if (el?.textContent) {
      // const computedStyles = window.getComputedStyle(el);
      return measurer(el)(el.textContent);
    }
    return undefined;
  }, [ measurer, target ]);
};
