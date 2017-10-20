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
      username: this.props.match.params.username,
      repos: {},
      loading: false
    };
    this.getUser = this.getUser.bind(this);
    this.getRepos = this.getRepos.bind(this);
  }
  componentDidMount() {
    this.getUser(this.state.username);
    this.getRepos(this.state.username);
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
    this.setState({ loading: true });
    const { data, status } = await fetchRepos(username);
    if (status === 200) {
      this.setState(prevState => ({
        repos: { ...prevState.repos, [username]: data },
        loading: false
      }));
    }
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
          {!_.isEmpty(this.state.users[this.state.username]) &&
            <UserInfo
              user={this.state.users[this.state.username]}
              location={this.props.location} />
          }
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
          {this.state.loading ?
            <div className="text-center">
              <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
              <span className="sr-only">Loading...</span>
            </div> :
            <div>
              {!_.isEmpty(this.state.repos[this.state.username]) && this.listRepos()}
            </div>
          }
        </div>
      </div>
    );
  }
}