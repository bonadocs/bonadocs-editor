import React from "react";
import { Button } from "@/components/button/Button";

interface BonadocsEditorViewHeaderProps {
  className?: string;
}
export const BonadocsEditorViewHeader: React.FC<
  BonadocsEditorViewHeaderProps
> = ({ className }) => {
  return (
    <div className={className}>
      <h2 className="bonadocs__editor__dashboard__header__title">NFT Nexus</h2>
      <Button
        className="bonadocs__editor__dashboard__header__share"
        onClick={() => console.log("klk")}
        type="action"
      >
        Share
      </Button>
    </div>
  );
};
