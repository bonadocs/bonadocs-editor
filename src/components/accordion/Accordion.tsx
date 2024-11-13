import React, { useState, useEffect, useRef } from "react";
import { MethodItem } from "@/data/dataTypes";
import { Tooltip } from "react-tooltip";
import AccordionChildItem from "./AccordionChildItem";
interface AccordionProps {
  title: string;
  options: MethodItem[];
  id: string;
  setActiveItem: (
    name: string,
    fragmentKey: string,
    id: string,
    readMethod: boolean
  ) => void;
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  options,
  id,
  setActiveItem,
}) => {
  const [open, isOpen] = useState(false);
  const [isOverflown, setIsOverflown] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current!;

    setIsOverflown(element.scrollWidth > element.clientWidth);
    const handleResize = () => {
      setIsOverflown(element.scrollWidth > element.clientWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div
        onClick={() => isOpen(!open)}
        className="bonadocs__accordion__parent"
      >
        <svg
          className={`bonadocs__accordion__parent__icon ${
            open && "bona__transition"
          }`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.31344 3.64645C6.5087 3.45118 6.82528 3.45118 7.02055 3.64645L11.0205 7.64645C11.1143 7.74021 11.167 7.86739 11.167 8C11.167 8.13261 11.1143 8.25979 11.0205 8.35355L7.02055 12.3536C6.82528 12.5488 6.5087 12.5488 6.31344 12.3536C6.11818 12.1583 6.11818 11.8417 6.31344 11.6464L9.95989 8L6.31344 4.35355C6.11818 4.15829 6.11818 3.84171 6.31344 3.64645Z"
            fill="currentColor"
          />
        </svg>

        <h3 className={`bonadocs__accordion__parent__text ${title}`} ref={ref}>
          {title}
        </h3>
        {isOverflown && (
          <Tooltip opacity={1} clickable anchorSelect={`.${title}`}>
            {title}
          </Tooltip>
        )}
      </div>
      {open && (
        <div className="bonadocs__accordion__children">
          {options.map((item, i) => (
            <AccordionChildItem
              item={item}
              id={id}
              key={item.fragmentKey}
              setActiveItem={setActiveItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};
