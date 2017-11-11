import _ from 'lodash';

export const users = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        [action.data.login]: action.data
      };
    default:
      return state;
  }
};

export const repos = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_REPOS':
    return action.data.reduce((accumulator, repo) => {
      return { ...accumulator, [repo.id]: repo };
  }, {});
    default:
      return state;
  }
};

export const commits = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_COMMITS':
      return _.mapKeys(action.data, "sha")
    default:
      return state;
  }
};