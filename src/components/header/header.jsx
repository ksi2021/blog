import React from 'react';
import { Layout, Button, Avatar } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

import { logOut } from '../store/userReducer';
import avatarImage from '../article/avatar.png';

function Header({ user, authorization }) {
  const dispath = useDispatch();
  const navigate = useNavigate();
  return (
    <Layout.Header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        background: 'white',
      }}
    >
      <NavLink to={'/'}>Real world blog</NavLink>
      {!authorization ? (
        <div>
          <Button type="text" onClick={() => navigate('/sign-in')}>
            Sign In
          </Button>
          <Button
            style={{ color: 'green', borderColor: 'green' }}
            onClick={() => navigate('/sign-up')}
          >
            Sign Up
          </Button>
        </div>
      ) : (
        <div>
          <Button
            style={{ color: 'green', borderColor: 'green', marginRight: 10 }}
            onClick={() => navigate('/new-article')}
          >
            Create article
          </Button>
          {user?.username}
          <Avatar
            style={{ verticalAlign: 'middle', marginLeft: '5px' }}
            src={<img src={user?.image || avatarImage} alt="avatar" />}
            size="large"
            onClick={() => navigate('/profile')}
          />

          <Button
            size={'large'}
            style={{ color: 'gray', borderColor: 'gray', marginLeft: 10 }}
            onClick={() => dispath(logOut())}
          >
            Log Out
          </Button>
        </div>
      )}
    </Layout.Header>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user?.user,
    authorization: state.user.authorization,
  };
};

export default connect(mapStateToProps)(Header);
