export const middleTruncate = (txt: string, len: number, sep = '…') => {
  if (txt.length <= len) { return txt; }
  const displayCharCount = len - sep.length;
  const leadingChars = Math.ceil(displayCharCount / 2);
  const trailingChars = displayCharCount - leadingChars;

  return `${txt.slice(0, leadingChars).trim()}${sep}${txt.slice(txt.length - trailingChars).trim()}`;
};
