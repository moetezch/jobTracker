import moment from 'moment'

// Get visible jobs

export default (jobs, {startDate, endDate }) => {
  return jobs.filter((job) => {

    const createdAtMoment=moment.unix(job.date).format()

   
    
    const startDateMatch = startDate ? moment(startDate).isSameOrBefore(createdAtMoment, 'day')  : true;
    const endDateMatch = endDate ? moment(endDate).isSameOrAfter(createdAtMoment, 'day'): true;

    return startDateMatch && endDateMatch 
  })
};
