import React, { useState } from "react";
import { Popover } from "@headlessui/react";
import { usePopper } from "react-popper";

import { TextInput } from "@/components/input/TextInput";
import { ContractParam } from "@bonadocs/core";

interface TextInputDescriptionProps {
  description: string;
  inputValue: ContractParam;
  name: string;
  handleChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeDocs: (event: React.ChangeEvent<HTMLInputElement>) => void;
  docState: boolean;
}

export const TextInputDescription: React.FC<TextInputDescriptionProps> = ({
  description,
  name,
  handleChangeDocs,
  handleChangeInput,
  docState,
  inputValue,
}) => {
  let [referenceElement, setReferenceElement] = useState<any>();
  let [popperElement, setPopperElement] = useState<any>();
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-end",
    strategy: "absolute",
  });
  return (
    <div className="bonadocs__editor__param__item">
      <div className="bonadocs__editor__param__item__header">
        <h3>{name}</h3>
        <Popover className="relative ma-auto">
          <Popover.Button ref={setReferenceElement}>
            <img
              alt="doc icon"
              src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1712244017/doc_button_v0hfon.svg"
            />
          </Popover.Button>
          <Popover.Panel
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
            className="bonadocs__editor__param__item__popover"
          >
            <div className="bonadocs__editor__param__item__description">
              <h3>Description</h3>
              <TextInput
                disabled={docState}
                className="bonadocs__editor__param__item__popover__input"
                placeholder="from"
                value={description}
                handleChange={handleChangeDocs}
              />
            </div>
          </Popover.Panel>
        </Popover>
      </div>

      <TextInput
        className="bonadocs__editor__dashboard__playground__transaction__param__item__input"
        placeholder={name}
        value={String(inputValue)}
        handleChange={handleChangeInput}
      />
    </div>
  );
};
