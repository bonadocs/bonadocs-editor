import React, { useRef, useEffect } from "react";
import { Tab } from "@/components/tab/Tab";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { BonadocsEditorViewPlaygroundMethodParamsNetworks } from "./BonadocsEditorViewPlaygroundMethodParamsNetworks";
import { EditorViewPlaygroundButton } from "./EditorViewPlaygroundButton";
import { BonadocsEditorViewPlaygroundMethodParamsList } from "./BonadocsEditorViewPlaygroundMethodParamsList";
import { Overlay } from "@/components/overlay/Overlay";
import { BonadocsEditorSidebarSimulatorItem } from "@/layout/BonadocsEditorSidebar/BonadocsEditorSidebarSimulatorItem";

export const BonadocsEditorViewPlaygroundMethodParams: React.FC = () => {
  const methodItem = useSelector((state: RootState) => state.method.methodItem);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [overlay, setOverlay] = React.useState<boolean>(false);
  const displayDoc = useSelector(
    (state: RootState) => state.controlBoard.playgroundState
  );
  const simulation = useSelector(
    (state: RootState) => state.controlBoard.simulation
  );

  useEffect(() => {
    console.log(simulation, "simulate");
    setOverlay(!overlay);
  }, [overlayRef.current]);

  return (
    <>
      {
        <div
          className={`bonadocs__editor__dashboard__playground__method__view ${
            displayDoc !== "interaction" &&
            "bonadocs__editor__dashboard__playground__method__view__doc"
          }`}
        >
          <Overlay overlayRef={overlayRef} />
          {methodItem.fragmentKey && (
            <div className="bonadocs__editor__dashboard__playground__method__view__params">
              <div className="bonadocs__editor__dashboard__playground__method__view__status">
                <Tab>{methodItem.name}</Tab>
                <BonadocsEditorViewPlaygroundMethodParamsNetworks />
              </div>
              <BonadocsEditorSidebarSimulatorItem className="bonadocs__editor__dashboard__playground__method__view__simulate" />

              <BonadocsEditorViewPlaygroundMethodParamsList />
              <EditorViewPlaygroundButton overlayRef={overlayRef.current!} />
            </div>
          )}
        </div>
      }
    </>
  );
};
