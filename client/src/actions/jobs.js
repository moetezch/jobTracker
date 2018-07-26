import uuid from 'uuid';



export const addJob = (AppliedJob) => ({
  type: 'ADD_JOB',
  AppliedJob
});
