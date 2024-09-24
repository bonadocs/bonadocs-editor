import React, { useEffect } from "react";
import { BonadocsEditorViewPlaygroundContractModalContractItem } from "./BonadocsEditorViewPlaygroundContractModalContractItem";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setContracts } from "@/store/project/projectSlice";
import { useCollectionContext } from "@/context/CollectionContext";
import { ContractsState } from "@/data/dataTypes";
interface BonadocsEditorViewPlaygroundContractModalContractListProps {
  searchValue: string;
}

export const BonadocsEditorViewPlaygroundContractModalContractList: React.FC<
  BonadocsEditorViewPlaygroundContractModalContractListProps
> = ({ searchValue }) => {
  const contracts = useSelector(
    (state: RootState) => state.contract.collectionContracts
  );

  const tempContracts = useSelector(
    (state: RootState) => state.project.contracts
  );

  const { getCollection } = useCollectionContext();

  const dispatch = useDispatch<AppDispatch>();
  const UIContracts = contracts.map((contract) => {
    const currentContract = getCollection()?.contractManagerView.getContract(
      contract.contractId
    );
    const abi = getCollection()?.contractManagerView.getContractInterface(
      currentContract?.interfaceHash!
    )?.abi;
    return {
      id: contract.contractId,
      name: contract.name,
      interfaceHash: "",
      abi,
      description: contract.docs,
      instances: [],
      contractInstances: contract.instances,
    };
  });
  const [contractList, setContractList] = React.useState<ContractsState[]>([]);

  useEffect(() => {
    if (tempContracts[0].name !== "" && tempContracts.length > 0) {
      setContractList(tempContracts);
    } else {
      dispatch(setContracts(UIContracts));
      setContractList(UIContracts);
    }
  }, []);

  return (
    <div className="bonadocs__editor__projects__action__contract__list">
      {contractList &&
        contractList
          ?.filter(
            (contract) =>
              contract.name?.toLowerCase().includes(searchValue) ||
              searchValue.toLowerCase() === ""
          )
          .map((contract, index) => (
            <BonadocsEditorViewPlaygroundContractModalContractItem
              contractItem={contract!}
              key={index}
              handleUpdate={setContractList!}
            />
          ))}
    </div>
  );
};
