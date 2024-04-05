import React, { useEffect, useRef, useState } from "react";
import { BonadocsEditorViewVariablesTableItem } from "./BonadocsEditorViewVariablesTableItem";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { VariableItem } from "@/data/dataTypes";

export const BonadocsEditorViewVariablesTableItems = () => {
  const variables = useSelector(
    (state: RootState) => state.variable.collectionVariables
  );

  useEffect(() => {}, [variables]);
  return (
    <>
      {variables && (
        <div className="bonadocs__editor__variables__table__items">
          {variables.map((variable: VariableItem, index: React.Key | null | undefined) => (
            <BonadocsEditorViewVariablesTableItem
              variable={variable}
              key={index}
            />
          ))}
        </div>
      )}
    </>
  );
};
