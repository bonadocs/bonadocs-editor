import React, { useState, useEffect, useCallback, useRef } from "react";
import { customSideStyles } from "@/data/toast/toastConfig";
import Modal from "react-modal";
import { TextInput } from "@/components/input/TextInput";
import { TextareaInput } from "@/components/input/TextareaInput";
import { useCollectionContext } from "@/context/CollectionContext";
import { CollectionDetailsParams, ContractsState } from "@/data/dataTypes";
import {
  addPlaygroundContractValidation,
  editCollectionDetails,
  projectValidation,
  reset,
} from "@/store/project/projectSlice";
import { BonadocsEditorViewPlaygroundContractModalContractList } from "./BonadocsEditorViewPlaygroundContractModalContractList";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  BonadocsEditorViewPlaygroundContractModalAddContract,
  BonadocsEditorViewPlaygroundContractModalAddContractRef,
} from "./BonadocsEditorViewPlaygroundContractModalAddContract";
import { Button } from "@/components/button/Button";
import { updateContractList } from "@/store/project/projectSlice";
import MoonLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { auth } from "@/utils/firebase.utils";

interface BonadocsEditorViewPlaygroundContractModalProps {
  className?: string;
  show?: boolean;
  closeProjectModal: () => void;
}

export const BonadocsEditorViewPlaygroundContractModal: React.FC<
  BonadocsEditorViewPlaygroundContractModalProps
> = ({ className, show, closeProjectModal }) => {
  const { getCollection, reloadFunction } = useCollectionContext();
  const [open, isOpen] = useState<boolean>(false);
  const [addContract, setAddContract] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>(
    getCollection()?.data.name ?? ""
  );
  const [searchContracts, setSearchContracts] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>(
    getCollection()?.data.description ?? ""
  );
  const [loading, setLoading] = useState<boolean>(false);
  const tempContracts = useSelector(
    (state: RootState) => state.project.contracts
  );
  const { projectId, id } = useParams();

  useEffect(() => {
    isOpen(show ?? false);
  }, [show]);
  const dispatch = useDispatch<AppDispatch>();
  const closeModal = () => {
    setAddContract(false);
    isOpen(!open);
    dispatch(reset());
    closeProjectModal();
  };

  const updateProjectDetails = useCallback(
    _.debounce(async (projectParams: CollectionDetailsParams) => {
      await dispatch(editCollectionDetails(projectParams));
      reloadFunction();
    }, 500),
    []
  );

  const submitRef =
    useRef<BonadocsEditorViewPlaygroundContractModalAddContractRef>(null);

  const submitFunction = async () => {
    setLoading(true);
    if (submitRef.current) {
      const addContractValid: boolean | void =
        await submitRef.current.submitContract();

      if (typeof addContractValid === "boolean") {
        addContractValid && setAddContract(!addContract);
      }
      setLoading(false);
    }
  };

  const updateContract = async () => {
    for (let i = 0; i < tempContracts.length; i++) {
      const validation = await dispatch(
        addPlaygroundContractValidation(tempContracts[i])
      );
      if (
        !(
          validation.payload as { message: string; status: boolean } | undefined
        )?.status
      ) {
        toast.error((validation.payload as any)?.message);
        return;
      }
    }

    setLoading(true);
    if (auth.currentUser !== null) {
      const updated = await dispatch(
        updateContractList({
          contracts: tempContracts,
          collection: getCollection()!,
          uriId: `/projects/${id}/collections/${projectId}${auth.currentUser.email}`,
        })
      );
      if (updated) {
        setLoading(false);
        closeModal();
      }
    }

    setLoading(false);
  };

  const validation = useSelector(projectValidation);

  return (
    <Modal style={customSideStyles} contentLabel="Edit Project" isOpen={open}>
      <div className="modal__side__container">
        <div className="modal__side__close" onClick={closeModal}>
          <svg
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
        <h2 className="modal__side__container__header__title">Edit Project</h2>
        <h5 className="bonadocs__editor__projects__action__select__name">
          Project name
        </h5>
        <TextInput
          className="bonadocs__editor__projects__action__select__input"
          handleChange={(e) => {
            setProjectName(e.target.value);
            updateProjectDetails({
              collection: getCollection()!,
              projectItem: "name",
              value: e.target.value,
            });
          }}
          value={projectName}
        />
        <h5 className="bonadocs__editor__projects__action__select__name">
          Project description
        </h5>
        <TextareaInput
          className="bonadocs__editor__projects__action__select__input"
          handleChange={(e) => {
            setProjectDescription(e.target.value);
            updateProjectDetails({
              collection: getCollection()!,
              projectItem: "description",
              value: e.target.value,
            });
          }}
          value={projectDescription}
        />
        {!addContract ? (
          <h5 className="bonadocs__editor__projects__action__select__name">
            Contracts
          </h5>
        ) : (
          <h3 className="bonadocs__editor__projects__action__select__name__large">
            Add Contract
          </h3>
        )}
        {!addContract ? (
          <div className="bonadocs__editor__projects__creation__selection">
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
                  setSearchContracts(e.target.value);
                }}
                value={searchContracts}
                placeholder="Search contract names"
              />
            </div>
            <BonadocsEditorViewPlaygroundContractModalContractList
              searchValue={searchContracts}
            />
          </div>
        ) : (
          <BonadocsEditorViewPlaygroundContractModalAddContract
            ref={submitRef}
          />
        )}

        {!addContract ? (
          <>
            <div
              onClick={() => setAddContract(!addContract)}
              className="bonadocs__editor__projects__creation__add"
            >
              <svg
                className="bonadocs__editor__dashboard__playground__contract__header__addIconn bonadocs__editor__projects__creation__add__icon"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 8L12 8"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 12L8 4"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3 className="bonadocs__editor__projects__creation__add__title">
                Add contract
              </h3>
            </div>
            <Button
              onClick={updateContract}
              className="modal__side__container__search modal__side__container__search__open__cta"
              type="action"
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
                  "Update Contracts"
                )}
              </>
            </Button>
          </>
        ) : (
          <div className="bonadocs__editor__projects__creation__add">
            <Button
              className="bonadocs__editor__projects__creation__add__cancel"
              type="critical"
              onClick={() => setAddContract(!addContract)}
            >
              Cancel
            </Button>
            <Button disabled={loading} type="action" onClick={submitFunction}>
              Add Contract
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};
