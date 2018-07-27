export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_JOB':
      return [
        ...state,
        action.job
      ];
    case 'SET_JOBS':
    return action.jobs
    default:
      return state;
  }
};
