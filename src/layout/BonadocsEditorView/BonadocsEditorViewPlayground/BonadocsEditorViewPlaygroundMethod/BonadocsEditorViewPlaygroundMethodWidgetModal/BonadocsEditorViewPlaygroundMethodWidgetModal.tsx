import { useCollectionContext } from "@/context/CollectionContext";
import { customSideStyles } from "@/data/toast/toastConfig";
import { AppDispatch, RootState } from "@/store";
import { getMethodWidget } from "@/store/method/methodSlice";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { WidgetConfig } from "@/data/dataTypes";

interface BonadocsEditorViewPlaygroundMethodWidgetModalProps {
  closeWidgetModal: () => void;
  show: boolean;
}

export const BonadocsEditorViewPlaygroundMethodWidgetModal: React.FC<
  BonadocsEditorViewPlaygroundMethodWidgetModalProps
> = ({ closeWidgetModal, show }) => {
  const [open, isOpen] = useState<boolean>(false);
  const [widgetConfig, setWidgetConfig] = useState<WidgetConfig>();
  const methodItem = useSelector((state: RootState) => state.method.methodItem);
  const dispatch = useDispatch<AppDispatch>();
  const { getCollection } = useCollectionContext();

  const installCommand = `yarn add @bonadocs/widget`;

  const logicCode = `import BonadocsWidget from "@bonadocs/widget"

// Here's the widget for ${methodItem.name}

<BonadocsWidget
  widgetConfigUri="${widgetConfig?.widgetConfigUri ?? ""}"
  contract="${widgetConfig?.contract ?? ""}"
  functionKey="${widgetConfig?.functionKey ?? ""}"
/>`;

  const closeModal = () => {
    isOpen(!open);
    closeWidgetModal();
  };

  useEffect(() => {
    isOpen(show ?? false);
  }, [show]);

  useEffect(() => {
    if (show) getWidgetConfig();
  }, [show]);

  const getWidgetConfig = async () => {
    const config = await dispatch(getMethodWidget(getCollection()!));

    setWidgetConfig({
      widgetConfigUri: (config.payload as WidgetConfig).widgetConfigUri,
      contract: (config.payload as WidgetConfig).contract,
      functionKey: (config.payload as WidgetConfig).functionKey,
    });
  };

  return (
    <Modal
      style={customSideStyles}
      contentLabel="Edit Project"
      isOpen={open}
      onRequestClose={closeModal}
    >
      <div className="modal__side__container">
        <div className="modal__side__close" onClick={closeModal}>
          <svg
            className="modal__side__close__img"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#B8C8FF"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="modal__side__container__header__title">
          {methodItem.name} Widget
        </h2>
        <h5 className="bonadocs__editor__projects__action__select__name">
          Install Package
        </h5>
        <SyntaxHighlighter
          language="javascript"
          style={atomOneDark}
          className="bonadocs__editor__projects__action__select__name"
        >
          {installCommand}
        </SyntaxHighlighter>
        <h5 className="bonadocs__editor__projects__action__select__name">
          Use package in your react component
        </h5>
        <SyntaxHighlighter
          language="javascript"
          style={atomOneDark}
          className="bonadocs__editor__projects__action__select__name"
        >
          {logicCode}
        </SyntaxHighlighter>
      </div>
    </Modal>
  );
};
