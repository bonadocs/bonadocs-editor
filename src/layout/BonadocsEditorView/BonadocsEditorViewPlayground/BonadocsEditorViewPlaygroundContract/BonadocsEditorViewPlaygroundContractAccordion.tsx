import React from "react";
import { Accordion } from "@/components/accordion/Accordion";
interface BonadocsEditorViewPlaygroundContractAccordionProps {
  className?: string;
}

export const BonadocsEditorViewPlaygroundContractAccordion: React.FC<
  BonadocsEditorViewPlaygroundContractAccordionProps
> = ({ className }) => {
  // Component logic goes here

  return (
    // Component JSX goes here
    <div className={className}>
      <Accordion />
      <Accordion />
      <Accordion />
      <Accordion />
      <Accordion />
      <Accordion />
      <Accordion />
      <Accordion />
    </div>
  );
};
