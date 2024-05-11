import React from "react";
import { BonadocsEditorViewHeader } from "../../layout/BonadocsEditorView/BonadocsEditorViewHeader/BonadocsEditorViewHeader";
import { BonadocsEditorViewPlaygroundWrapper } from "../../layout/BonadocsEditorView/BonadocsEditorViewPlayground/BonadocsEditorViewPlaygroundWrapper";
import { BonadocsEditorViewVariables } from "../../layout/BonadocsEditorView/BonadocsEditorViewVariables/BonadocsEditorViewVariables";
import { BonadocsEditorSidebar } from "@/layout/BonadocsEditorSidebar/BonadocsEditorSidebar";
import { BonadocsEditorLayout } from "../BonadocsEditorLayout";
interface BonadocsEditorVariablesProps {
  className?: string;
}
export const BonadocsEditorVariables: React.FC<
  BonadocsEditorVariablesProps
> = ({ className }) => {
  return (
    <BonadocsEditorLayout>
      <div className={className}>
        <BonadocsEditorViewHeader className="bonadocs__editor__dashboard__header" />
        <BonadocsEditorViewPlaygroundWrapper className="bonadocs__editor__dashboard__playground bona__btl">
          <BonadocsEditorViewVariables />
        </BonadocsEditorViewPlaygroundWrapper>
      </div>
    </BonadocsEditorLayout>
  );
};
