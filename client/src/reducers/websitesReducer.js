export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_WEBSITE':
      return [
        ...state,
        action.website
      ];
    case 'SET_WEBSITES':
    return action.websites
    case 'GET_WEBSITE':
    return action.website
    default:
      return state;
  }
};
