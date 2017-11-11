import axios from 'axios';
import 'babel-polyfill';

export const fetchUser = async username => {
  try {
    const { data, status } = await axios.get('https://api.github.com/users/' + username);
    return { data , status };
  } catch (e) {
    return { status, data: {} };
  }
}
export const fetchRepos = async username => {
  try {
    const { data, status } = await axios.get('https://api.github.com/users/' + username + '/repos');
    return { data, status };
  } catch (e) {
    return { status, data: {} };
  }
}
export const fetchCommits = async (username, reponame) => {
  try {
    const { data, status } = await axios.get('https://api.github.com/repos/' + username + '/' + reponame + '/commits');
    return { data, status };
  } catch (e) {
    return { status, data: {} };
  }
}