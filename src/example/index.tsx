import React from 'react';

type Props = {
  className?: string,
  id?: string,
  children: any,
  kind?: string
}
export const Button: React.FC<Props> = ({ kind, ...props }) => (
  <button {...props} style={ kind ? {
    backgroundColor: 'orange'
  } : undefined }/>
);