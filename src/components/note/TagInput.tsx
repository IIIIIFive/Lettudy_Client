import styled from 'styled-components';

interface TagInputProps {
  tags: string;
  tagList: string[];
  inputRef: React.RefObject<HTMLInputElement>;
  onTagChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTagKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onTagFocus: () => void;
  onTagRemove: (index: number) => void;
}

function TagInput({
  tags,
  tagList,
  inputRef,
  onTagChange,
  onTagKeyDown,
  onTagFocus,
  onTagRemove,
}: TagInputProps) {
  const isMaxTags = tagList.length >= 6;

  return (
    <TagInputStyle>
      {tagList.map((tag, index) => (
        <div className='tag' key={index}>
          {tag}
          <img
            className='close'
            src='/assets/icon/close-icon.svg'
            alt='close'
            width={7}
            onClick={() => onTagRemove(index)}
          />
        </div>
      ))}
      {!isMaxTags && (
        <input
          className='tag-input'
          type='text'
          placeholder={
            isMaxTags ? '6개까지만 입력 가능합니다' : '태그를 입력하세요.'
          }
          value={tags}
          onChange={onTagChange}
          onFocus={onTagFocus}
          onKeyDown={onTagKeyDown}
          ref={inputRef}
          disabled={isMaxTags}
        />
      )}
    </TagInputStyle>
  );
}

export default TagInput;

const TagInputStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.color_borderGray};
  border-radius: 12px;
  padding: 4px 6px;
  min-height: 50px;
  background-color: ${({ theme }) => theme.color_bgWhite};

  .tag {
    display: flex;
    align-items: center;
    background-color: #dde4f5;
    color: #3673e8;
    padding: 8px 14px;
    border-radius: 8px;
    font-size: ${({ theme }) => theme.fontSize_xs};
    font-weight: bold;
    margin: 3px;

    .close {
      margin-left: 10px;
      cursor: pointer;
    }
  }

  .tag-input {
    flex: 1;
    border: none;
    outline: none;
    font-size: ${({ theme }) => theme.fontSize_reg};
    padding: 6px 12px;
    min-width: 120px;
  }
`;
