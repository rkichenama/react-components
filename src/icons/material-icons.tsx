/* istanbul ignore file */

import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const iconStyle = `
  vertical-align: middle !important;
  font-size: 1em !important;
  color: currentColor;
`;

const GoogleMaterialIcons = createGlobalStyle`
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons+Outlined');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons+Round');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons+Sharp');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons+Two+Tone');

  .material-icons,
  .material-icons-sharp,
  .material-icons-two-tone,
  .material-icons-outlined,
  .material-icons-round {
    -webkit-font-feature-settings: "liga";
    -webkit-font-smoothing: antialiased;
    direction: ltr;
    display: inline-block;
    font-feature-settings: "liga";
    font-size: unset;
    font-style: normal;
    font-weight: normal;
    letter-spacing: normal;
    line-height: 1;
    text-transform: none;
    vertical-align: middle;
    white-space: nowrap;
    word-wrap: normal;
  }
  .material-icons { font-family: "Material Icons"; }
  .material-icons-outlined { font-family: "Material Icons Outlined"; }
  .material-icons-round { font-family: "Material Icons Round"; }
  .material-icons-two-tone { font-family: "Material Icons Two Tone"; }
  .material-icons-sharp { font-family: "Material Icons Sharp"; }
`

export const Reddit = styled(({ className, ...rest }) => (
  <>
    <GoogleMaterialIcons />
    <span className={`material-icons ${className}`} {...rest}>
      reddit
    </span>
  </>
))`
  ${iconStyle}
  color: red;
`;
export const Preview = styled(({ className, ...rest }) => (
  <>
    <GoogleMaterialIcons />
    <span className={`material-icons ${className}`} {...rest}>
      remove_red_eye
    </span>
  </>
))`
  ${iconStyle}
`;
export const Info = styled(({ className, ...rest }) => (
  <>
    <GoogleMaterialIcons />
    <span className={`material-icons ${className}`} {...rest}>
      info
    </span>
  </>
))`
  ${iconStyle}
`;
export const RightArrow = styled(({ className, ...rest }) => (
  <>
    <GoogleMaterialIcons />
    <span className={`material-icons-outlined ${className}`} {...rest}>
      arrow_circle_right
    </span>
  </>
))`
  ${iconStyle}
`;
export const Close = styled(({ className, ...rest }) => (
  <>
    <GoogleMaterialIcons />
    <span {...{ className: `material-icons ${className}`, }} >
      close
    </span>
  </>
))`
  ${iconStyle}
`;
export const Refresh = styled(({ className, ...rest }) => (
  <>
    <GoogleMaterialIcons />
    <span className={`material-icons ${className}`} {...rest}>
      refresh
    </span>
  </>
))`
  ${iconStyle}
`;
export const Expand = styled(({ className, ...rest }) => (
  <>
    <GoogleMaterialIcons />
    <span className={`material-icons ${className}`} {...rest}>
      expand
    </span>
  </>
))`
  ${iconStyle}
`;
export const Overscan = styled(({ className, ...rest }) => (
  <>
    <GoogleMaterialIcons />
    <span className={`material-icons ${className}`} {...rest}>
      settings_overscan
    </span>
  </>
))`
  ${iconStyle}
`;
export const OpenWith = styled(({ className, ...rest }) => (
  <>
    <GoogleMaterialIcons />
    <span className={`material-icons ${className}`} {...rest}>
      open_with
    </span>
  </>
))`
  ${iconStyle}
`;
export const CloseFullscreen = styled(({ className, ...rest }) => (
  <>
    <GoogleMaterialIcons />
    <span className={`material-icons ${className}`} {...rest}>
      close_fullscreen
    </span>
  </>
))`
  ${iconStyle}
`;

export const ThumbsDn = styled(({ className, ...rest }) => (
  <>
    <GoogleMaterialIcons />
    <span className={`material-icons ${className}`} {...rest}>
      thumb_down
    </span>
  </>
))`
  ${iconStyle}
`;

export const ThumbsUp = styled(({ className, ...rest }) => (
  <>
    <GoogleMaterialIcons />
    <span className={`material-icons ${className}`} {...rest}>
      thumb_up
    </span>
  </>
))`
  ${iconStyle}
`;

export const Prev = styled(({ className, ...rest }) => (
  <>
    <GoogleMaterialIcons />
    <span className={`material-icons ${className}`} {...rest}>
      navigate_before
    </span>
  </>
))`
  ${iconStyle}
`;
export const Next = styled(({ className, ...rest }) => (
  <>
    <GoogleMaterialIcons />
    <span className={`material-icons ${className}`} {...rest}>
      navigate_next
    </span>
  </>
))`
  ${iconStyle}
`;
