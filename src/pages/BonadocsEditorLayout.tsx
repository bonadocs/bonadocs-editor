import { BonadocsEditorSidebar } from "@/layout/BonadocsEditorSidebar/BonadocsEditorSidebar";
import React from "react";
import { MetaTags } from "@/components/metatags/Metatags";
import { useCollectionContext } from "@/context/CollectionContext";
interface BonadocsEditorLayoutProps {
  children?: React.ReactNode;
}

export const BonadocsEditorLayout: React.FC<BonadocsEditorLayoutProps> = ({
  children,
}) => {
  const { getCollection } = useCollectionContext();
  const collectionName = getCollection()?.data.name ?? "";
  return (
    <>
      <MetaTags
        title={`${collectionName} Playground`}
        description={`The playground provides a simple and practical way to enable devs to integrate ${collectionName} in their production apps and protocols.`}
      />
      <BonadocsEditorSidebar className="bonadocs__editor__sidebar" />
      {children}
    </>
  );
};
