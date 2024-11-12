import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { TextInput } from "@/components/input/TextInput";
import { Button } from "@/components/button/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { customStyles } from "@/data/toast/toastConfig";
import { useCollectionContext } from "@/context/CollectionContext";
import { ActionItem } from "@/data/dataTypes";
import { toast } from "react-toastify";
import { Loader } from "@/components/loader/Loader";
import { validateString } from "@/data/variables/variableValidation";
import { renameWorkflowAction } from "@/store/action/actionSlice";
import { Dropdown } from "@/components/dropdown/Dropdown";
import { supportedChains } from "@bonadocs/core";
import _ from "lodash";
interface BonadocsEditorViewActionsModalEditProps {
  className?: string;
  show?: boolean;
  closeEditModal: () => void;
  actionItem: ActionItem;
}
export const BonadocsEditorViewActionsModalEdit: React.FC<
  BonadocsEditorViewActionsModalEditProps
> = ({ show, closeEditModal, actionItem }) => {
  const [actionName, setActionName] = useState<string>(actionItem.name);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, isOpen] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const { getCollection } = useCollectionContext();

  const editAction = async () => {
    setLoading(true);

    if (!validateString(actionName)) {
      setLoading(false);
      toast.error("Action name is invalid");
      return;
    }

    // if (actionItem.name !== actionName) {
    await dispatch(
      renameWorkflowAction({
        collection: getCollection()!,
        workflowName: actionName,
        workflowId: actionItem.id,
        workflowChainId: selectedChainId,
      })
    );
    // }
    setLoading(false);
    closeModal();
  };

  const options = Array.from(supportedChains).map((instance) => {
    return {
      label: instance[1].name,
      value: instance[1].chainId,
    };
  });

  const currentChain = getCollection()?.valueManagerView.getString(
    `workflow-chain-id-${actionItem.id}`
  );

  const [selectedChainId, setSelectedChainId] = useState<number>(
    Number(currentChain) ?? (options[1].value as number)
  );

  useEffect(() => {
    isOpen(show ?? false);

    if (show && getCollection()) {
      // console.log(actionItem.id);

      // console.log(
      //   getCollection()?.valueManagerView.getString(
      //     `workflow-chain-id-${actionItem.id}`
      //   ),
      //   "currentChain"
      // );

      setSelectedChainId(Number(currentChain));
    }
  }, [show]);

  useEffect(() => {
    setActionName(actionItem.name);
  }, [actionItem]);

  const closeModal = () => {
    isOpen(!open);
    closeEditModal();
  };

  return (
    <Modal
      // className='dsds'
      style={customStyles}
      contentLabel="Contract Modal"
      isOpen={open}
      onRequestClose={closeModal}
    >
      <div className="modal__close" onClick={closeModal}>
        <svg
          className="modal__close__img"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 6L6 18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 6L18 18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="modal__container">
        <h3 className="modal__container__title">Edit Action</h3>
        <div className="modal__container__text">Action name</div>
        <TextInput
          placeholder="name"
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setActionName(event.target.value);
          }}
          value={actionName}
        />

        <div className="modal__container__text">Action network</div>

        <Dropdown
          options={options}
          updateId={(e) => setSelectedChainId(Number(e.target.value))}
          className="modal__container__dropdown"
          selectedValue={selectedChainId}
        />

        <div className="modal__container__wrapper">
          <Button
            disabled={loading}
            type="action"
            onClick={() => editAction()}
            className="modal__container__button"
          >
            <>
              {loading ? (
                <Loader
                  className="spinner"
                />
              ) : (
                "Edit Action"
              )}
            </>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
