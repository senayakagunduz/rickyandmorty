import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  pageNumber: number;
  pageCount: number;
  onPageChange: (pageNumber: number) => void;
}
const Pagination: React.FC<PaginationProps> = ({ pageNumber, pageCount, onPageChange }) => {

  let pageChange = (data: { selected: number }) => {
    onPageChange(data.selected + 1);
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
      .next{
        border:0;
        height:50px;
        width:300px;
      }
      a.page-link{
        display:inline;
      }
          @media (max-width: 768px) {
            .pagination {
              font-size: 12px;
            }
            .next{
              border:0;
              height:60px;
            }
            .prev {
              display: flex;
              padding:0;
            }
          
          @media (max-width: 768px) {
            .pagination {
              font-size: 14px;
            }
          }
        `}
      </style>
      <ReactPaginate
        className="pagination my-4 gap-4 bg-white text-black rounded shadow"
        nextLabel="Next"
        forcePage={pageNumber === 1 ? 0 : pageNumber - 1}
        previousLabel="Prev"
        previousClassName="btn fs-5 prev"
        nextClassName="btn fs-5 next"
        activeClassName="active"
        marginPagesDisplayed={width < 576 ? 1 : 2}
        pageRangeDisplayed={width < 576 ? 1 : 2}
        pageCount={pageCount}
        onPageChange={pageChange}
        pageClassName="page-item flex"
        pageLinkClassName="page-link"
      />
    </>
  );
};

export default Pagination;
