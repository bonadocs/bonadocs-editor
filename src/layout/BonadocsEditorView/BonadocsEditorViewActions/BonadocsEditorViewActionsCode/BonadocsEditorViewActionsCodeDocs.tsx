import React from "react";

interface BonadocsEditorViewActionsCodeDocsProps {
  docs: string;
  className?: string;
}
export const BonadocsEditorViewActionsCodeDocs: React.FC<
  BonadocsEditorViewActionsCodeDocsProps
> = ({ docs, className }) => {
  const [currentDocs, setCurrentDocs] = React.useState<string>(docs);
  return (
    <textarea
      onChange={(e) => setCurrentDocs(e.target.value)}
      className={`bonadocs__editor__dashboard__playground__action__code__docs ${className}`}
    >
      {currentDocs}
    </textarea>
  );
};
