import React, { useState } from "react";
import { BonadocsWidgetParamProps } from "@/data/dataTypes";
import { TextInputDescription } from "@/components/input/TextInputDescription";

interface BonadocsEditorViewPlaygroundTransactionParamsItemProps {
  param: BonadocsWidgetParamProps;
}

export const BonadocsEditorViewPlaygroundTransactionParamsItem: React.FC<
  BonadocsEditorViewPlaygroundTransactionParamsItemProps
  > = ({ param }) => {
  
  return (
    <TextInputDescription
      description={param.description}
      inputValue={"klmlkm"}
      name={param.name}
      docState={false}
      handleChangeDocs={() => {}}
      handleChangeInput={() => {}}
    />
  );
};
