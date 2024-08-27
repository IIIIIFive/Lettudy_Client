import styled from 'styled-components';

function NoteEmpty() {
  return <NoteEmptyStyle>작성하신 게시글이 없습니다.</NoteEmptyStyle>;
}

const NoteEmptyStyle = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.color_textGray};
  margin: 10px 0 0 22px;
`;

export default NoteEmpty;
