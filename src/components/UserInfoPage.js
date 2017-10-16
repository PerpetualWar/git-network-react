import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'babel-polyfill';
import users from '../data/data';
import UserInfo from './UserInfo';
import { fetchUser, fetchRepos } from '../data/fetchedData';

export default class UserInfoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {},
      allIds: [],
      username: this.props.match.params.username,
      repos: {}
    };
    this.getUser = this.getUser.bind(this);
    this.getRepos = this.getRepos.bind(this);
  }
  componentDidMount() {
    this.getUser(this.state.username);
    this.getRepos(this.state.username);
  }
  async getUser(username) {
    const usersObj = await fetchUser(username);
    this.setState(prevState => ({
      users: { ...prevState.users, [usersObj.login]: usersObj },
      allIds: [...prevState.allIds, usersObj.login]
    }));

  }
  async getRepos(username) {
    const reposObj = await fetchRepos(username);
    this.setState(prevState => ({
      repos: { ...prevState.repos, [username]: reposObj }
    }));
    console.log(this.state.repos);
  }
  listRepos() {
    return this.state.repos[this.state.username].map(repo => (
      <div key={repo.id}>
        <div >
        <Link to={'/' + repo.full_name}>{repo.full_name}</Link>
          <br />
          {repo.description} <br /><br />
        </div>
      </div>
    ));
  }
  render() {
    return (
      <div className="container">
        <div>
          {!_.isEmpty(this.state.users[this.state.username]) ? <UserInfo user={this.state.users[this.state.username]} /> : null}
        </div>
        <div className="clearfix">
          <div className="pull-left">
            <h2>Repositories:</h2>
          </div>
          <div className="pull-right">
            <Link to="/" className="btn btn-default">Back</Link>
          </div>
        </div>
        <div className="panel">
          {!_.isEmpty(this.state.repos[this.state.username]) ? this.listRepos() : null}
        </div>

      </div>
    );
  }
}