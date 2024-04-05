import React from "react";
import { BonadocsEditorViewPlaygroundMethodControlbarItem } from "./BonadocsEditorViewPlaygroundMethodControlbarItem";

interface BonadocsEditorViewPlaygroundMethodControlbarProps {
  preview: boolean;
  setPreview: (preview: boolean) => void;
}
export const BonadocsEditorViewPlaygroundMethodControlbar: React.FC<
  BonadocsEditorViewPlaygroundMethodControlbarProps
> = ({ preview, setPreview }) => {
  return (
    <div className="bonadocs__editor__dashboard__playground__method__controlbar">
      <BonadocsEditorViewPlaygroundMethodControlbarItem
        active={!preview}
        onClick={() => {
          setPreview(false);
        }}
      >
        Markdown
      </BonadocsEditorViewPlaygroundMethodControlbarItem> 
      <BonadocsEditorViewPlaygroundMethodControlbarItem
        active={preview}
        onClick={() => {
          setPreview(true);
        }}
      >
        Preview
      </BonadocsEditorViewPlaygroundMethodControlbarItem>
    </div>
  );
};
