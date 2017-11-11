import { fetchUser, fetchRepos, fetchCommits } from '../../data/fetchedData';
import _ from 'lodash';

export const addUser = ({ data, status } = {}) => {
  return {
    type: 'ADD_USER',
    data,
    status
  }
};

export const addRepos = ({ data, status } = {}) => {
  return {
    type: 'ADD_REPOS',
    data,
    status
  }
};

export const addCommits = ({ data, status } = {}) => {
  return {
    type: 'ADD_COMMITS',
    data,
    status
  }
};

// export const addUserAsync = user => dispatch => fetchUser(user)
//   .then(res => dispatch(addUser(res)),
//   err => dispatch({})
//   );

export const addUserAsync = user => async dispatch => {
  const userObj = await fetchUser(user);
  // _.isEmpty(userObj) ? dispatch(addUser()) : dispatch(addUser(userObj));
  dispatch(addUser(userObj));
};

export const addReposAsync = repo => async dispatch => {
  const repoObj = await fetchRepos(repo);
  // _.isEmpty(repoObj) ? dispatch({}) : dispatch(addRepo(repoObj));
  dispatch(addRepos(repoObj));
}

export const addCommitsAsync = (user, repo) => async dispatch => {
  const commitsObj = await fetchCommits(user, repo);
  // console.log(commitsObj);
  dispatch(addCommits(commitsObj));
}