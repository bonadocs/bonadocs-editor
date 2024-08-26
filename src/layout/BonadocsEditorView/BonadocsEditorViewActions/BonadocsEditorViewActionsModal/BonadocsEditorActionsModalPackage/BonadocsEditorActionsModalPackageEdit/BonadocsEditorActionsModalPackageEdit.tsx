import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Button } from "@/components/button/Button";
import { customStyles } from "@/data/toast/toastConfig";
import { ActionItem } from "@/data/dataTypes";
import MoonLoader from "react-spinners/ClipLoader";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { SelectInput } from "@/components/input/SelectInput";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { useCollectionContext } from "@/context/CollectionContext";
import { setCurrentPackageVersion } from "@/store/package/packageSlice";

interface BonadocsEditorActionsModalPackageEditProps {
  className?: string;
  show?: boolean;
  closeEditModal: () => void;
  actionItem?: ActionItem;
  selectedValue: string;
}
export const BonadocsEditorActionsModalPackageEdit: React.FC<
  BonadocsEditorActionsModalPackageEditProps
> = ({ show, closeEditModal, actionItem, selectedValue }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, isOpen] = useState<boolean>(false);
  const [selectedPackage, setSelectedPackage] = useState<string>(selectedValue);
  const dispatch: AppDispatch = useDispatch();
  const { getCollection } = useCollectionContext();
  const collectionPackages = useSelector(
    (state: RootState) => state.package.collectionPackages
  );

  const editPackage = async () => {
    setLoading(true);

    setLoading(false);
    // closeModal();
  };

  useEffect(() => {
    isOpen(show ?? false);
  }, [show]);

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
      <div className="modal__close" onClick={() => closeModal()}>
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
        <h3 className="modal__container__title">Edit Package Version</h3>
        <div className="modal__container__text">Package Version</div>
        <SelectInput
          handleInputChange={(item) => {
            if (item.target.value !== "none") {
              setSelectedPackage(item.target.value);
            }
          }}
          options={collectionPackages[0].versionList}
          selectedValue={selectedValue}
          
        />

        <div className="modal__container__wrapper">
          <Button
            disabled={loading}
            type="action"
            onClick={() => {
              dispatch(
                setCurrentPackageVersion({
                  collection: getCollection()!,
                  packageVersion: selectedPackage,
                })
              );
              closeEditModal();
            }}
            className="modal__container__button"
          >
            <>
              {loading ? (
                <MoonLoader
                  color="#fff"
                  loading={true}
                  size={15}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "Edit Package"
              )}
            </>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
