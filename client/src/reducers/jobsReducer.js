

export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_JOB':
      return [
        ...state,
        action.expense
      ];
    
    default:
      return state;
  }
};
