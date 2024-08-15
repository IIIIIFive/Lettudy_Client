import styled from 'styled-components';

interface LeaveRoomButtonProps {
  onClick: () => void;
}

function LeaveRoomButton({ onClick }: LeaveRoomButtonProps) {
  return <LeaveRoomButtonStyle onClick={onClick}>나가기</LeaveRoomButtonStyle>;
}

export default LeaveRoomButton;

const LeaveRoomButtonStyle = styled.button`
  width: 80px;
  height: 32px;
  background-color: #fedada;
  color: #ff6161;
  font-size: ${({ theme }) => theme.fontSize_xs};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
