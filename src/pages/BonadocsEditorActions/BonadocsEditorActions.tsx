import React from "react";
import { BonadocsEditorViewHeader } from "../../layout/BonadocsEditorView/BonadocsEditorViewHeader/BonadocsEditorViewHeader";
import { BonadocsEditorViewPlaygroundWrapper } from "../../layout/BonadocsEditorView/BonadocsEditorViewPlayground/BonadocsEditorViewPlaygroundWrapper";
import { BonadocsEditorViewActionsWrapper } from "@/layout/BonadocsEditorView/BonadocsEditorViewActions/BonadocsEditorViewActionsWrapper";
import { BonadocsEditorLayout } from "../BonadocsEditorLayout";
import { BonadocsEditorSidebarItems } from "@/layout/BonadocsEditorSidebar/BonadocsEditorSidebarItems";

interface BonadocsEditorActionsProps {
  className?: string;
}
export const BonadocsEditorActions: React.FC<BonadocsEditorActionsProps> = ({
  className,
}) => {
  return (
    <div className={className}>
      <BonadocsEditorViewHeader className="bonadocs__editor__dashboard__header bona__header" />
      <BonadocsEditorViewPlaygroundWrapper className="bonadocs__editor__dashboard__playground bona__play__actions">
        <BonadocsEditorViewActionsWrapper />
        {/* <BonadocsEditorViewPlaygroundPlaceholder
          title="Actions are coming soon."
          description="This allows devs to perform dapp actions on their smart contracts using a
            Javascript environment; just like they’re on the frontend of the
            application. Also, devs can interact with the contract using a
            solidity environment."
          className="bonadocs__editor__dashboard__playground__placeholder--actions"
        /> */}
      </BonadocsEditorViewPlaygroundWrapper>
    </div>
  );
};
