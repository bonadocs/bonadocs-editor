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
import { BonadocsEditorViewPublishModal } from "./BonadocsEditorViewPublishModal";
import { setMethodDisplayData, setMethodItem } from "@/store/method/methodSlice";
import { ContractItem, MethodItem } from "@/data/dataTypes";
import { setActiveContract } from "@/store/contract/contractSlice";
import { BonadocsEditorViewHeaderProfile } from "./BonadocsEditorViewHeaderProfile";

interface BonadocsEditorViewHeaderProps {
  className?: string;
  warningHeader?: boolean;
}
export const BonadocsEditorViewHeader: React.FC<
  BonadocsEditorViewHeaderProps
> = ({ className, warningHeader }) => {
  const { getCollection, connectWallet, walletId } = useCollectionContext();
  const [loader, setLoader] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);
  const { user, signOut } = useAuthContext();
  const collectionName = getCollection()?.data.name!;
  let [referenceElement, setReferenceElement] = useState<any>();
  const [openPublishModal, setOpenPublishModal] = useState<boolean>(false);
  const [uri, setUri] = useState<string>("");

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
  const warningHeaderText = `There has been some change on the playground and you might need to reload to view latest changes.`;

  return (
    <>
      {open && (
        <div className={className}>
          <h2 className="bonadocs__editor__dashboard__header__title">
            {!warningHeader ? collectionName : warningHeaderText}
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
            {!warningHeader ? (
              <>
                <Button
                  disabled={loader}
                  className="bonadocs__editor__dashboard__header__share bonadocs__editor__dashboard__header__share__publish"
                  type="inertia"
                  onClick={async () => {
                    setLoader(true);
                    try {
                      const uri = await getCollection()?.publishToIPFS();
                      console.log(uri);

                      setUri(uri!);
                      setLoader(false);

                      toast.success("Project published to IPFS");
                      setOpenPublishModal(!openPublishModal);
                    } catch (err) {
                      setLoader(false);
                    }
                  }}
                >
                  {loader ? "Publishing..." : "Publish to IPFS"}
                </Button>
                <Button
                  disabled={loader}
                  className="bonadocs__editor__dashboard__header__share"
                  onClick={async () => {
                    setLoader(true);
                    try {
                      await dispatch(
                        saveProject({
                          collection: getCollection()!,
                          projectId: projectId!,
                        })
                      );
                      setLoader(false);
                      toast.success("Project saved");
                    } catch (err) {
                      setLoader(false);
                    }
                  }}
                  type="action"
                >
                  {loader ? "Saving..." : "Save Project"}
                </Button>
                {!connected ? (
                  <div className="bonadocs__editor__dashboard__header__connect">
                    <Button onClick={() => connectWallet()}>
                      Connect wallet
                    </Button>
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
                          connected
                            ? "connected__green__circle"
                            : "bonadocs__circle"
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
                <BonadocsEditorViewHeaderProfile/>
              </>
            ) : (
              <>
                <Button
                  disabled={loader}
                  className="bonadocs__editor__dashboard__header__share bonadocs__editor__dashboard__header__share__publish"
                  type="inertia"
                  onClick={() => {
                    setOpen(!open);
                    dispatch({ type: "controlBoard/setWarningBar", payload: !open });
                    dispatch(setMethodItem({} as MethodItem));
                    dispatch(setMethodDisplayData([]));
                    dispatch(setActiveContract({} as ContractItem));
                  }}
                >
                  Close
                </Button>
                <Button
                  disabled={loader}
                  className="bonadocs__editor__dashboard__header__share"
                    onClick={() => {
                    dispatch({
                      type: "controlBoard/setWarningBar",
                      payload: !open,
                    });
                    window.location.reload();
                  }}
                  type="action"
                >
                  Reload
                </Button>
              </>
            )}
          </div>

          <BonadocsEditorViewPublishModal
            show={openPublishModal}
            uri={uri}
            closePublishModal={() => setOpenPublishModal(!openPublishModal)}
          />
        </div>
      )}
    </>
  );
};
