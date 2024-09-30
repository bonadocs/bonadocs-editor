import React from "react";
import { BonadocsWidgetParamProps } from "@/data/dataTypes";
import { TextInputDescription } from "@/components/input/TextInputDescription";
import { setTransactionOverrides } from "@/store/method/methodSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

interface BonadocsEditorViewPlaygroundTransactionParamsItemProps {
  param: BonadocsWidgetParamProps;
}

export const BonadocsEditorViewPlaygroundTransactionParamsItem: React.FC<
  BonadocsEditorViewPlaygroundTransactionParamsItemProps
> = ({ param }) => {
  const dispatch = useDispatch<AppDispatch>();
  const transactionOverrides = useSelector(
    (state: RootState) => state.method.transactionOverrides
  );
  const viewIndex = 0;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let overrides = transactionOverrides.map((item) =>
      Object.assign({}, item, {})
    );

    if (overrides[viewIndex] == null) {
      overrides[viewIndex] = {}; // Initialize overrides[viewIndex] as an empty object
      overrides[viewIndex][param.overrideKey] = (
        event.target as HTMLInputElement
      ).value;
    } else {
      overrides[viewIndex][param.overrideKey] = (
        event.target as HTMLInputElement
      ).value;
      if (overrides[viewIndex][param.overrideKey] === "") {
        delete overrides[viewIndex][param.overrideKey];
      }
    }
    
    dispatch(setTransactionOverrides([...overrides]));
  };

  return (
    <TextInputDescription
      description={param.description}
      inputValue={
        transactionOverrides[viewIndex] &&
        transactionOverrides[viewIndex][param.overrideKey]
          ? transactionOverrides[viewIndex][param.overrideKey]!
          : ""
      }
      name={param.name}
      docState={false}
      handleChangeDocs={() => {}}
      handleChangeInput={handleChange}
    />
  );
};
