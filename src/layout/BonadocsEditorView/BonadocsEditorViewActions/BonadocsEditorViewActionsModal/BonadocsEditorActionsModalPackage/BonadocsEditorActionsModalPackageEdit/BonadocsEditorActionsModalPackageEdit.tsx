import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Button } from "@/components/button/Button";
import { customStyles } from "@/data/toast/toastConfig";
import { ActionItem } from "@/data/dataTypes";
import { Loader } from "@/components/loader/Loader";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { SelectInput } from "@/components/input/SelectInput";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { useCollectionContext } from "@/context/CollectionContext";
import {
  packageVersions,
  setCurrentPackageVersion,
} from "@/store/package/packageSlice";
import { PersistPartial } from "redux-persist/es/persistReducer";
import { Option } from "@/data/dataTypes";

interface BonadocsEditorActionsModalPackageEditProps {
  className?: string;
  show?: boolean;
  closeEditModal: () => void;
  actionItem?: ActionItem;
  selectedValue: string;
  name?: string;
}
export const BonadocsEditorActionsModalPackageEdit: React.FC<
  BonadocsEditorActionsModalPackageEditProps
> = ({ show, closeEditModal, actionItem, selectedValue, name }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, isOpen] = useState<boolean>(false);
  const [selectedPackage, setSelectedPackage] = useState<string>(selectedValue);
  const dispatch: AppDispatch = useDispatch();
  const { getCollection } = useCollectionContext();
  const [versions, setVersions] = useState<Option[]>([]);

  const collectionPackages = useSelector(
    (state: RootState & PersistPartial) => state.package.collectionPackages
  );

  const closeModal = () => {
    isOpen(!open);
    closeEditModal();
  };

  useEffect(() => {
    isOpen(show ?? false);
  }, [show]);

  const getVersions = async () => {
    const versionList = await dispatch(packageVersions(name!));
    if (versionList.payload) {
      const mappedVersions = versionList.payload.map((item: any) => ({
        label: item.version,
        value: item.version,
      }));
      setVersions(mappedVersions);
      setSelectedPackage(mappedVersions[0].value);
    }
  };

  

  useEffect(() => {
    show && getVersions();
  }, [show]);

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
        <h3 className="modal__container__title">
          Edit Package Version - ({name})
        </h3>
        <div className="modal__container__text">Package Version</div>
        <SelectInput
          handleInputChange={(item) => {
            if (item.target.value !== "none") {
              setSelectedPackage(item.target.value);
            }
          }}
          options={versions}
          selectedValue={selectedValue}
        />

        <div className="modal__container__wrapper">
          <Button
            disabled={loading || !selectedPackage}
            type="action"
            onClick={() => {
              dispatch(
                setCurrentPackageVersion({
                  collection: getCollection()!,
                  packageVersion: selectedPackage,
                  name: name!,
                })
              );
              closeEditModal();
            }}
            className="modal__container__button"
          >
            <>
              {loading ? (
                <Loader
                 className="spinner"
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
