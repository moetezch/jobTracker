export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_BOOKMARK':
      return [
        ...state,
        action.bookmark
      ];
    case 'SET_BOOKMARKS':
    return action.bookmarks
    default:
      return state;
  }
};
