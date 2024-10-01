import { Button } from "@/components/button/Button";
import { SelectInput } from "@/components/input/SelectInput";
import React, { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import Modal from "react-modal";
import { customStyles } from "@/data/toast/toastConfig";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { AppDispatch } from "@/store";
import {
  addCustomPackage,
  packageVersions,
} from "@/store/package/packageSlice";
import { get } from "node:http";
import { Option } from "@/data/dataTypes";
import { useCollectionContext } from "@/context/CollectionContext";

interface BonadocsEditorActionsModalPackageAddVersionModalProps {
  show?: boolean;
  closeVersionModal: () => void;
  name: string;
}

const BonadocsEditorActionsModalPackageAddVersionModal: React.FC<
  BonadocsEditorActionsModalPackageAddVersionModalProps
> = ({ show, closeVersionModal, name }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, isOpen] = useState<boolean>(false);
  const [versions, setVersions] = useState<Option[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const { getCollection } = useCollectionContext();

  useEffect(() => {
    isOpen(show ?? false);
  }, [show]);

  useEffect(() => {
    show && getVersions();
  }, [show]);

  const getVersions = async () => {
    const versionList = await dispatch(packageVersions(name));
    if (versionList.payload) {
      const mappedVersions = versionList.payload.map((item: any) => ({
        label: item.version,
        value: item.version,
      }));
      setVersions(mappedVersions);
      setSelectedPackage(mappedVersions[0].value);
    }
  };

  const closeModal = () => {
    isOpen(!open);
    closeVersionModal();
  };

  const collectionPackages = useSelector(
    (state: RootState) => state.package.collectionPackages
  );

  const installedPackage = collectionPackages.find(
    (item) => item.name === name
  );

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
      {installedPackage ? (
        <div className="modal__container">
          <h3 className="modal__container__title">
            Existing Package
            <div className="modal__container__text">
              {name} already installed.
            </div>
          </h3>
        </div>
      ) : (
        <div className="modal__container">
          <h3 className="modal__container__title">
            Add Package Version - ({name})
          </h3>
          <div className="modal__container__text">Package Version</div>
          <SelectInput
            handleInputChange={(item) => {
              if (item.target.value !== "none") {
                setSelectedPackage(item.target.value);
              }
            }}
            options={versions}
            // selectedValue={selectedValue}
          />

          <div className="modal__container__wrapper">
            <Button
              disabled={loading || !selectedPackage}
              type="action"
              onClick={async () => {
                await dispatch(
                  addCustomPackage({
                    name,
                    currentVersion: selectedPackage,
                    collection: getCollection()!,
                  })
                );

                closeVersionModal();
              }}
              className="modal__container__button"
            >
              <>
                {loading ? (
                  <MoonLoader
                    color="#fff"
                    loading={true}
                    size={10}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  "Download"
                )}
              </>
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default BonadocsEditorActionsModalPackageAddVersionModal;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
