import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Modal from "react-modal";
import { customSideStyles } from "@/data/toast/toastConfig";
import { TextInput } from "@/components/input/TextInput";
import { BonadocsEditorProjectsCreationActionContractNetworkList } from "../BonadocsEditorProjectsCreationActionContractNetwork/BonadocsEditorProjectsCreationActionContractNetworkList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { ContractInstance } from "@/data/dataTypes";
import {
  setCurrentContract,
  updateContract,
  updateContractInstances,
} from "@/store/project/projectSlice";
import { BonadocsEditorProjectsCreationActionContractInstanceDeleteModal } from "./BonadocsEditorProjectsCreationActionContractInstanceDeleteModal";
import { BonadocsEditorProjectsCreationActionContractInstanceSelected } from "../BonadocsEditorProjectsCreationActionContractNetwork/BonadocsEditorProjectsCreationActionContractInstanceSelected";
import { Button } from "@/components/button/Button";
import { TextareaInput } from "@/components/input/TextareaInput";
import { set } from "lodash";

interface BonadocsEditorProjectsCreationActionContractInstanceModalProps {
  className?: string;
  show?: boolean;
  closeInstanceModal: () => void;
}

export const BonadocsEditorProjectsCreationActionContractInstanceModal: React.FC<
  BonadocsEditorProjectsCreationActionContractInstanceModalProps
> = ({ className, show, closeInstanceModal }) => {
  const [open, isOpen] = useState<boolean>(false);
  const [openABI, setOpenABI] = useState<boolean>(false);
  const [openNetworkList, setOpenNetworkList] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const currentContract = useSelector(
    (state: RootState) => state.project.currentContract
  );

  const [selectedInstance, setSelectedInstance] =
    useState<ContractInstance | null>(null);
  const [contractAbi, setContractAbi] = useState<string>(currentContract.abi!);
  useEffect(() => {
    isOpen(show ?? false);
  }, [show]);

  const closeModal = () => {
    isOpen(!open);
    closeInstanceModal();
    setOpenNetworkList(false);
  };

  const dispatch = useDispatch<AppDispatch>();
  const [contractInstances, setContractInstances] = useState<
    ContractInstance[]
  >(currentContract.contractInstances!);

  const deleteInstance = () => {
    let instances = contractInstances.slice();
    instances?.splice(instances.indexOf(selectedInstance!), 1);
    dispatch(
      setCurrentContract({
        ...currentContract,
        contractInstances: instances,
      })
    );

    dispatch(updateContractInstances(instances!));
  };

  const updateContractAbi = (abi: string) => {
    setContractAbi(abi);
    const updatedContract = {
      ...currentContract,
      abi,
    };
    dispatch(setCurrentContract(updatedContract));

    dispatch(updateContract(updatedContract));
  };

  useEffect(() => {
    if (currentContract) {
      setContractInstances(currentContract.contractInstances!);
      setContractAbi(currentContract.abi!);
    }
  }, [currentContract]);

  return (
    <Modal
      // className='dsds'
      style={customSideStyles}
      contentLabel="Contract Modal"
      isOpen={open}
      onRequestClose={closeModal}
    >
      <div
        className="modal__side__container"
        onClick={() => setOpenNetworkList(false)}
      >
        <h2 className="modal__side__container__header__title">
          Add Contract Address( {currentContract.name} )
        </h2>
        <h4 className="modal__side__container__header__description">
          Make sure to add the contract address on different networks
        </h4>

        <h5 className="bonadocs__editor__projects__action__select__name">
          Add networks
        </h5>

        <div
          className={clsx(
            openNetworkList &&
              `modal__side__container__search modal__side__container__search__open`
          )}
        >
          {!openNetworkList ? (
            <div className="bonadocs__editor__projects__action__select ">
              <div
                onClick={(event) => {
                  event.stopPropagation();
                  setOpenNetworkList(!openNetworkList);
                }}
                className="bonadocs__editor__projects__action__select__inner"
              >
                <div className="bonadocs__editor__projects__action__select__inner__network">
                  {contractInstances && contractInstances?.length < 1 && (
                    <h4 className="bonadocs__editor__projects__action__select__inner__network__placeholder">
                      Click "+" icon to add network
                    </h4>
                  )}
                  {contractInstances?.map((instance, index) => (
                    <div
                      key={index}
                      className="bonadocs__editor__projects__action__select__inner__network__element"
                    >
                      <img
                        className="bonadocs__editor__projects__action__select__inner__network__element__image"
                        src={instance.logo}
                        alt="network logo"
                      />
                      <div className="bonadocs__editor__projects__action__select__inner__network__element__name">
                        {instance.name}
                      </div>
                      <img
                        className="bonadocs__editor__projects__action__select__inner__network__element__delete"
                        src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1701455363/close_isqdse.svg"
                        alt="network logo"
                        onClick={(event) => {
                          event.stopPropagation();
                          let instances = contractInstances.slice();
                          setSelectedInstance(instances[index]);
                          setOpenDeleteModal(true);
                        }}
                      />
                    </div>
                  ))}
                </div>

                <svg
                  onClick={() => setOpenNetworkList(!openNetworkList)}
                  className="bonadocs__editor__dashboard__playground__contract__header__addIcon"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 8L12 8"
                    stroke="#95A8C0"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 12L8 4"
                    stroke="#95A8C0"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          ) : (
            <>
              <div className="modal__side__container__search__bar">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5 21.75C5.85 21.75 1.25 17.15 1.25 11.5C1.25 5.85 5.85 1.25 11.5 1.25C17.15 1.25 21.75 5.85 21.75 11.5C21.75 17.15 17.15 21.75 11.5 21.75ZM11.5 2.75C6.67 2.75 2.75 6.68 2.75 11.5C2.75 16.32 6.67 20.25 11.5 20.25C16.33 20.25 20.25 16.32 20.25 11.5C20.25 6.68 16.33 2.75 11.5 2.75Z"
                    fill="#95A8C0"
                  />
                  <path
                    d="M21.9999 22.7499C21.8099 22.7499 21.6199 22.6799 21.4699 22.5299L19.4699 20.5299C19.1799 20.2399 19.1799 19.7599 19.4699 19.4699C19.7599 19.1799 20.2399 19.1799 20.5299 19.4699L22.5299 21.4699C22.8199 21.7599 22.8199 22.2399 22.5299 22.5299C22.3799 22.6799 22.1899 22.7499 21.9999 22.7499Z"
                    fill="#95A8C0"
                  />
                </svg>
                <TextInput
                  className="modal__side__container__input"
                  handleChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  placeholder="Search for networks"
                  value={search}
                />
                <svg
                  onClick={() => {
                    setSearch("");
                  }}
                  className="modal__side__close__img"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#B8C8FF"
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

              <BonadocsEditorProjectsCreationActionContractNetworkList
                searchValue={search.trim()}
                onClick={(event) => event.stopPropagation()}
              />
              <Button
                className="modal__side__container__search__button"
                onClick={() => setOpenNetworkList(!openNetworkList)}
                type="action"
              >
                Done
              </Button>
            </>
          )}
        </div>

        <BonadocsEditorProjectsCreationActionContractInstanceDeleteModal
          handleDeleteContractInstance={deleteInstance}
          networkName={selectedInstance?.name}
          show={openDeleteModal}
          closeInstanceDeleteModal={() => setOpenDeleteModal(!openDeleteModal)}
        />
        {!openNetworkList && contractInstances?.length > 0 && (
          <>
            <h5 className="bonadocs__editor__projects__action__select__name">
              Add network addresses
            </h5>
            <BonadocsEditorProjectsCreationActionContractInstanceSelected />
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
              <TextareaInput
                placeholder="Paste contract ABI"
                value={contractAbi}
                handleChange={(e) => updateContractAbi(e.target.value)}
              />
            )}
          </>
        )}
        <Button
          onClick={() => closeInstanceModal()}
          className="modal__side__container__search modal__side__container__search__open__cta"
          type="action"
          disabled={openNetworkList}
        >
          Continue
        </Button>
      </div>
    </Modal>
  );
};
