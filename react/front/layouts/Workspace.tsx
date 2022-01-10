import React, { useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import useSWR from 'swr';
import axios from 'axios';

import fetcher from '@utils/fetcher';

const Workspace: React.FC = ({ children }) => {
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
      <button onClick={onLogout}>로그아웃</button>
      {children}
    </div>
  );
};

export default Workspace;
