import React from "react";
import { CheckboxInput } from "@/components/input/CheckboxInput";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/index";
import { setSimulation } from "@/store/controlBoard/controlBoardSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/index";

interface BonadocsEditorSidebarSimulatorItemProps {
  className?: string;
}
export const BonadocsEditorSidebarSimulatorItem: React.FC<
  BonadocsEditorSidebarSimulatorItemProps
> = ({ className }) => {
  const dispatch = useDispatch<AppDispatch>();
  const simulation = useSelector((state: RootState) => state.controlBoard.simulation);
  return (
    <div className={className}>
      <CheckboxInput
        handleChange={(simulationState) =>
          dispatch(setSimulation(simulationState))
        }
        checked={simulation}
      />
      <div className="bonadocs__editor__sidebar__simulation__title">
        Simulation
      </div>
    </div>
  );
};
