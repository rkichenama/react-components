const getContext = () => {
  const fragment = document.createDocumentFragment();
  const canvas = document.createElement('canvas');
  fragment.appendChild(canvas);
  return canvas.getContext('2d');
};
export const measureText = () => {
  const ctx = getContext();

  return (el: HTMLElement) => (text: string) => {
    const computed = window.getComputedStyle(el);
    ctx.font = computed.font
      ? computed.font
      : `${computed.fontSize}" "${computed.fontFamily}`;
    return ctx.measureText(text).width;
  };
};
