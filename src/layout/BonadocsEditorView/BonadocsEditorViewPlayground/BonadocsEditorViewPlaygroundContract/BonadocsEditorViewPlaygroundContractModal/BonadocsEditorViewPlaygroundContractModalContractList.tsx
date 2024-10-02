import React, { useEffect, useRef } from "react";
import { BonadocsEditorViewPlaygroundContractModalContractItem } from "./BonadocsEditorViewPlaygroundContractModalContractItem";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setContracts, reset } from "@/store/project/projectSlice";
import { useCollectionContext } from "@/context/CollectionContext";
import { ContractsState } from "@/data/dataTypes";
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

  useEffect(() => {
    // if (isInitialRender.current) {
    //   isInitialRender.current = false;
    //   console.log("update 0", tempContracts);
    // } else {
    //   console.log("update", tempContracts);
    //   setContractList(tempContracts);
    //   dispatch(setContracts(tempContracts));
    // }
    // if (tempContracts && tempContracts.length > 0) {
    // else {
    // dispatch(setContracts(UIContracts));
    // setContractList(UIContracts);
    //}
  }, []);

  // useEffect(() => {
  //   setContractList(UIContracts);
  //   dispatch(setContracts(UIContracts));

  //   return () => {
  //     dispatch(setContracts([]));
  //     setContractList([]);
  //   };
  // }, []);

  useEffect(() => {
    if (show)
      if (tempContracts && tempContracts.length > 0) {
        if (tempContracts[0].name) {
//           console.log("temp");
// console.log(tempContracts);
          setContractList(tempContracts);
        } else {
          // console.log(tempContracts);
          
          console.log("original clone");
          dispatch(setContracts(UIContracts));
          setContractList(UIContracts);
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
