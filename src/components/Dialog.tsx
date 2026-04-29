import React, { useState } from 'react';

export const MyDialog = ({ show }: { show: boolean }) => {
  const [showDialog, setShowDialog] = useState(show);

  return (
    <dialog open={showDialog}>
      <h1>My Dialog</h1>
      <p>Some dialog content goes here.</p>
      <button type='button' onClick={() => setShowDialog(false)}>Close Dialog</button>
    </dialog>
  );
};
