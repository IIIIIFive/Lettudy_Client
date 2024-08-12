import React, { ForwardedRef } from 'react';
import styled from 'styled-components';

interface ToastProps {
  onClose: () => void;
}

function Toast({ onClose }: ToastProps, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <ToastStyle ref={ref}>
      <span>
        원하는 태그를 입력하고 엔터를 이용하여 태그를 등록할 수 있습니다.
      </span>
      <img
        className='close'
        src='/assets/icon/close-icon.svg'
        alt='close'
        width={9}
        onClick={onClose}
      />
    </ToastStyle>
  );
}

const ForwardedToast = React.forwardRef(Toast);

const ToastStyle = styled.div`
  margin-top: 8px;
  position: absolute;
  top: 100%;
  left: 5px;
  background-color: ${({ theme }) => theme.color_bgWhite};
  color: ${({ theme }) => theme.color_textKey};
  padding: 12px 18px;
  border: 1px solid ${({ theme }) => theme.color_borderGray};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  font-size: ${({ theme }) => theme.fontSize_xs};
  white-space: nowrap;
  display: flex;
  align-items: center;
  z-index: 1;

  .close {
    cursor: pointer;
    margin-left: 10px;
  }
`;

export default ForwardedToast;
