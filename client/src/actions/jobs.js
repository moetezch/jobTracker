import database from '../firebase/firebase'


export const addJob = (job) => ({
  type: 'ADD_JOB',
  job
});

export const startAddJob = (jobData={})=>{
  return (dispatch)=>{
    const {
      date = 0,
      jobTitle = '',
      company = '',
      country = '',
      foundOn = '',
      reply = 'Hopefully soon',
      interview = 'Not Yet',
      notes = '',
    }=jobData
    const job ={date,jobTitle,company,country,foundOn,reply,interview,notes}
    database.ref('jobs').push(job).then((ref)=>{
      dispatch(addJob({
        id:ref.key,
        ...job
      }))
    })
  }
}

// SET_JOBS
export const setJobs = (jobs) => ({
  type: 'SET_JOBS',
  jobs
});

export const startSetJobs = () => {
  return (dispatch) => {
   
    return database.ref(`jobs`).once('value').then((snapshot) => {
      const jobs = [];

      snapshot.forEach((childSnapshot) => {
        jobs.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

      dispatch(setJobs(jobs));
    });
  };
};