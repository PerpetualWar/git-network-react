import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'babel-polyfill';
import users from '../data/data';
import UserInfo from './UserInfo';
import { fetchUser, fetchRepos, fetchCommits } from '../data/fetchedData';

export default class UserRepoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {},
      // allIds: [],
      repos: {},
      commits: {},
      username: this.props.match.params.username,
      repo: this.props.match.params.repo,
      sha: []
    };
  }
  componentDidMount() {
    this.getUser(this.state.username);
    this.getRepos(this.state.username);
    this.getCommits(this.state.username, this.state.repo);
    // this.sortCommits();
  }
  async getUser(username) {
    const usersObj = await fetchUser(username);
    this.setState(prevState => ({
      users: { ...prevState.users, [usersObj.login]: usersObj },
      // allIds: [...prevState.allIds, usersObj.login]
    }));
  }
  async getRepos(username) {
    const reposObj = await fetchRepos(username);
    this.setState(prevState => ({
      repos: { ...prevState.repos, [username]: reposObj }
    }));
  }
  async getCommits(username, reponame) {
    const commitObj = await fetchCommits(username, reponame);
    this.setState(prevState => ({
      commits: { ...prevState.commits, [reponame]: commitObj }
    }));
  }
  sortCommits() {
    return this.state.commits[this.state.repo].map(commit => {
      console.log(commit);
      return commit;
    })
    .sort((a, b) => {
      console.log(a.commit);
      const date1 = a.commit.author.date;
      const date2 = b.commit.author.date;
      return new Date(date1).getTime() - new Date(date2).getTime()
    })
    .reverse()
    .slice(0, 10)
  }
  listCommits() {
    const sortedCommits = this.sortCommits();
    return sortedCommits.map(commit => (
      <div key={commit.sha}>
        {commit.commit.message}<br />
        {commit.commit.author.name} commited {commit.commit.author.date}<br /><br />
      </div>
    ))
  }
  render() {
    return (
      <div className="container">
        <div>
          {!_.isEmpty(this.state.users[this.state.username]) ? <UserInfo user={this.state.users[this.state.username]} /> : null}
        </div>
        <div className="clearfix">
          <div className="pull-left">
            <h2>Commits:</h2>
          </div>
          <div className="pull-right">
            <Link to={"/" + this.state.username} className="btn btn-default">Back</Link>
            <Link to="/" className="btn btn-default">Back to Users</Link>
          </div>
        </div>
        <div className="panel">
          {!_.isEmpty(this.state.commits[this.state.repo]) ? this.listCommits() : null}
        </div>
      </div>
    );
  }
}