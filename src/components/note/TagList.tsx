import styled from 'styled-components';

type TagListProps = {
  allTags: string[];
  selectedTags: string[];
  onToggle: () => void;
  onTagClick: (tag: string) => void;
  onReset: () => void;
  showAllTags: boolean;
};

const TagList = ({
  allTags,
  selectedTags,
  onToggle,
  onTagClick,
  onReset,
  showAllTags,
}: TagListProps) => {
  return (
    <TagListStyle showAllTags={showAllTags}>
      <div className='tag-header'>
        <img src='/assets/images/hashtag.png' alt='hashtag' width={20} />
        <h4>태그 목록</h4>
        <div className='icons'>
          <img
            src='/assets/icon/toggle-icon.svg'
            alt='toggle'
            className='toggle-icon'
            onClick={onToggle}
          />
          <div className='reset-tag'>
            <img
              src='/assets/icon/tag-reset-icon.svg'
              alt='reset'
              className='reset-icon'
              onClick={onReset}
              height={12}
            />
          </div>
        </div>
      </div>
      <div
        className={`tag-items-container ${
          showAllTags ? 'expanded' : 'collapsed'
        }`}>
        {allTags.map((tag, index) => (
          <span
            key={index}
            className={`tag-item ${selectedTags.includes(tag) ? 'active' : ''}`}
            onClick={() => onTagClick(tag)}>
            {tag}
          </span>
        ))}
      </div>
    </TagListStyle>
  );
};

export default TagList;

const TagListStyle = styled.div<{ showAllTags: boolean }>`
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .tag-header {
    display: flex;
    align-items: center;
    gap: 10px;

    img {
      display: block;
    }

    h4 {
      margin: 0;
    }

    .icons {
      display: flex;
      align-items: center;
      gap: 8px;

      img {
        cursor: pointer;
      }

      .toggle-icon {
        transform: rotate(
          ${(props) => (props.showAllTags ? '0deg' : '180deg')}
        );
        transition: transform 0.3s ease;
      }
      .reset-tag {
        margin-left: 10px;
      }
    }
  }

  .tag-items-container {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    overflow: hidden;
    max-height: ${(props) => (props.showAllTags ? 'none' : '26px')};
    transition: max-height 0.3s ease;
  }

  .tag-item {
    display: inline-block;
    background-color: ${({ theme }) => theme.color_bgBlue};
    font-size: ${({ theme }) => theme.fontSize_xxs};
    font-weight: bold;
    color: ${({ theme }) => theme.color_keyBlue};
    padding: 6px 14px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &.active {
      border: 1px solid ${({ theme }) => theme.color_keyBlue};
      color: ${({ theme }) => theme.color_keyBlue};
    }
  }
`;
