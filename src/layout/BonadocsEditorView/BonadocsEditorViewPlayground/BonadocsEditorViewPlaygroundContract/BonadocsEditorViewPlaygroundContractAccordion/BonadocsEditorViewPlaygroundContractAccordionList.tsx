import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { BonadocsEditorViewPlaygroundContractAccordionItem } from "./BonadocsEditorViewPlaygroundContractAccordionItem";
interface BonadocsEditorViewPlaygroundContractAccordionProps {
  className?: string;
}

export const BonadocsEditorViewPlaygroundContractAccordionList: React.FC<
  BonadocsEditorViewPlaygroundContractAccordionProps
> = ({ className }) => {
  const contracts = useSelector(
    (state: RootState) => state.contract.collectionContracts
  );
  const contractEdit = useSelector(
    (state: RootState) => state.contract.contractEdit
  );

  return (
    <div className={className}>
      {contracts &&
        contracts?.map((contract, index) => (
          <BonadocsEditorViewPlaygroundContractAccordionItem
            index={index}
            contractItem={contract!}
            key={index}
          />
        ))}
    </div>
  );
};
