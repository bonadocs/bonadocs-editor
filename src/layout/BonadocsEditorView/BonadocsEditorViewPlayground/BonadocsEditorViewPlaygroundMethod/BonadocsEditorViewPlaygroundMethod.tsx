import React, { useState } from "react";
import { BonadocsEditorViewPlaygroundMethodDocs } from "./BonadocsEditorViewPlaygroundMethodDocs/BonadocsEditorViewPlaygroundMethodDocs";
import { BonadocsEditorViewPlaygroundMethodHeader } from "./BonadocsEditorViewPlaygroundMethodHeader/BonadocsEditorViewPlaygroundMethodHeader";
import { BonadocsEditorViewPlaygroundMethodControlbar } from "./BonadocsEditorViewPlaygroundMethodControlbar/BonadocsEditorViewPlaygroundMethodControlbar";
import { BonadocsEditorViewPlaygroundMethodParams } from "./BonadocsEditorViewPlaygroundMethodParams/BonadocsEditorViewPlaygroundMethodParams";
interface BonadocsEditorViewPlaygroundMethodProps {
  className?: string;
}

export const BonadocsEditorViewPlaygroundMethod: React.FC<
  BonadocsEditorViewPlaygroundMethodProps
> = ({ className }) => {
  const [preview, setPreview] = useState(false);

  return (
    // Component JSX goes here
    <div className={className}>
      <BonadocsEditorViewPlaygroundMethodHeader />
      <BonadocsEditorViewPlaygroundMethodParams />
      <BonadocsEditorViewPlaygroundMethodControlbar
        preview={preview}
        setPreview={setPreview}
      />
      <BonadocsEditorViewPlaygroundMethodDocs preview={preview} />
    </div>
  );
};
