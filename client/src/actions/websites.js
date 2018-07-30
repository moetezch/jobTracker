import database from '../firebase/firebase'


export const addWebsite = (website) => ({
  type: 'ADD_WEBSITE',
  website
});

export const startAddWebsite = (websiteData={})=>{
  return (dispatch, getState)=>{
    const uid = getState().auth.uid;
    const {
      name = '',
      url = ''
    }=websiteData
    const website ={name,url}
    database.ref(`users/${uid}/websites`).push(website).then((ref)=>{
      dispatch(addWebsite({
        id:ref.key,
        ...website
      }))
    })
  }
}

//SET_WEBSITES
export const setWebsites = (websites) => ({
  type: 'SET_WEBSITES',
  websites
});

export const startSetWebsites = () => {
  return (dispatch,getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/websites`).once('value').then((snapshot) => {
      const websites = [];

      snapshot.forEach((childSnapshot) => {
        websites.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      
      dispatch(setWebsites(websites));
    });
  };
};

// REMOVE_WEBSITE
export const removeWebsite = ({ id } = {}) => ({
  type: 'REMOVE_WEBSITE',
  id
});

export const startRemoveWebsite = ({ id } = {}) => {
  return (dispatch, getState) => {
   const uid = getState().auth.uid;
    return database.ref(`users/${uid}/websites/${id}`).remove().then(() => {
      dispatch(removeWebsite({ id }));
    });
  };
};

// EDIT_WEBSITE
export const editWebsite = (id, updates) => ({
  type: 'EDIT_WEBSITE',
  id,
  updates
});

export const startEditWebsite = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/websites/${id}`).update(updates).then(() => {
      dispatch(editWebsite(id, updates));
    });
  };
};

// GET_WEBSITE
export const getWebsite = (website) => ({
  type: 'GET_WEBSITE',
  website
});

export const startGetWebsite = (id) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/websites/${id}`).once('value').then((snapshot) => {
      const website = snapshot.val() 
      console.log(website);
      
      dispatch(getWebsite(website));
    });
  };
};
