import truncate from "lodash/truncate";

export function excerpt(string) {
  return truncate(string, {    
    length: 400, // maximum 400 characters
    separator: /,?\.* +/, // separate by spaces, including preceding commas and periods
  });
}

export function subtractYears(date, years){
  date.setFullYear(date.getFullYear() - years);
  return date;
}

export function formatDate(date) {
  let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
  // console.log(year, month, day);
  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;
  return [year, month, day].join('-');
}

export function normalizeData(data) {
  return data.map(item => {
    let newItem = {...item};
    if (item.name) {
      let {name, ...rest} = newItem;
      newItem = { ...rest, title: name };
    }
    if (item.first_air_date) {
      let {first_air_date, ...rest} = newItem;
      newItem = { ...rest, release_date: first_air_date };
    }
    return newItem;
  });
}

export const generateYears = (startYear) => {
  let currentYear = new Date().getFullYear(), years = [];
  startYear = startYear || 1950;

  while ( startYear <= currentYear ) {
    years.push(startYear++);
  }
  return years;
}
