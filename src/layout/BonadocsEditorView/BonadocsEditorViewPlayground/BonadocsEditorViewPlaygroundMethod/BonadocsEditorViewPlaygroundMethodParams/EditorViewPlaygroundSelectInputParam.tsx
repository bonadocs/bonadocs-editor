import React, { useEffect, useState } from "react";
import { SelectInput } from "@/components/input/SelectInput";
import { Option } from "@/data/dataTypes";
import { CollectionDataManager, FunctionFragmentView } from "@bonadocs/core";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/index";
import {
  setMethodViewValue,
  getMethodViewValue,
} from "@/store/method/methodSlice";
import { RootState } from "@/store/index";
import { useSelector } from "react-redux";
interface EditorViewPlaygroundSelectInputParamProps {
  collection: CollectionDataManager;
  path: string;
  options: Option[];
  className?: string;
}
export const EditorViewPlaygroundSelectInputParam: React.FC<
  EditorViewPlaygroundSelectInputParamProps
> = ({ collection, path, options, className }) => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const method = useSelector((state: RootState) => state.method.methodItem);
  const updateDisplayData = useSelector((state: RootState) => state.method.updateChange);
  const str2bool = (value: string) => {
    if (value && typeof value === "string") {
      if (value.toLowerCase() === "true") return true;
      if (value.toLowerCase() === "false") return false;
    }
    return value;
  };

  const selectedValue = async () => {
    const viewValue = await dispatch(getMethodViewValue({ collection, path }));
    
    return viewValue.payload as string;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      setMethodViewValue({
        collection,
        path,
        value: String(str2bool(event.target.value)),
      })
    );
    setValue(event.target.value);
  };

  useEffect(() => {
    selectedValue().then(setValue);
  }, [method.fragmentKey, updateDisplayData]);


  return (
    <SelectInput
      options={options}
      handleInputChange={handleInputChange}
      selectedValue={value ?? "false"}
      className={className}
    />
  );
};
