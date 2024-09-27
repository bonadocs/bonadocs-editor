import React, { useState } from "react";
import { BonadocsEditorViewPlaygroundMethodControlbarItem } from "../../BonadocsEditorViewPlayground/BonadocsEditorViewPlaygroundMethod/BonadocsEditorViewPlaygroundMethodControlbar/BonadocsEditorViewPlaygroundMethodControlbarItem";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { BonadocsEditorViewActionsCodeView } from "./BonadocsEditorViewActionsCodeView";
import { BonadocsEditorViewActionsCodeButton } from "./BonadocsEditorViewActionsCodeButton";
import { BonadocsEditorViewActionsCodeDocs } from "./BonadocsEditorViewActionsCodeDocs";

export const BonadocsEditorViewActionsCode: React.FC = () => {
  const currentAction = useSelector(
    (state: RootState) => state.action.currentAction
  );
  const actionList = useSelector(
    (state: RootState) => state.action.collectionActions
  );
  const cloudIcon = useSelector(
    (state: RootState) => state.controlBoard.cloudIcon
  );
  const [currentCode, setCurrentCode] = useState<boolean>(true);

  const activeActionValidity = actionList.find(
    (action) => action.id === currentAction.id
  );

  return (
    <div className="bonadocs__editor__dashboard__playground__action__code">
      {currentAction.name && activeActionValidity && (
        <>
          <div className="bonadocs__editor__dashboard__playground__method__controlbar">
            <BonadocsEditorViewPlaygroundMethodControlbarItem
              active={currentCode}
              onClick={() => setCurrentCode(true)}
            >
              {currentAction.name}
            </BonadocsEditorViewPlaygroundMethodControlbarItem>
            <BonadocsEditorViewPlaygroundMethodControlbarItem
              active={!currentCode}
              onClick={() => setCurrentCode(false)}
            >
              Documentation
            </BonadocsEditorViewPlaygroundMethodControlbarItem>
            {cloudIcon && (
              <img
                className="bonadocs__editor__dashboard__playground__method__controlbar__cloud"
                src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1715148623/cloud-off_xqq3nc.svg"
              />
            )}
          </div>

          {currentCode ? (
            <>
              <BonadocsEditorViewActionsCodeView />
              <BonadocsEditorViewActionsCodeButton />
            </>
          ) : (
            <BonadocsEditorViewActionsCodeDocs
              docs={currentAction.documentation!}
            />
          )}
        </>
      )}
    </div>
  );
};
