import React from "react";
import BonadocsEditorProjectsBillingsCard from "./BonadocsEditorProjectsBillingsCard";
import { TeamBilling } from "@/data/team/TeamRoles";

export const BonadocsEditorProjectsBillings: React.FC = () => {
  return (
    <div>
      <h2>BILLINGS</h2>
      <div className="bonadocs__editor__projects__billings__wrapper">
        {TeamBilling
          .map((item, index) => (
            <div key={index} className="flex">
              <BonadocsEditorProjectsBillingsCard billingItem={item}/>
            </div>
          ))}
      </div>
    </div>
  );
};
