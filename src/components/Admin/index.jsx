import React from 'react';
import PostIcon from '@mui/icons-material/Book';
import UserIcon from '@mui/icons-material/Group';
import { Admin, Resource } from 'react-admin';
import { PostList, PostEdit, PostCreate } from './posts';
import { UserList } from './users';
import Dashboard from './dashboard';
import authProvider from './authProvider';
import dataProvider from './dataProvider';


export const Admin = () => {
  return (
    <div>
      <Admin dashboard={Dashboard} dataProvider={dataProvider} authProvider={authProvider}>
        <Resource name='users' list={UserList} icon={UserIcon}/>
        <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon}/>
      </Admin>
    </div>
  )
}
