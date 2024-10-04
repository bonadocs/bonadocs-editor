import React, { useEffect, useRef } from "react";
import { BonadocsEditorViewPlaygroundContractModalContractItem } from "./BonadocsEditorViewPlaygroundContractModalContractItem";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setContracts, reset } from "@/store/project/projectSlice";
import { useCollectionContext } from "@/context/CollectionContext";
import { ContractInstance, ContractsState } from "@/data/dataTypes";
import _ from "lodash";

interface BonadocsEditorViewPlaygroundContractModalContractListProps {
  searchValue: string;
  show: boolean;
}

export const BonadocsEditorViewPlaygroundContractModalContractList: React.FC<
  BonadocsEditorViewPlaygroundContractModalContractListProps
> = ({ searchValue, show }) => {
  const contracts = useSelector(
    (state: RootState) => state.contract.collectionContracts
  );

  const tempContracts = useSelector(
    (state: RootState) => state.project.contracts
  );

  const { getCollection } = useCollectionContext();
  const isInitialRender = useRef(true);
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

  const emptyContract = {
    id: "0",
    name: "",
    interfaceHash: "",
    instances: [],
  };

  const emptyContracts: ContractsState[] = [
    {
      ...emptyContract,
      description: "",
      abi: "",
      contractInstances: [] as ContractInstance[],
    },
  ];

  useEffect(() => {
    if (show)
      if (tempContracts && tempContracts.length > 0) {
        if (_.isEqual(tempContracts[0], emptyContracts[0])) {
           console.log("original clone");
          dispatch(setContracts(UIContracts));
          setContractList(UIContracts);
        } else {
           console.log("tempContracts");
          console.log(tempContracts);
          
          setContractList(tempContracts);
        }
      } else {
         console.log("original");
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
