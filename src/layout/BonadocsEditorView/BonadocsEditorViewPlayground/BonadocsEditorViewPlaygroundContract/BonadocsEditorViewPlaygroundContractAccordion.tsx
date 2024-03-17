import React, { useEffect, useState } from "react";
import { Accordion } from "@/components/accordion/Accordion";
import { useCollectionContext } from "@/context/CollectionContext";
import { useSearchParams } from "react-router-dom";
import { ContractDefinition } from "@bonadocs/core";
interface BonadocsEditorViewPlaygroundContractAccordionProps {
  className?: string;
}

export const BonadocsEditorViewPlaygroundContractAccordion: React.FC<
  BonadocsEditorViewPlaygroundContractAccordionProps
> = ({ className }) => {
  const [contracts, setContracts] = useState<ContractDefinition[]>();
  const [queryParameters] = useSearchParams();
  const uri = queryParameters.get("uri");

  const { initializeEditor, collection, logButton } = useCollectionContext();

  useEffect(() => {
    void initializeCollection();
  }, []);

  const initializeCollection = async () => {
    if (!uri) return;
    
    const project = await initializeEditor(uri);
    
    setContracts(project?.data.contracts);
  };

  

  return (
    <div className={className}>
      <button onClick={logButton}>Log Collection</button>
      {contracts &&
        contracts?.map((contract, index) => (
          <Accordion key={index} title={contract?.name} />
        ))}
    </div>
  );
};
