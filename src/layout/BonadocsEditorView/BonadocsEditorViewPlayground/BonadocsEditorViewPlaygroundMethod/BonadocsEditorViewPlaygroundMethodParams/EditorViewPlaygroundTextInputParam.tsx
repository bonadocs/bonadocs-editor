import React, { useEffect, useState } from "react";
import { TextInput } from "@/components/input/TextInput";
import { CollectionDataManager } from "@bonadocs/core";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/index";
import { RootState } from "@/store/index";
import { useSelector } from "react-redux";
import {
  setMethodViewValue,
  getMethodViewValue,
} from "@/store/method/methodSlice";

type EditorViewPlaygroundTextInputParamProps = {
  name?: string;
  baseType: string;
  path: string;
  collection: CollectionDataManager;
  className?: string;
};

export const EditorViewPlaygroundTextInputParam: React.FC<
  EditorViewPlaygroundTextInputParamProps
> = ({ name, baseType, path, collection, className }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [inputValue, setInputValue] = useState("");
  const method = useSelector((state: RootState) => state.method.methodItem);
  const updateDisplayData = useSelector(
    (state: RootState) => state.method.updateChange
  );
  const value = async () => {
    const viewValue = await dispatch(getMethodViewValue({ collection, path }));
    console.log(viewValue, "viewValue");
    return viewValue.payload as string;
  };

  const updateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setMethodViewValue({ collection, path, value: event.target.value })
    );

    setInputValue(event.target.value);
  };
  useEffect(() => {
    value().then(setInputValue);
  }, [method.fragmentKey, updateDisplayData]);

  return (
    <TextInput
      value={inputValue ?? ""}
      handleChange={updateChange}
      placeholder={name ? name : baseType}
      className={className}
    />
  );
};
