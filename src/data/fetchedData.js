import axios from 'axios';
import 'babel-polyfill';

export const fetchUser = async username => {
  try {
    const { data } = await axios.get('https://api.github.com/users/' + username)
    return data;
  } catch (e) {
    throw new Error(e);
  }
}
export const fetchRepos = async username => {
  try {
    const { data } = await axios.get('https://api.github.com/users/' + username + '/repos');
    return data;
  } catch (e) {
    throw new Error(e);
  }
}

export const fetchCommits = async (username, reponame) => {
  try {
    const { data } = await axios.get("https://api.github.com/repos/" + username + "/" + reponame + "/commits");
    return data;
  } catch (e) {
    throw new Error(e);
  }
}