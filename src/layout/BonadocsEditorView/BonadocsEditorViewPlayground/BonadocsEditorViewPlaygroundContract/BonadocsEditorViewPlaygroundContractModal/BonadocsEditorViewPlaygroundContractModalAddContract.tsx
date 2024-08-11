import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  Ref,
  useRef,
} from "react";
import { TextareaInput } from "@/components/input/TextareaInput";
import { TextInput } from "@/components/input/TextInput";
import {
  addContract,
  addPlaygroundContractValidation,
} from "@/store/project/projectSlice";
import { ContractInstance, ContractsState } from "@/data/dataTypes";
import { BonadocsEditorViewPlaygroundContractModalContractItemInstancesAdd } from "./BonadocsEditorViewPlaygroundContractModalContractItemInstancesAdd";
import { supportedChains } from "@bonadocs/core";
import { BonadocsEditorViewPlaygroundContractModalAddContractInstances } from "./BonadocsEditorViewPlaygroundContractModalAddContractInstances";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { toast } from "react-toastify";

interface BonadocsEditorViewPlaygroundContractModalAddContractProps {
  // Add your props here
}

export interface BonadocsEditorViewPlaygroundContractModalAddContractRef {
  submitContract: () => void;
}

export const BonadocsEditorViewPlaygroundContractModalAddContract = forwardRef<
  BonadocsEditorViewPlaygroundContractModalAddContractRef,
  BonadocsEditorViewPlaygroundContractModalAddContractProps
>((props, ref) => {
  const [contract, setContract] = useState<ContractsState>(
    {} as ContractsState
  );
  const [open, setOpen] = useState<boolean>(false);

  const options = Array.from(supportedChains)
    .filter(
      (chain) =>
        !contract.contractInstances?.some(
          (instance) => instance.chainId === chain[1].chainId
        )
    )
    .map((instance) => {
      return {
        label: instance[1].name,
        value: instance[1].chainId,
      };
    });

  const dispatch = useDispatch<AppDispatch>();

  const submitContract = async (): Promise<boolean> => {
    const valid = await dispatch(addPlaygroundContractValidation(contract));

    if (
      !(valid.payload as { message: string; status: boolean } | undefined)
        ?.status
    ) {
      toast.error((valid.payload as any)?.message);
      return false;
    } else dispatch(addContract(contract));
    return true;
  };

  useImperativeHandle(ref, () => ({
    submitContract,
  }));

  return (
    <div className="bonadocs__editor__projects__action__contract__form">
      <div className="bonadocs__editor__projects__action__contract__form__item">
        <h4 className="bonadocs__editor__projects__action__contract__form__item__name">
          Contract name
        </h4>
        <TextInput
          className="bonadocs__editor__projects__action__contract__form__item__input"
          handleChange={(e) =>
            setContract({ ...contract, name: e.target.value })
          }
          placeholder="Contract name"
          value={contract["name"] as string}
        />
      </div>
      <div className="bonadocs__editor__projects__action__contract__form__item">
        <h4 className="bonadocs__editor__projects__action__contract__form__item__name">
          Contract description
        </h4>
        <TextareaInput
          className="bonadocs__editor__projects__action__contract__form__item__input"
          handleChange={(e) =>
            setContract({ ...contract, description: e.target.value })
          }
          value={contract["description"]}
          placeholder="Contract description"
        />
      </div>

      <div className="bonadocs__editor__projects__action__contract__form__item">
        <h4 className="bonadocs__editor__projects__action__contract__form__item__name">
          Contract ABI
        </h4>
        <TextareaInput
          className="bonadocs__editor__projects__action__contract__form__item__input"
          handleChange={(e) =>
            setContract({ ...contract, abi: e.target.value })
          }
          value={contract["abi"]}
          placeholder="Contract description"
        />
      </div>
      <div className="bonadocs__editor__projects__action__contract__form__item">
        <h4 className="bonadocs__editor__projects__action__contract__form__item__name">
          Add contract instances
        </h4>
        <BonadocsEditorViewPlaygroundContractModalAddContractInstances
          instances={contract.contractInstances!}
          setOpen={setOpen}
          open={open}
          updateInstance={setContract}
        />
      </div>
      <BonadocsEditorViewPlaygroundContractModalContractItemInstancesAdd
        handleAddContractInstance={(chainId) => {
          console.log(chainId, "chain id");
          console.log(options, "options");

          const newContractInstance: ContractInstance = {
            chainId,
            address: "",
            verification: false,
            abi: "",
          };
          setContract({
            ...contract,
            contractInstances: [
              ...(contract.contractInstances ?? []),
              newContractInstance,
            ],
          });
        }}
        options={options}
        show={open}
        closeInstanceAddModal={() => setOpen(!open)}
      />
    </div>
  );
});
