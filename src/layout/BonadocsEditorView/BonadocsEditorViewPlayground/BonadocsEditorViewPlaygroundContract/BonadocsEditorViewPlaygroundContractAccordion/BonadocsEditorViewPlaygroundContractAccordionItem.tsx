import React from "react";
import { Accordion } from "@/components/accordion/Accordion";
import { ContractItem } from "@/data/dataTypes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import {
  setMethodItem,
  setTransactionOverrides,
} from "@/store/method/methodSlice";
import { setActiveContract } from "@/store/contract/contractSlice";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useCollectionContext } from "@/context/CollectionContext";
import { setMethodViewValue } from "@/store/method/methodSlice";
import { DisplayResult, ExecutionResult } from "@bonadocs/core";
interface BonadocsEditorViewPlaygroundContractAccordionItemProps {
  index: number;
  contractItem: ContractItem;
}

export const BonadocsEditorViewPlaygroundContractAccordionItem: React.FC<
  BonadocsEditorViewPlaygroundContractAccordionItemProps
> = ({ index, contractItem }) => {
  const dispatch: AppDispatch = useDispatch();
  const writeMethod = useSelector(
    (state: RootState) => state.controlBoard.writeMethod
  );
  const method = useSelector((state: RootState) => state.method.methodItem);
  const { getCollection, emptyResponse } = useCollectionContext();
  function setActiveMethod(
    methodName: string,
    fragmentKey: string,
    contractId: string,
    readMethod: boolean
  ) {
    dispatch(
      setMethodItem({
        name: methodName,
        fragmentKey,
        contractId,
        instances: contractItem.instances,
        readMethod,
      })
    );
    console.log("instances", contractItem.instances);

    dispatch(setMethodViewValue({ collection: getCollection()! }));
    dispatch(setActiveContract(contractItem));
    if (method.fragmentKey !== fragmentKey) {
      dispatch(setTransactionOverrides([]));
      emptyResponse();
    }
  }

  const options = () => {
    const filterMethodItem = (readMethod: boolean) =>
      contractItem.methodItem
        .filter((item) => item.readMethod === readMethod)
        .map((item) => item);

    return writeMethod ? filterMethodItem(false) : filterMethodItem(true);
  };
  return (
    <Accordion
      setActiveItem={setActiveMethod}
      key={index}
      title={contractItem.name}
      id={contractItem.contractId}
      options={options()}
    />
  );
};
