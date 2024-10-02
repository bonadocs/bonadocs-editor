import { Tab } from "@/components/tab/Tab";
import React, { useState } from "react";
import { ReactComponent as Github } from "@/assets/action/github.svg";
import { BonadocsEditorActionsModalPackageAddSearchResultItemVersion } from "./BonadocsEditorActionsModalPackageAddSearchResultItemVersion";
import { Button } from "@/components/button/Button";
import BonadocsEditorActionsModalPackageAddVersionModal from "./BonadocsEditorActionsModalPackageAddVersionModal";
interface BonadocsEditorActionsModalPackageAddSearchResultItemProps {
  name: string;
  description: string;
  github: string;
  popular: boolean;
}

export const BonadocsEditorActionsModalPackageAddSearchResultItem: React.FC<
  BonadocsEditorActionsModalPackageAddSearchResultItemProps
> = ({ name, description, github, popular }) => {
  const [show, isShow] = useState<boolean>(false);

  return (
    <div className="modal__side__container__result__item">
      <div className="modal__side__container__result__item__title">
        <h3 className="modal__side__container__result__item__title__name">
          {name}
        </h3>
        <div className="modal__side__container__result__item__title__info">
          <Github onClick={() => window.open(github, "_blank")} />
          {/* <BonadocsEditorActionsModalPackageAddSearchResultItemVersion
            name={name}
          /> */}
        </div>
      </div>
      <div className="modal__side__container__result__item__tag">
        {popular && (
          <Tab
            className="bonadocs__editor__dashboard__playground__package__list__children__item__tab ma-0"
            type="package"
            color="blue"
            children="Popular"
          />
        )}
      </div>
      <h4 className="modal__side__container__result__item__description">
        {description}
      </h4>
      <Button
        className="modal__side__container__result__item__button"
        type="action"
        onClick={() => isShow(!show)}
      >
        Add Package
      </Button>
      <BonadocsEditorActionsModalPackageAddVersionModal
        show={show}
        name={name}
        closeVersionModal={() => isShow(!show)}
      />
    </div>
  );
};
