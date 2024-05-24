import { toast } from "react-toastify";
import React, { useEffect } from "react";
import { ReactComponent as Download } from "@/assets/action/download.svg";
import axios from "axios";

interface BonadocsEditorActionsModalPackageAddSearchResultItemVersionListProps {
  name: string;
}

export const BonadocsEditorActionsModalPackageAddSearchResultItemVersionList: React.FC<
  BonadocsEditorActionsModalPackageAddSearchResultItemVersionListProps
> = ({ name }) => {
  function searchFunction() {
    console.log(name);
    if (name[0] === "@") {
      console.log(name);
      const regex = /@([^\/]+)\/(.+)/;
      const matches = name.match(regex);

      if (matches) {
        const scope = matches[1];
        const packageName = matches[2];

        console.log("First String:", scope);
        console.log("Second String:", packageName);
        // axios
        //   .get(
        //     `https://data.jsdelivr.com/v1/packages/npm/@${scope}/${packageName}`
        //   )
        //   .then((res) => {
        //     console.log(res.data);
        //   })
        //   .catch((error) => toast.error(error));
      }
    } else {
      axios
        .get(`https://data.jsdelivr.com/v1/packages/npm/${name}`)
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => toast.error(error));
    }
  }

  useEffect(() => {
   // searchFunction();
  }, []);

  return (
    <>
      <div className="modal__side__container__popover__item">
        <div className="modal__side__container__popover__item__option">
          <div className="modal__side__container__popover__item__option__title">
            v.0.1
          </div>

          <Download className="modal__side__container__popover__item__option__download" />
        </div>
        <div className="modal__side__container__popover__item__option">
          <div className="modal__side__container__popover__item__option__title">
            v.0.2
          </div>

          <Download className="modal__side__container__popover__item__option__download" />
        </div>
      </div>

      <img src="/solutions.jpg" alt="" />
    </>
  );
};
