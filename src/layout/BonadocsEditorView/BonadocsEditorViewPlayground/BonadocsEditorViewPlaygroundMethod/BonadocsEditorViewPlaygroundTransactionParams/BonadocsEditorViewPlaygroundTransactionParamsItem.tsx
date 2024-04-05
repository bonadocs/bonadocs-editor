import React from "react";
import { TextInput } from "@/components/input/TextInput";
import { BonadocsWidgetParamProps } from "@/data/dataTypes";

interface BonadocsEditorViewPlaygroundTransactionParamsItemProps {
  param: BonadocsWidgetParamProps;
}

export const BonadocsEditorViewPlaygroundTransactionParamsItem: React.FC<
  BonadocsEditorViewPlaygroundTransactionParamsItemProps
> = ({ param }) => {
  // Add your component logic here

  return (
    <div className="bonadocs__editor__dashboard__playground__transaction__param__item">
      <div className="bonadocs__editor__dashboard__playground__transaction__param__item__header">
        <h3>{param.name}</h3>
        <img
          alt="doc icon"
          src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1712244017/doc_button_v0hfon.svg"
        />
      </div>

      <TextInput
        className="bonadocs__editor__dashboard__playground__transaction__param__item__input"
        placeholder="from"
        value="scdsdc"
        handleChange={() => console.log("sfs")}
      />
    </div>
  );
};
