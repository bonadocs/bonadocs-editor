import React from "react";
interface BonadocsEditorViewPlaygroundProps {
  className?: string;
  children?: React.ReactNode | string;
}
export const BonadocsEditorViewPlaygroundWrapper: React.FC<
  BonadocsEditorViewPlaygroundProps
> = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};
