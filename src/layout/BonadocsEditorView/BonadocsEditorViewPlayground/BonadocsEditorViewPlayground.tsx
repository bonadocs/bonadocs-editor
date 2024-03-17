import React from "react";
import { BonadocsEditorViewPlaygroundContract } from "./BonadocsEditorViewPlaygroundContract/BonadocsEditorViewPlaygroundContract";
import { BonadocsEditorViewPlaygroundMethod } from "./BonadocsEditorViewPlaygroundMethod/BonadocsEditorViewPlaygroundMethod";
import { BonadocsEditorViewPlaygroundResult } from "./BonadocsEditorViewPlaygroundResult/BonadocsEditorViewPlaygroundResult";
interface BonadocsEditorViewPlaygroundProps {
  className?: string;
}
export const BonadocsEditorViewPlayground: React.FC<
  BonadocsEditorViewPlaygroundProps
  > = ({ className }) => {
  
  return (
    <>
      <BonadocsEditorViewPlaygroundContract className="bonadocs__editor__dashboard__playground__contract" />
      <BonadocsEditorViewPlaygroundMethod className="bonadocs__editor__dashboard__playground__method" />
      <BonadocsEditorViewPlaygroundResult className="bonadocs__editor__dashboard__playground__result" />
    </>
  );
};
