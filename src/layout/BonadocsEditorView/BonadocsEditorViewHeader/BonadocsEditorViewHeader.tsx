import React, { useEffect, useState } from "react";
import { Button } from "@/components/button/Button";
import { useCollectionContext } from "@/context/CollectionContext";
import { useAuthContext } from "@/context/AuthContext";
import { Popover } from "@headlessui/react";
import { usePopper } from "react-popper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { supportedChains } from "@bonadocs/core";
import { BonadocsEditorViewPlaygroundMethodStatus } from "@/layout/BonadocsEditorView/BonadocsEditorViewPlayground/BonadocsEditorViewPlaygroundMethod/BonadocsEditorViewPlaygroundMethodParams/BonadocsEditorViewPlaygroundMethodStatus";
import { useParams } from "react-router-dom";
import { saveProject } from "@/store/project/projectSlice";
import { toast } from "react-toastify";

interface BonadocsEditorViewHeaderProps {
  className?: string;
}
export const BonadocsEditorViewHeader: React.FC<
  BonadocsEditorViewHeaderProps
> = ({ className }) => {
  const { getCollection, connectWallet, walletId } = useCollectionContext();
  const [loader, setLoader] = useState<boolean>(false);
  const { user, signOut } = useAuthContext();
  const collectionName = getCollection()?.data.name!;
  let [referenceElement, setReferenceElement] = useState<any>();

  let [popperElement, setPopperElement] = useState<any>();
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-end",
    strategy: "absolute",
  });
  const connected = useSelector(
    (state: RootState) => state.controlBoard.connected
  );
  const simulation = useSelector(
    (state: RootState) => state.controlBoard.simulation
  );

  const chainId = useSelector((state: RootState) => state.controlBoard.chainId);

  function connectionStatus() {
    const chain = Array.from(supportedChains).find(
      (chain) => chain[1].chainId === walletId
    );
    return connected
      ? `Connected to ${chain ? chain[1].name : chainId}`
      : `Not Connected`;
  }

  const { projectId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className={className}>
      <h2 className="bonadocs__editor__dashboard__header__title">
        {collectionName}
      </h2>
      <div className="bonadocs__editor__dashboard__header__share">
        {/* <Button
          type="action"
          onClick={async () => {
            console.log(JSON.stringify(await getCollection()?.data));
          }}
        >Log data</Button>
        <Button
          className="bonadocs__editor__dashboard__header__share"
          onClick={async () => {
            console.log("start");

            console.log(await getCollection()?.publishToIPFS());
          }}
          type="action"
        >
          <>
            <img
              width={20}
              height={20}
              src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1715229840/Quick_Actions_2_zvr78g.svg"
            />
            Share
          </>
        </Button> */}
        <Button
          className="bonadocs__editor__dashboard__header__share"
          onClick={async () => {
            setLoader(true);

            await dispatch(
              saveProject({
                collection: getCollection()!,
                projectId: projectId!,
              })
            );
            setLoader(false);
            toast.success("Project saved");
          }}
          type="action"
        >
          {loader ? "Saving..." : "Save Project"}
        </Button>
        {!connected ? (
          <div className="bonadocs__editor__dashboard__header__connect">
            <Button onClick={() => connectWallet()}>Connect wallet</Button>
          </div>
        ) : (
          <BonadocsEditorViewPlaygroundMethodStatus
            className={`${
              connected && !simulation && "connected__green"
            } bonadocs__editor__dashboard__header__status`}
          >
            {!simulation ? (
              <span
                className={` ${
                  connected ? "connected__green__circle" : "bonadocs__circle"
                }`}
              ></span>
            ) : (
              <span className="bonadocs__circle__simulation"></span>
            )}

            {!simulation ? (
              <span>{connectionStatus()}</span>
            ) : (
              <span>Simulation</span>
            )}
          </BonadocsEditorViewPlaygroundMethodStatus>
        )}
        {user && (
          <>
            <Popover className="relative ma-auto">
              <Popover.Button
                className="bonadocs__editor__dashboard__header__profile"
                ref={setReferenceElement}
              >
                <>
                  <img
                    className="bonadocs__editor__dashboard__header__profile__image"
                    src={user.photoURL}
                    alt="display picture"
                  />
                  {user.displayName}
                  <svg
                    className={`bonadocs__accordion__parent__icon ${
                      true && "bona__transition"
                    }`}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.31344 3.64645C6.5087 3.45118 6.82528 3.45118 7.02055 3.64645L11.0205 7.64645C11.1143 7.74021 11.167 7.86739 11.167 8C11.167 8.13261 11.1143 8.25979 11.0205 8.35355L7.02055 12.3536C6.82528 12.5488 6.5087 12.5488 6.31344 12.3536C6.11818 12.1583 6.11818 11.8417 6.31344 11.6464L9.95989 8L6.31344 4.35355C6.11818 4.15829 6.11818 3.84171 6.31344 3.64645Z"
                      fill="currentColor"
                    />
                  </svg>
                </>
              </Popover.Button>
              <Popover.Panel
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
                className="bonadocs__editor__dashboard__header__view"
              >
                <div className="bonadocs__editor__dashboard__header__view__wrapper">
                  <h3 onClick={() => signOut()}>Sign out</h3>
                </div>
              </Popover.Panel>
            </Popover>
          </>
        )}
      </div>
    </div>
  );
};
