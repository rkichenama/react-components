const Day = new Intl.DateTimeFormat(undefined, {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
export const Time = new Intl.DateTimeFormat(undefined, {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});
const rel = new Intl.RelativeTimeFormat(undefined, {
  numeric: 'always',
});
export const RelativeDays = (stamp: string) => {
  // @ts-ignore
  const diff = new Date(stamp) - new Date();
  const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return rel.format(diffDays, 'days');
};
export const RelativeHours = (stamp: string) => {
  // @ts-ignore
  const diff = new Date(stamp) - new Date();
  const diffHours = Math.ceil(diff / (1000 * 60 * 60));

  return rel.format(diffHours, 'hour');
};
export const format = (stamp: string, f: Intl.DateTimeFormat = Day) => (
  f.format(new Date(stamp)).replace(/24:/g, '00:')
);
