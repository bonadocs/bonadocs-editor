import React, { useEffect, useRef } from "react";

interface BonadocsEditorViewPlaygroundMethodDocsInputProps {
  markdownInput: string;
  setMarkdownInput: (markdownInput: string) => void;
}
export const BonadocsEditorViewPlaygroundMethodDocsInput: React.FC<
  BonadocsEditorViewPlaygroundMethodDocsInputProps
> = ({ markdownInput, setMarkdownInput }) => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    textRef.current?.focus();
  }, []);
  return (
    <textarea
      ref={textRef}
      value={markdownInput}
      onChange={(e) => setMarkdownInput(e.target.value)}
      className="bonadocs__editor__dashboard__playground__method__view__markdown"
    />
  );
};
