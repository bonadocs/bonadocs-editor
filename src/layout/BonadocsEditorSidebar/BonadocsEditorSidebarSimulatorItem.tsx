import React from "react";
import { CheckboxInput } from "@/components/input/CheckboxInput";

interface BonadocsEditorSidebarSimulatorItemProps {
  className?: string;
}
export const BonadocsEditorSidebarSimulatorItem: React.FC<
  BonadocsEditorSidebarSimulatorItemProps
> = ({ className }) => {
  return (
    <div className={className}>
      <CheckboxInput
        handleChange={() => console.log("checked")}
        checked={false}
      />
      <div className="bonadocs__editor__sidebar__simulation__title">Simulation</div>
    </div>
  );
};
