import React, { useState, useEffect } from "react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { BonadocsEditorViewPlaygroundMethodDocsPreview } from "./BonadocsEditorViewPlaygroundMethodDocsPreview";
import { BonadocsEditorViewPlaygroundMethodDocsInput } from "./BonadocsEditorViewPlaygroundMethodDocsInput";

interface BonadocsEditorViewPlaygroundMethodDocsProps {
  preview: boolean;
}
export const BonadocsEditorViewPlaygroundMethodDocs: React.FC<
  BonadocsEditorViewPlaygroundMethodDocsProps
> = ({ preview }) => {
  const method = useSelector((state: RootState) => state.method.methodItem);
  const [markdownInput, setMarkdownInput] = useState<string>(method.docs || "");

  useEffect(() => {
    setMarkdownInput(method.docs || "");
  }, [method.fragmentKey]);

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
