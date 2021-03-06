import moment from 'moment'

// Get visible jobs

export default (jobs, { text,company, sortBy, startDate, endDate }) => {
  return jobs.filter((job) => {

    const createdAtMoment=moment.unix(job.date).format()
    
    // console.log(startDate);
    // console.log(endDate);
    //console.log(moment(createdAtMoment).unix());
    
   // console.log(moment.unix(startDate).isSameOrBefore(dateaaa, 'day'));
    
    
    //console.log(createdAtMoment);
    //console.log(moment(startDate));
    // console.log(moment(startDate).isSameOrBefore(dateaaa, 'day') );
    // console.log( moment(endDate).isSameOrAfter(dateaaa, 'day') );
    // console.log(moment('2010-10-20').isBefore('2010-10-21'));
    
    // console.log(moment.unix(startDate));
    // console.log(moment.unix(startDate).isSameOrBefore(job.date, 'day'));
    
   
    
    const startDateMatch = startDate ? moment(startDate).isSameOrBefore(createdAtMoment, 'day')  : true;
    const endDateMatch = endDate ? moment(endDate).isSameOrAfter(createdAtMoment, 'day'): true;
    const textMatch = job.jobTitle.toLowerCase().includes(text.toLowerCase());
    
    const companyMatch = job.company.toLowerCase().includes(company.toLowerCase());
    
    return startDateMatch && endDateMatch && textMatch && companyMatch
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.date < b.date ? 1 : -1;
    } else if (sortBy === 'title') {
      return a.jobTitle.toLowerCase() < b.jobTitle.toLowerCase() ? -1 : 1;
    }else if (sortBy === 'country') {
      return a.country < b.country ? -1 : 1;
    }
  });
};
