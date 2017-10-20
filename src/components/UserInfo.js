import React from 'react';
import { Link } from 'react-router-dom';

export default ({ user, location }) => (
  <div className="">
    <div className="panel panel-default">
      <div className="panel-heading">
        <Link to={"/" + user.login}>{user.login}</Link>
      </div>
      <div className="panel-body">
        <div className="pull-left">
          <img src={user.avatar_url} style={{ width: 100 + "px", height: "auto" }} /><br />
          {user.name}<br />
          {user.location}
        </div>
        <div className="pull-right">
          Repos: {user.public_repos}<br />
          Followers: {user.followers}
        </div>
      </div>
      {location.pathname !== '/' && user.bio &&
        <div className="panel-footer">
          {user.bio}
        </div>
      }
    </div>
  </div>);