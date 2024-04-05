import React from "react";
import { Button } from "@/components/button/Button";
import { useCollectionContext } from "@/context/CollectionContext";

interface BonadocsEditorViewHeaderProps {
  className?: string;
}
export const BonadocsEditorViewHeader: React.FC<
  BonadocsEditorViewHeaderProps
    > = ({ className }) => {
    const { getCollection } = useCollectionContext();
    const collectionName = getCollection()?.data.name ?? ""; 
    return (
      <div className={className}>
        <h2 className="bonadocs__editor__dashboard__header__title">
          {collectionName}
        </h2>
        <Button
          className="bonadocs__editor__dashboard__header__share"
          onClick={() => {}}
          type="action"
        >
          Share
        </Button>
      </div>
    );
  };
