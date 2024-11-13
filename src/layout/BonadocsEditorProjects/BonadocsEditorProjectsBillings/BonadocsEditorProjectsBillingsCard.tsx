import React from "react";
import { ReactComponent as ContractIcon } from "@/assets/SidebarIcons/contract.svg";
import { Button } from "@/components/button/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface BonadocsEditorProjectsBillingsCardProps {
  billingItem: any;
}

const BonadocsEditorProjectsBillingsCard: React.FC<
  BonadocsEditorProjectsBillingsCardProps
> = ({ billingItem }) => {
  const currentTeam = useSelector((state: RootState) => state.team.currentTeam);

  const paidSubscription = currentTeam.activeSubscription;
  const isFreePlan = billingItem.price === "Free";

  return (
    <div className="bonadocs__editor__projects__billings__card">
      <div className="bonadocs__editor__projects__billings__card__wrapper">
        <h2>{billingItem.name}</h2>
        <h3 className="bonadocs__editor__projects__billings__card__price">
          {billingItem.price}
        </h3>
        <Button
          className="bonadocs__editor__projects__billings__card__button"
          type={
            paidSubscription
              ? isFreePlan
                ? "action"
                : "inertia"
              : isFreePlan
              ? "inertia"
              : "action"
          }
          onClick={() => {
            window.open("mailto:hello@bonadocs.com", "_blank");
          }}
        >
          {paidSubscription
            ? isFreePlan
              ? "Downgrade"
              : "Current Plan"
            : isFreePlan
            ? "Current Plan"
            : "Upgrade"}
        </Button>
      </div>

      {billingItem.features.map((feature: any, index: number) => (
        <div key={index}>
          <ContractIcon className={`${index === 1 && `ma-top-md`}`} />
          <h3 className="bonadocs__editor__projects__billings__card__feature__title">
            {feature.name}
          </h3>
          <h5 className="bonadocs__editor__projects__billings__card__feature__descr">
            {feature.description}
          </h5>
        </div>
      ))}
    </div>
  );
};

export default BonadocsEditorProjectsBillingsCard;
