import styled from 'styled-components';

interface LeaveRoomButtonProps {
  onClick: () => void;
}

function LeaveRoomButton({ onClick }: LeaveRoomButtonProps) {
  return <LeaveRoomButtonStyle onClick={onClick}>나가기</LeaveRoomButtonStyle>;
}

export default LeaveRoomButton;

const LeaveRoomButtonStyle = styled.button`
    width: 75px;
    height: 32px;
    background-color: ${({ theme }) => theme.color_bgLightPink};
    color: ${({ theme }) => theme.color_textPink};
    font-size: ${({ theme }) => theme.fontSize_xs};
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;
