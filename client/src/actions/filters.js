// SET_TEXT_FILTER
export const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});
export const setCompanyFilter = (company = '') => ({
  type: 'SET_COMPANY_FILTER',
  company
});
// SORT_BY_DATE
export const sortByDate = () => ({
  type: 'SORT_BY_DATE'
});

// SORT_BY_TITLE
export const sortByTitle = () => ({
  type: 'SORT_BY_TITLE'
});

// SORT_BY_COUNTRY
export const sortByCountry = () => ({
  type: 'SORT_BY_COUNTRY'
});

// SET_START_DATE
export const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
});

// SET_END_DATE
export const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
});
