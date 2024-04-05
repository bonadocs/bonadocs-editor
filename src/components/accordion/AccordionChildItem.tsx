import React, { useRef, useEffect, useState } from "react";
import { MethodItem } from "@/data/dataTypes";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";

interface AccordionChildItemProps {
  item: MethodItem;
  setActiveItem: (
    name: string,
    fragmentKey: string,
    id: string,
    readMethod: boolean
  ) => void;
  id: string;
}

const AccordionChildItem: React.FC<AccordionChildItemProps> = ({
  item,
  id,
  setActiveItem,
}) => {
  const childRef = useRef<HTMLDivElement>(null);
    const methodItem = useSelector((state: RootState) => state.method.methodItem);
    
  const [isOverflown, setIsOverflown] = useState(false);

  useEffect(() => {
    const element = childRef.current!;

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
    <>
      <div
        ref={childRef}
        className={`bonadocs__accordion__children__item ${item.name} ${
          methodItem.fragmentKey === item.fragmentKey &&
          "bonadocs__accordion__children__item__active"
        } bonadocs__accordion__children__item`}
        onClick={() =>
          setActiveItem(item.name, item.fragmentKey, id, item.readMethod)
        }
      >
        {item.name}
      </div>
      {isOverflown && (
        <Tooltip opacity={1} clickable anchorSelect={`.${item.name}`}>
          {item.name}
        </Tooltip>
      )}
    </>
  );
};

export default AccordionChildItem;
