import React, { useEffect, useRef, useState } from "react";
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
  const [UIContractList, setUIContractList] = useState<ContractsState[]>([]);
  const contracts = useSelector(
    (state: RootState) => state.contract.collectionContracts
  );

  const tempContracts = useSelector(
    (state: RootState) => state.project.contracts
  );

  const { getCollection } = useCollectionContext();
  const isInitialRender = useRef(true);
  const dispatch = useDispatch<AppDispatch>();

  async function UIContracts() {
    const contractLoop = contracts.map(async (contract) => {
      const contractView = await getCollection()?.getContractManagerView();
      const currentContract =
        contractView && contractView.getContract(contract.contractId);

      const abi =
        contractView &&
        contractView.getContractInterface(currentContract?.interfaceHash!)?.abi;

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

    const responses = await Promise.all(contractLoop);
    setUIContractList(responses as ContractsState[]);
  }

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
    initializeModal()
  }, []);

  const initializeModal = async () => {
    await UIContracts();
    if (show)
      if (tempContracts && tempContracts.length > 0) {
        if (_.isEqual(tempContracts[0], emptyContracts[0])) {
          console.log("original clone");
          dispatch(setContracts(UIContractList));
          setContractList(UIContractList);
        } else {
          console.log("tempContracts");
          console.log(tempContracts);

          setContractList(tempContracts);
        }
      } else {
        console.log("original");
        dispatch(setContracts(UIContractList));
        setContractList(UIContractList);
      }
  };

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
