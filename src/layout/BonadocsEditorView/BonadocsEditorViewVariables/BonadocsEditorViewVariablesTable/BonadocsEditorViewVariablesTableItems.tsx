import React, { useEffect, useRef, useState } from "react";
import { BonadocsEditorViewVariablesTableItem } from "./BonadocsEditorViewVariablesTableItem";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const BonadocsEditorViewVariablesTableItems = () => {
  const variables = useSelector(
    (state: RootState) => state.variable.collectionVariables
  );

  useEffect(() => {}, [variables]);
  return (
    <>
      {variables && (
        <div className="bonadocs__editor__variables__table__items">
          {variables.map((variable, index) => (
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
