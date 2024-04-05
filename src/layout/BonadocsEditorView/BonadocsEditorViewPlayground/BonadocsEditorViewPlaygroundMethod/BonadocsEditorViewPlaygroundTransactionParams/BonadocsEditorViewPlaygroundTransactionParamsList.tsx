import React from "react";
import { BonadocsEditorViewPlaygroundTransactionParamsItem } from "./BonadocsEditorViewPlaygroundTransactionParamsItem";
import { transactionOverridesParams } from "@/data/dataTypes";

interface BonadocsEditorViewPlaygroundTransactionParamsListProps {
  // Define the props for the component here
}

export const BonadocsEditorViewPlaygroundTransactionParamsList: React.FC<
  BonadocsEditorViewPlaygroundTransactionParamsListProps
> = (props) => {
  return (
    <div className="bonadocs__editor__dashboard__playground__transaction__param__list">
      {transactionOverridesParams.map((param, index) => (
        <BonadocsEditorViewPlaygroundTransactionParamsItem
          param={param}
          key={index}
        />
      ))}
    </div>
  );
};
