import database from '../firebase/firebase'

// ADD_BOOKMARK
export const addBookmark = (bookmark) => ({
  type: 'ADD_BOOKMARK',
  bookmark
});

export const startAddBookmark = (bookmarkData={})=>{
  return (dispatch,getState)=>{
    const uid = getState().auth.uid;
    const {
      jobTitle = '',
      link=''
    }=bookmarkData
    const bookmark ={jobTitle,link}
    database.ref(`users/${uid}/bookmarks`).push(bookmark).then((ref)=>{
      dispatch(addBookmark({
        id:ref.key,
        ...bookmark
      }))
    })
  }
}

// SET_BOOKMARKS
export const setBookmarks = (bookmarks) => ({
  type: 'SET_BOOKMARKS',
  bookmarks
});

export const startSetBookmarks = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/bookmarks`).once('value').then((snapshot) => {
      const bookmarks = [];

      snapshot.forEach((childSnapshot) => {
        bookmarks.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

      dispatch(setBookmarks(bookmarks));
    });
  };
};


// REMOVE_BOOKMARK
export const removeBookmark = ({ id } = {}) => ({
  type: 'REMOVE_BOOKMARK',
  id
});

export const startRemoveBookmark = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/bookmarks/${id}`).remove().then(() => {
      dispatch(removeBookmark({ id }));
    });
  };
};

// // EDIT_JOB
// export const editJob = (id, updates) => ({
//   type: 'EDIT_JOB',
//   id,
//   updates
// });

// export const startEditJob = (id, updates) => {
//   return (dispatch, getState) => {
//    const uid = getState().auth.uid;
//     return database.ref(`users/${uid}/jobs/${id}`).update(updates).then(() => {
//       dispatch(editJob(id, updates));
//     });
//   };
// };
