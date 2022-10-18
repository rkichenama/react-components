import * as React from 'react';
import styled from 'styled-components';
import { TruncateProps } from './types';
import { measureText } from './measureText';
import { middleTruncate } from './middleTruncate';
import { useTextWidth } from './useTextWidth';
import { useElementWidth } from './useElementWidth';

const Truncate = ({
  text = 'This is some text to truncate.',
  seperator,
  ...rest
}: TruncateProps) => {
  const [truncated, setTruncated] = React.useState(text);
  const ref = React.useRef<HTMLSpanElement>();
  const textWidth = useTextWidth(ref);
  const elementWidth = useElementWidth(ref);

  const measure = React.useMemo<ReturnType<typeof measureText>>(measureText, []);

  const findFit = React.useCallback((el: HTMLElement) => {
    if (elementWidth) {
      const measureStyled = measure(el);
      let maxChars = text.length;
      let txt = middleTruncate(text, maxChars, seperator);
      while (maxChars > 0 && measureStyled(txt) > elementWidth) {
        txt = middleTruncate(text, --maxChars, seperator);
      }
      setTruncated(txt);
    }
  }, [elementWidth, measure, seperator, text]);

  React.useEffect(() => {
    if (ref.current /* && textWidth > elementWidth */) {
      findFit(ref.current);
    }
  }, [textWidth, elementWidth, ref, findFit]);

  return (
    <Span {...{ ref, title: text }} {...rest}>
      {truncated}
    </Span>
  );
};

const Span = styled.span`
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  padding: 0;
  margin: 0;
  vertical-align: text-bottom;
`;
export default Truncate;
