import React, { useCallback } from 'react';
import { CloseModalButton, CreateMenu } from './styles';

interface Props {
  children: React.ReactNode;
  style: React.CSSProperties;
  show: boolean;
  onCloseModal: () => void;
  closeButton?: boolean;
}

const Menu: React.FC<Props> = ({ children, style, show, onCloseModal, closeButton = true }) => {
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
