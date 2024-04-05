import React from "react";
import { Accordion } from "@/components/accordion/Accordion";
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

  return (
    <div className={className}>
      {contracts &&
        contracts?.map((contract, index) => (
          <BonadocsEditorViewPlaygroundContractAccordionItem
            index={index}
            contractItem={contract!}
          />
        ))}
    </div>
  );
};
