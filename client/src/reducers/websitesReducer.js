export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_WEBSITE':
      return [
        ...state,
        action.website
      ];
    case 'SET_WEBSITES':
    return action.websites
    default:
      return state;
  }
};
