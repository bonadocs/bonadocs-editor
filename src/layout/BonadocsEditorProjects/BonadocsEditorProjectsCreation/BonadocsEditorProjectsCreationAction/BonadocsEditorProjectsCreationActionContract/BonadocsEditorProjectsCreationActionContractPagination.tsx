import React, { useEffect } from "react";
import { Pagination } from "@/components/pagination/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentContract } from "@/store/project/projectSlice";
import { RootState } from "@/store";

interface BonadocsEditorProjectsCreationActionContractPaginationProps {
  scrollToLatest: boolean;
}
export const BonadocsEditorProjectsCreationActionContractPagination: React.FC<
  BonadocsEditorProjectsCreationActionContractPaginationProps
> = ({ scrollToLatest }) => {
  const dispatch = useDispatch();
  const contracts = useSelector((state: RootState) => state.project.contracts);
  const current = useSelector(
    (state: RootState) => state.project.currentContract
  );

  return (
    <Pagination
      onPageChange={(currentPage) => {
        console.log(currentPage, 'currentPage');
        
        dispatch(setCurrentContract(contracts[currentPage - 1]));
      }}
      totalPages={contracts.length}
      page={current ? Number(current.id) + 1 : 1}
      scrollToLatest={scrollToLatest}
      className="bonadocs__editor__projects__action__contract__pagination__wrapper"
    />
  );
};
