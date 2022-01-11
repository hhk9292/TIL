import React, { FC, PropsWithChildren, useCallback } from 'react';
import { CloseModalButton, CreateMenu } from './styles';

interface Props {
  style: React.CSSProperties;
  show: boolean;
  onCloseModal: (e: React.MouseEvent) => void;
  closeButton?: boolean;
}

const Menu: FC<PropsWithChildren<Props>> = ({ children, style, show, onCloseModal, closeButton = true }) => {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);
  return (
    <CreateMenu onClick={onCloseModal}>
      <div style={style} onClick={stopPropagation}>
        {closeButton && <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>}
        {children}
      </div>
    </CreateMenu>
  );
};

export default Menu;
