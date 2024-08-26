import styled from 'styled-components';
import Modal from '../common/Modal';

interface AttendanceInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AttendanceInfoModal({ isOpen, onClose }: AttendanceInfoModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <AttendanceInfoModalStyle>
        <img src='/assets/images/alarm.png' alt='alarm' width={35} />
        출석 일정을 잊지 않도록, <br />
        출석 시간 10분 전 web 알람이 울립니다.
        <br />
        <p>(일정 추가 시 "알람 ON"을 선택하면 출석으로 간주됩니다. )</p>
        <hr />
        <p> 알람이 울리지 않는 경우, 다음 사항을 확인해 주세요:</p>
        <span> 설정 &gt; 개인정보 보호 및 보안 &gt; 알람 권한 허용</span>
        <p>
          알람을 허용한 후에도 알람이 울리지 않는다면,
          <br /> 데스크톱 내부의 <span>방해 금지 모드</span> 또는{' '}
          <span>알람 설정</span>을 확인해 주세요.
        </p>
      </AttendanceInfoModalStyle>
    </Modal>
  );
}

const AttendanceInfoModalStyle = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 5px;
  line-height: 150%;

  img {
    margin-bottom: 20px;
  }
  span {
    font-size: ${({ theme }) => theme.fontSize_xs};
    margin: 12px 0;
  }

  p {
    color: ${({ theme }) => theme.color_textKey};
    font-size: ${({ theme }) => theme.fontSize_xs};
    margin-bottom: 10px;

    span {
      font-weight: 700;
    }
  }

  hr {
    width: 80%;
    align-items: center;
    border: 0;
    border-top: 1px solid ${({ theme }) => theme.color_borderGray};
  }
`;

export default AttendanceInfoModal;
