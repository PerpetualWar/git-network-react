import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import users from '../data/data';
import UserInfo from './UserInfo';
import { fetchUser } from '../data/fetchedData';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {}
    };
    this.getUser = this.getUser.bind(this);
    this.listUsers = this.listUsers.bind(this);
  }
  componentDidMount() {
    users.forEach(obj => {
      this.getUser(obj.username);
    })
  }
  // getUser(username) {
  //   fetchUser(username)
  //     .then(res => {
  //       const usersObj = res;
  //       this.setState(prevState => ({
  //         users: { ...prevState.users, [usersObj.login]: usersObj },
  //         allIds: [...prevState.allIds, usersObj.login]
  //       }));
  //     });
  // }
  async getUser(username) {
    const { data, status } = await fetchUser(username);
    this.setState(prevState => ({
      users: { ...prevState.users, [data.login]: data }
    }));
  }
  listUsers() {
    const { users } = this.state;
    const { location } = this.props;
    const usersKeys = Object.keys(users);
    return usersKeys.map(username => <UserInfo key={users[username].id} user={users[username]} location={location} />)
  }
  render() {
    return (
      <div className="container">
        {this.listUsers()}
      </div>
    );
  }
}