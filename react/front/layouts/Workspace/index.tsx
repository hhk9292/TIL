import React, { useCallback, useState } from 'react';
import { Redirect, Switch, Route, Link } from 'react-router-dom';
import useSWR from 'swr';
import axios from 'axios';
import gravatar from 'gravatar';
import loadable from '@loadable/component';

import fetcher from '@utils/fetcher';
import { IUser } from '@typings/db';
const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));
import Menu from '@components/Menu';
import {
  AddButton,
  Channels,
  Chats,
  Header,
  LogOutButton,
  MenuScroll,
  ProfileImg,
  ProfileModal,
  RightMenu,
  WorkspaceButton,
  WorkspaceName,
  Workspaces,
  WorkspaceWrapper,
} from './styles';
import Modal from '@components/Modal';
import { Button, Input, Label } from '@pages/SignUp/styles';
import useInput from '@hooks/useInput';

const Workspace: React.FC = () => {
  const { data: userData, error, mutate } = useSWR<IUser | false>('/api/users', fetcher);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
  const [newWorkspace, onChangeNewWorkspace, setNewWorkspace] = useInput('');
  const [newUrl, onChangeNewUrl, setNewUrl] = useInput('');

  const onLogout = useCallback(() => {
    axios
      .post('/api/users/logout', null, {
        withCredentials: true,
      })
      .then(() => mutate(false, false));
  }, []);

  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  }, []);

  const onCloseUserProfile = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setShowUserMenu(false);
  }, []);

  const onClickCreateWorkspace = useCallback((e: React.FormEvent) => {
    e.preventDefault();
  }, []);

  const onCreateWorkspace = useCallback(() => {
    setShowCreateWorkspaceModal((prev) => !prev);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowCreateWorkspaceModal(false);
  }, []);

  if (!userData) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Header>
        <RightMenu>
          <span onClick={onClickUserProfile}>
            <ProfileImg
              src={gravatar.url(userData.nickname, { s: '28px', d: 'retro' })}
              alt={userData.nickname}
            ></ProfileImg>
            {showUserMenu && (
              <Menu style={{ right: 0, top: 38 }} show={showUserMenu} onCloseModal={onCloseUserProfile}>
                <ProfileModal>
                  <img src={gravatar.url(userData.nickname, { s: '36px', d: 'retro' })} alt={userData.nickname} />
                  <div>
                    <span id="profile-name">{userData.nickname}</span>
                    <span id="profile-active">Active</span>
                  </div>
                </ProfileModal>
                <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
              </Menu>
            )}
          </span>
        </RightMenu>
      </Header>
      <WorkspaceWrapper>
        <Workspaces>
          {userData.Workspaces.map((ws) => {
            return (
              <Link key={ws.id} to={`/workspace/channel/일반`}>
                <WorkspaceButton>{ws.name.slice(0, 1).toUpperCase()}</WorkspaceButton>
              </Link>
            );
          })}
          <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
        </Workspaces>
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
      <Modal show={showCreateWorkspaceModal} onCloseModal={onCloseModal}>
        <form onSubmit={onCreateWorkspace}>
          <Label id="workspace-label">
            <span>워크스페이스 이름</span>
            <Input value={newWorkspace} onChange={onChangeNewWorkspace}></Input>
          </Label>
          <Label id="workspace-url-label">
            <span>워크스페이스 url</span>
            <Input value={newUrl} onChange={onChangeNewUrl}></Input>
          </Label>
          <Button type="submit">생성하기</Button>
        </form>
      </Modal>
    </div>
  );
};

export default Workspace;
