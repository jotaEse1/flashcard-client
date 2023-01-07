export const convertUnix = (unix: number) => {
    const t = new Date(unix),
        days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        year = t.getFullYear(),
        month = `${t.getMonth() + 1}`.length === 1? `0${t.getMonth() + 1}` : `${t.getMonth() + 1}`,
        date = `${t.getDate()}`.length === 1? `0${t.getDate()}` : `${t.getDate()}`,
        day = days[t.getDay()],
        hour = `${t.getHours()}`.length === 1? `0${t.getHours()}` : `${t.getHours()}`,
        minutes = `${t.getMinutes()}`.length === 1? `0${t.getMinutes()}` : `${t.getMinutes()}`,
        seconds = `${t.getSeconds()}`.length === 1? `0${t.getSeconds()}` : `${t.getSeconds()}`

    return {year, month, date, day, hour, minutes, seconds, unix}

}

/* 
const convertUnix = (unix: number) => {
  const t = new Date(unix),
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return {
    year: t.getFullYear(),
    month: `0${t.getMonth() + 1}`.slice(-2),
    date: `0${t.getDate()}`.slice(-2),
    day: days[t.getDay()],
    hour: `0${t.getHours()}`.slice(-2),
    minutes: `0${t.getMinutes()}`.slice(-2),
    seconds: `0${t.getSeconds()}`.slice(-2),
    unix,
  };
};

*/