import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import { ReactComponent as Dropdown } from "@/assets/action/dropdown-arrow.svg";
import { ReactComponent as Download } from "@/assets/action/download.svg";
import { usePopper } from "react-popper";
import { Popover } from "@headlessui/react";
import axios from "axios";
import { BonadocsEditorActionsModalPackageAddSearchResultItemVersionList } from "./BonadocsEditorActionsModalPackageAddSearchResultItemVersionList";
import { SelectInput } from "@/components/input/SelectInput";

interface BonadocsEditorActionsModalPackageAddSearchResultItemVersionProps {
  name: string;
}

type VersionItem = {
  version: string;
}

export const BonadocsEditorActionsModalPackageAddSearchResultItemVersion: React.FC<
  BonadocsEditorActionsModalPackageAddSearchResultItemVersionProps
> = ({ name }) => {
  let [referenceElement, setReferenceElement] = useState<any>();
  let [popperElement, setPopperElement] = useState<any>();
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-end",
    strategy: "absolute",
  });
  let [versions, setVersions] = useState<any[]>([]);

  useEffect(() => {}, []);

  function searchFunction() {
    console.log(name);
    console.log(name[0]);
    
    if (name[0] === "@") {
      console.log(name);
      const regex = /@([^\/]+)\/(.+)/;
      const matches = name.match(regex);

      if (matches) {
        const scope = matches[1];
        const packageName = matches[2];

        console.log("First String:", scope);
        console.log("Second String:", packageName);
        axios
          .get(
            `https://data.jsdelivr.com/v1/packages/npm/@${scope}/${packageName}`
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => toast.error(error));
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

  return (
    <>
      <Popover className="relative ma-auto">
        <Popover.Button className="flex" ref={setReferenceElement}>
          <h4>Select version</h4>
          <Dropdown />
        </Popover.Button>
        <Popover.Panel
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          className="modal__side__container__popover"
        >
          {({ close }) => (
            <BonadocsEditorActionsModalPackageAddSearchResultItemVersionList
              name={name}
            />
          )}
        </Popover.Panel>
      </Popover>
      <h4 onClick={() => searchFunction()}>Load versions</h4>
    </>
  );
};

// https://cdn.jsdelivr.net/npm/ethers@6.12.1/dist/ethers.min.js