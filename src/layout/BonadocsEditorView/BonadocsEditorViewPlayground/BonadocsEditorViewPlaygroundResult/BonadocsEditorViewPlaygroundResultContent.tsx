import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import {
  updateActiveContractDocs,
  getActiveContractDocs,
} from "@/store/contract/contractSlice";
import { useCollectionContext } from "@/context/CollectionContext";
interface BonadocsEditorViewPlaygroundResultContentProps {
  // Add any props you need for the component here
}

export const BonadocsEditorViewPlaygroundResultContent: React.FC<
  BonadocsEditorViewPlaygroundResultContentProps
> = (props) => {
  const { getCollection } = useCollectionContext();
    const contract = useSelector(
      (state: RootState) => state.contract.currentContract
    );
  const [docs, setDocs] = React.useState<string>(contract.docs!);
  const dispatch = useDispatch<AppDispatch>();

  const setCurrentContractDocs = useCallback(
      _.debounce(async (docs: string) => {
        console.log('start');
        
      await dispatch(updateActiveContractDocs({ collection: getCollection()!, docs }));
        console.log('finish');
        
      //   setDocs(contract.docs || "");
    }, 1000),
    []
  );

  async function getActiveContract() {
    // try {
        dispatch(getActiveContractDocs(getCollection()!))
        
        
     setDocs(contract.docs || "");
    // } catch (error) {
    //   console.error(error);
    // }

    // console.log(documentation.payload, "documentation");
    // const updatedDocs: any = documentation.payload;
    // setDocs(updatedDocs || "");
  }

  useEffect(() => {
     getActiveContract();

    console.log(contract.contractId, "contractId");
  }, [contract.contractId, contract.docs]);
  return (
    <div className="bonadocs__editor__dashboard__playground__result__docs__content">
      <textarea
        value={docs}
        className="bonadocs__editor__dashboard__playground__result__docs__content__textarea"
        onChange={(e) => {
          setDocs(e.target.value);
          if (contract) {
            setCurrentContractDocs(e.target.value);
          }
        }}
      />
    </div>
  );
};
