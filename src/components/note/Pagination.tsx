import styled from 'styled-components';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // totalPages가 0일 경우, currentPage를 0으로 표시.
  const displayCurrentPage = totalPages === 0 ? 0 : currentPage;
  const displayTotalPages = totalPages === 0 ? 0 : totalPages;

  return (
    <PaginationStyle>
      <div className='page-info'>
        <div className='current-page'>
          {displayCurrentPage.toString().padStart(2, '0')}
        </div>
        <div className='separator'>/</div>
        <div className='total-pages'>
          {displayTotalPages.toString().padStart(2, '0')}
        </div>
      </div>
      <div className='arrow-buttons'>
        <button
          className='arrow-button'
          onClick={handlePreviousPage}
          disabled={currentPage <= 1 || totalPages === 0}>
          <img src='/assets/icon/left-arrow.svg' alt='Previous' width={26} />
        </button>
        <button
          className='arrow-button'
          onClick={handleNextPage}
          disabled={currentPage >= totalPages || totalPages === 0}>
          <img src='/assets/icon/right-arrow.svg' alt='Next' width={26} />
        </button>
      </div>
    </PaginationStyle>
  );
};

export default Pagination;

const PaginationStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;

  .page-info {
    display: flex;
    align-items: center;
    background-color: ${({ theme }) => theme.color_textLightOrange};
    padding: 8px 15px;
    border-radius: 20px;
    font-size: ${({ theme }) => theme.fontSize_xxs};
    font-weight: bold;
    margin-right: 16px;

    .current-page {
      color: ${({ theme }) => theme.color_key};
    }

    .separator {
      color: ${({ theme }) => theme.color_textKey};
      margin: 0 4px;
    }

    .total-pages {
      color: ${({ theme }) => theme.color_textKey};
    }
  }

  .arrow-buttons {
    display: flex;

    .arrow-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;

      &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    }
  }
`;
