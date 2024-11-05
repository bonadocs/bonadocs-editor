import React, { useEffect } from "react";
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
import { useParams, useSearchParams } from "react-router-dom";
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
  const [queryParameters] = useSearchParams();
  const uri = queryParameters.get("uri");
  const { projectId, id } = useParams();
  const teamId = id;
  const method = useSelector((state: RootState) => state.method.methodItem);
  const { getCollection, emptyResponse } = useCollectionContext();
  async function setActiveMethod(
    methodName: string,
    fragmentKey: string,
    contractId: string,
    readMethod: boolean
  ) {
    const functionFragment = await getCollection()?.getFunctionFragmentView(
      contractId!,
      fragmentKey
    );
    const methodDocs = async () => await functionFragment?.getDocText();
    dispatch(
      setMethodItem({
        // collection: getCollection()!,
        // methodItem: {
        name: methodName,
        fragmentKey,
        contractId,
        instances: contractItem.instances,
        docs: await methodDocs(),
        readMethod,
        // },
      })
    );

    dispatch(setMethodViewValue({ collection: getCollection()! }));

    if (projectId && teamId) {
      dispatch(
        setActiveContract({
          ...contractItem,
          uri: `/projects/${teamId}/collections/${projectId}`,
        })
      );
    } else if (uri) {
      setActiveContract({
        ...contractItem,
        uri,
      });
    }

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
