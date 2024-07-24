import React, { useEffect, useRef, useState } from "react";

interface PaginationProps {
  totalPages: number;
  itemsPerPage?: number;
  page?: number;
  onPageChange: (pageNumber: number) => void;
  className?: string;
  scrollToLatest?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  scrollToLatest,
  onPageChange,
  page,
  className,
}) => {
  const [currentPage, setCurrentPage] = useState(page || 1);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  };

  const listRef = useRef<HTMLLIElement[]>([]);

  const scrollToItem = (index: number) => {
    if (listRef.current[index]) {
      listRef.current[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

  useEffect(() => {
    handlePageChange(page!);
  }, [page]);

  useEffect(() => {
    scrollToItem(page ?? 0);
  }, []);

  //   if (!totalItems) return null;
  //   if (!itemsPerPage) return null;

  if (totalPages === 1 && currentPage !== 1) {
    setCurrentPage(1);
  }

  return (
    <ul className={className}>
      <RenderPageNumbers
        listRef={listRef}
        totalPages={totalPages}
        currentPage={currentPage}
        handleScroll={(index) => scrollToItem(index)}
        handlePageChange={(pageNumber) => handlePageChange(pageNumber)}
      />
    </ul>
  );
};

interface RenderPageNumbersProps {
  totalPages: number;
  currentPage: number;
  handlePageChange: (pageNumber: number) => void;
  handleScroll: (current: number) => void;
  listRef: React.RefObject<HTMLLIElement[]>;
}

const RenderPageNumbers = (
  ({
    totalPages,
    currentPage,
    handlePageChange,
    handleScroll,
    listRef,
  }: RenderPageNumbersProps) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={[
            i === currentPage
              ? "bonadocs__editor__projects__action__project__pagination__item__active"
              : "",
            "bonadocs__editor__projects__action__project__pagination__item",
          ].join(" ")}
          onClick={() => handlePageChange(i)}
          ref={(el) => el && (listRef.current![i] = el)}
        >
          {i}
        </li>
      );
    }

    return (
      <>
        {totalPages !== 1 && (
          <>
            <li>
              <img
                className="bonadocs__editor__projects__action__project__pagination__start"
                src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1721372197/Arrow_Down_vml65f.svg"
                alt="back arrow"
                onClick={() => {
                  if (currentPage !== 1) {
                    handlePageChange(currentPage - 1);
                    handleScroll(currentPage - 1);
                  }
                }}
              />
            </li>
            <div className="bonadocs__editor__projects__action__project__pagination__numbers">
              {pageNumbers}
            </div>

            <li>
              <img
                className="bonadocs__editor__projects__action__project__pagination__end"
                src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1721372197/Arrow_Down_vml65f.svg"
                onClick={() => {
                  if (currentPage !== totalPages) {
                    handlePageChange(currentPage + 1);
                    handleScroll(currentPage + 1);
                  }
                }}
                alt="forward arrow"
              />
            </li>
          </>
        )}
      </>
    );
  }
);
