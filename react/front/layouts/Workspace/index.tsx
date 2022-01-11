import React, { useCallback } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import useSWR from 'swr';
import axios from 'axios';
import gravatar from 'gravatar';
import loadable from '@loadable/component';

import fetcher from '@utils/fetcher';
const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

import {
  Channels,
  Chats,
  Header,
  MenuScroll,
  ProfileImg,
  RightMenu,
  WorkspaceName,
  Workspaces,
  WorkspaceWrapper,
} from './styles';

const Workspace: React.FC = () => {
  const { data, error, mutate } = useSWR('/api/users', fetcher);
  const onLogout = useCallback(() => {
    axios
      .post('/api/users/logout', null, {
        withCredentials: true,
      })
      .then(() => mutate(false, false));
  }, []);

  if (!data) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Header>
        <RightMenu>
          <ProfileImg src={gravatar.url(data.nickname)} alt={data.nickname}></ProfileImg>
        </RightMenu>
      </Header>
      <WorkspaceWrapper>
        <Workspaces></Workspaces>
        <Channels>
          <WorkspaceName></WorkspaceName>
          <MenuScroll></MenuScroll>
        </Channels>
        <Chats>
          <Switch>
            <Route path="/workspace/channel" component={Channel} />
            <Route path="/workspace/dm" component={DirectMessage} />
          </Switch>
        </Chats>
      </WorkspaceWrapper>
    </div>
  );
};

export default Workspace;
