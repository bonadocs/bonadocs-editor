import React, { useEffect } from "react";
import { BonadocsEditorViewHeader } from "../../layout/BonadocsEditorView/BonadocsEditorViewHeader/BonadocsEditorViewHeader";
import { BonadocsEditorViewControlBar } from "../../layout/BonadocsEditorView/BonadocsEditorViewControlBar/BonadocsEditorViewControlBar";
import { BonadocsEditorViewPlayground } from "../../layout/BonadocsEditorView/BonadocsEditorViewPlayground/BonadocsEditorViewPlayground";
import { BonadocsEditorViewPlaygroundWrapper } from "../../layout/BonadocsEditorView/BonadocsEditorViewPlayground/BonadocsEditorViewPlaygroundWrapper";
import { BonadocsEditorLayout } from "../BonadocsEditorLayout";
import { useParams } from "react-router-dom";

interface BonadocsEditorContractsProps {
  className?: string;
}
export const BonadocsEditorContracts: React.FC<
  BonadocsEditorContractsProps
  > = ({ className }) => {
    const { projectId, id } = useParams();
    
    useEffect(() => {
      // Check if this is the first load by seeing if our object exists in local storage
      if (localStorage.getItem("firstLoadDone") === null) {
        // If it's the first load, set the flag in local storage to true and reload the page
        localStorage.setItem("firstLoadDone", '1');
        console.log("This is the initial load");
      } else {
        console.log("This is a page refresh");
      }
    }, []);

    
  return (
    <BonadocsEditorLayout projectId={projectId} teamId={id}>
      <div className={className}>
        <BonadocsEditorViewHeader className="bonadocs__editor__dashboard__header" />
        <BonadocsEditorViewControlBar className="bonadocs__editor__dashboard__controlbar" />
        <BonadocsEditorViewPlaygroundWrapper className="bonadocs__editor__dashboard__playground">
          <BonadocsEditorViewPlayground />
        </BonadocsEditorViewPlaygroundWrapper>
      </div>
    </BonadocsEditorLayout>
  );
};
