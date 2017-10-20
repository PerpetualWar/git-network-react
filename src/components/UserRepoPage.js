import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'babel-polyfill';
import moment from 'moment';
import users from '../data/data';
import UserInfo from './UserInfo';
import { fetchUser, fetchRepos, fetchCommits } from '../data/fetchedData';

export default class UserRepoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {},
      repos: {},
      commits: {},
      username: this.props.match.params.username,
      repo: this.props.match.params.repo,
      loading: false
    };
  }
  componentDidMount() {
    this.getUser(this.state.username);
    this.getRepos(this.state.username);
    this.getCommits(this.state.username, this.state.repo);
    console.log(this.props);
  }
  async getUser(username) {
    const { data, status } = await fetchUser(username);
    if (status === 200) {
      this.setState(prevState => ({
        users: { ...prevState.users, [data.login]: data }
      }));
    }
  }
  async getRepos(username) {
    const { data, status } = await fetchRepos(username);
    this.setState(prevState => ({
      repos: { ...prevState.repos, [username]: data }
    }));
  }
  async getCommits(username, reponame) {
    this.setState({ loading: true });
    const { data, status } = await fetchCommits(username, reponame);
    this.setState(prevState => ({
      commits: { ...prevState.commits, [reponame]: data },
      loading: false
    }));
  }
  sortCommits() {
    return this.state.commits[this.state.repo].map(commit => {
      return commit;
    })
      .sort((a, b) => {
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
        {commit.commit.author.name} commited {this.convertDate(commit.commit.author.date)} <br /><br />
      </div>
    ));
  }
  convertDate(date) {
    return moment(date).locale('en').format('Do MMMM YYYY HH:mm:ss');
  }
  render() {
    return (
      <div className="container">
        <div>
          {!_.isEmpty(this.state.users[this.state.username]) &&
            <UserInfo
              user={this.state.users[this.state.username]}
              location={this.props.location} />
          }
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
        {this.state.loading ?
          <div className="text-center">
            <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
            <span className="sr-only">Loading...</span>
          </div> :
          <div className="panel">
            {!_.isEmpty(this.state.commits[this.state.repo]) && this.listCommits()}
          </div>
        }

      </div>
    );
  }
}