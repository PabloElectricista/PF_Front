import React from 'react';
import PostIcon from '@mui/icons-material/Book';
import UserIcon from '@mui/icons-material/Group';
import { Admin, Resource } from 'react-admin';
import { PostList, PostEdit, PostCreate } from './posts';
import { UserList } from './users';
import Dashboard from './dashboard';
import authProvider from './authProvider';
import dataProvider from './dataProvider';
import {useAuth0} from '@auth0/auth0-react'

export default function Administrator () {
  const {
    isAuthenticated,
    logout,
    loginWithRedirect,
    user,
  } = useAuth0();
  const customAuthProvider = authProvider({
    isAuthenticated,
    loginWithRedirect,
    logout,
    user,
  });
  return (
    <div>
      <Admin dashboard={Dashboard} dataProvider={dataProvider} authProvider={customAuthProvider}>
        <Resource name='users' list={UserList} icon={UserIcon}/>
        <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon}/>
      </Admin>
    </div>
  )
}
