export const formatDuration = (str: string): number => {
  if (str.includes('H')) {
    if (!str.includes('M')) {
      const h = str.split('H')[0].slice(2);
      return +h * 60;
    }
    const time = str.split('M')[0].slice(2).split('H');
    const h = +time[0];
    const m = +time[1];
    return h * 60 + m;
  }
  return +str.split('M')[0].slice(2);
};
