import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { customSideStyles } from "@/data/toast/toastConfig";
import { TextInput } from "@/components/input/TextInput";
import { BonadocsEditorActionsModalPackageAddList } from "./BonadocsEditorActionsModalPackageAddList";
import { BonadocsEditorActionsModalPackageAddSearch } from "./BonadocsEditorActionsModalPackageAddSearch";
import { BonadocsEditorActionsModalPackageAddHeader } from "./BonadocsEditorActionsModalPackageAddHeader";
interface BonadocsEditorActionsModalPackageAddProps {
  show?: boolean;
  closeAddModal: () => void;
}

export const BonadocsEditorActionsModalPackageAdd: React.FC<
  BonadocsEditorActionsModalPackageAddProps
> = ({ show, closeAddModal }) => {
  const [open, isOpen] = useState<boolean>(false);
  const [displayList, setDisplayList] = useState<boolean>(true);

  function showList(show: boolean) {
    setDisplayList(show);
  }

  useEffect(() => {
    isOpen(show ?? false);
  }, [show]);
  const closeModal = () => {
    isOpen(!open);
    closeAddModal();
    setDisplayList(true);
  };

  return (
    <Modal
      style={customSideStyles}
      contentLabel="Contract Modal"
      isOpen={open}
      onRequestClose={closeModal}
    >
      <div className="modal__side__container">
        <BonadocsEditorActionsModalPackageAddHeader onClose={closeModal} />
        <BonadocsEditorActionsModalPackageAddSearch showSearch={showList} />
        {displayList && <BonadocsEditorActionsModalPackageAddList />}
      </div>
    </Modal>
  );
};
