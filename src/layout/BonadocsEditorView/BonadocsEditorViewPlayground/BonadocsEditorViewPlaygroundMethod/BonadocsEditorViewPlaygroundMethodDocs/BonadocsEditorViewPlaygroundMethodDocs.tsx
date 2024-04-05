import React, { useState } from "react";
import { BonadocsEditorViewPlaygroundMethodDocsPreview } from "./BonadocsEditorViewPlaygroundMethodDocsPreview";
import { BonadocsEditorViewPlaygroundMethodDocsInput } from "./BonadocsEditorViewPlaygroundMethodDocsInput";


interface BonadocsEditorViewPlaygroundMethodDocsProps {
  preview: boolean;
}
export const BonadocsEditorViewPlaygroundMethodDocs: React.FC<
  BonadocsEditorViewPlaygroundMethodDocsProps
> = ({ preview }) => {
  const [markdownInput, setMarkdownInput] = useState<string>();
  
  
  return (
    <div className={`bonadocs__editor__dashboard__playground__method__view`}> 
      {!preview ? (
        <BonadocsEditorViewPlaygroundMethodDocsInput
          markdownInput={markdownInput || ""}
          setMarkdownInput={setMarkdownInput}
        />
      ) : (
        <BonadocsEditorViewPlaygroundMethodDocsPreview
          markdownInput={markdownInput || ""}
        />
      )}
    </div>
  );
};
