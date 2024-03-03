import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

interface Item {
  // Item interface özelliklerini buraya ekleyin
}

interface PaginationProps {
  pageNumber: number;
  info: any; // Info interface'ini buraya ekleyin veya any türünü istediğiniz gibi değiştirin
  updatePageNumber: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageNumber, info, updatePageNumber }) => {

  let pageChange = (data: { selected: number }) => {
    updatePageNumber(data.selected + 1);
  };

  const [width, setWidth] = useState(window.innerWidth);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <>
      <style>{`
          @media (max-width: 768px) {
            .pagination {
              font-size: 12px;
            }
            .next,
            .prev {
              display: none;
            }
          }
          @media (max-width: 768px) {
            .pagination {
              font-size: 14px;
            }
          }
        `}
      </style>
      <ReactPaginate
        className="pagination justify-content-center my-4 gap-4"
        nextLabel="Next"
        forcePage={pageNumber === 1 ? 0 : pageNumber - 1}
        previousLabel="Prev"
        previousClassName="btn btn-primary fs-5 prev"
        nextClassName="btn btn-primary fs-5 next"
        activeClassName="active"
        marginPagesDisplayed={width < 576 ? 1 : 2}
        pageRangeDisplayed={width < 576 ? 1 : 2}
        pageCount={info?.pages}
        onPageChange={pageChange}
        pageClassName="page-item"
        pageLinkClassName="page-link"
      />
    </>
  );
};

export default Pagination;
