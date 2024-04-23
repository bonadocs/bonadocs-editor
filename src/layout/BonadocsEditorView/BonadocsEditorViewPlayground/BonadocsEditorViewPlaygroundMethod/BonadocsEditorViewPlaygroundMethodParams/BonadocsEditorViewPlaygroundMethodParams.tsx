import React, { useRef, useEffect } from "react";
import { Tab } from "@/components/tab/Tab";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { BonadocsEditorViewPlaygroundMethodParamsNetworks } from "./BonadocsEditorViewPlaygroundMethodParamsNetworks";
import { EditorViewPlaygroundButton } from "./EditorViewPlaygroundButton";
import { BonadocsEditorViewPlaygroundMethodParamsList } from "./BonadocsEditorViewPlaygroundMethodParamsList";
import { BonadocsEditorViewPlaygroundMethodStatus } from "./BonadocsEditorViewPlaygroundMethodStatus";
import { supportedChains } from "@bonadocs/core";
import { useCollectionContext } from "@/context/CollectionContext";
import { Overlay } from "@/components/overlay/Overlay";
import { Link, useLocation } from "react-router-dom";

export const BonadocsEditorViewPlaygroundMethodParams: React.FC = () => {
  const { walletId } = useCollectionContext();
  const methodItem = useSelector((state: RootState) => state.method.methodItem);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [overlay, setOverlay] = React.useState<boolean>(false); 
  const { pathname } = useLocation();
  const displayDoc = useSelector(
    (state: RootState) => state.controlBoard.playgroundState
  );
  const simulation = useSelector(
    (state: RootState) => state.controlBoard.simulation
  );
  const readMethod = useSelector(
    (state: RootState) => state.method.methodItem.readMethod
  );
  const connected = useSelector(
    (state: RootState) => state.controlBoard.connected
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

  useEffect(() => {
    console.log(simulation, 'simulate');
    setOverlay(!overlay)
  }, [overlayRef.current]);

  return (
    <>
      { (
        <div
          className={`bonadocs__editor__dashboard__playground__method__view ${
            displayDoc !== "interaction" &&
            "bonadocs__editor__dashboard__playground__method__view__doc"
          }`}
        >
          
          <Overlay overlayRef={overlayRef} />
          {methodItem.fragmentKey && (
            <div className="bonadocs__editor__dashboard__playground__method__view__params">
              <Tab>{methodItem.name}</Tab>
              <div className="bonadocs__editor__dashboard__playground__method__view__status">
                {readMethod && !simulation ? (
                  <></>
                ) : (
                  <BonadocsEditorViewPlaygroundMethodStatus
                    className={`${
                      connected && !simulation && "connected__green"
                    }`}
                  >
                    {!simulation ? (
                      <span
                        className={`bonadocs__circle ${
                          connected && "connected__green__circle"
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

                <BonadocsEditorViewPlaygroundMethodParamsNetworks />
              </div>

              <BonadocsEditorViewPlaygroundMethodParamsList />
              <EditorViewPlaygroundButton overlayRef={overlayRef.current!} />
            </div>
          )}
        </div>
      )}
    </>
  );
};
