import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  Ref,
  useRef,
  useCallback,
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
import clsx from "clsx";
import _ from "lodash";
import { getApi } from "@bonadocs/core";

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
  const [openABI, setOpenABI] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
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

  const submitContract = async () => {
    try {
      let abiContract;

      if (
        contract["contractInstances"] &&
        contract["contractInstances"]!.length > 0
      ) {
        abiContract = await loadABI(
          contract["contractInstances"][0].address,
          contract["contractInstances"][0].chainId
        );
      }
      if (abiContract) {
        const valid = await dispatch(
          addPlaygroundContractValidation(abiContract)
        );
        
        if (
          !(valid.payload as { message: string; status: boolean } | undefined)
            ?.status
        ) {
          
          toast.error((valid.payload as any)?.message);
          return false;
        } else dispatch(addContract(abiContract));
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  useImperativeHandle(ref, () => ({
    submitContract,
  }));

  const loadABI = async (address?: string, chainId?: number) => {
    const EVMaddress = address;
    let state, tempContract;
    if (EVMaddress?.length === 42) {
      setLoading(true);
      await getApi()
        .loadContractABI(chainId!, EVMaddress)
        .then((abi) => {
          tempContract = { ...contract, abi: abi! };
          if (typeof abi === "undefined") {
            toast.error("ABI error. Input it manually.");
            setOpenABI(true);
          } else {
            tempContract = { ...contract, abi: abi! };
          }

          setLoading(false);

          return true;
        })
        .catch((err) => {
          setLoading(false);
          setOpenABI(true);
          console.log(err, "error");
          toast.error("Error loading ABI");
          return false;
        });
    }
    return tempContract;
  };

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
          Add networks
        </h4>
        <BonadocsEditorViewPlaygroundContractModalAddContractInstances
          instances={contract.contractInstances!}
          setOpen={setOpen}
          open={open}
          updateInstance={setContract}
        />
      </div>
      <h4
        className="bonadocs__editor__projects__action__select__name"
        onClick={() => setOpenABI(!openABI)}
      >
        Edit ABI
        <img
          alt="arrow down"
          className={clsx(
            "bonadocs__editor__projects__creation__selection__item__icon",
            openABI &&
              "bonadocs__editor__projects__creation__selection__item__icon__active"
          )}
          src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1721372197/Arrow_Down_vml65f.svg"
        />
      </h4>

      {openABI && (
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
            placeholder="Contract ABI"
          />
        </div>
      )}

      <BonadocsEditorViewPlaygroundContractModalContractItemInstancesAdd
        handleAddContractInstance={(chainId) => {
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
function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
