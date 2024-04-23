import React from "react";

interface OverlayProps {
  overlayRef: React.RefObject<HTMLDivElement>;
}

export const Overlay: React.FC<OverlayProps> = ({ overlayRef }) => {
  return (
    <div ref={overlayRef} className="bonadocs__overlay">
      <img
        className="bonadocs__overlay__img"
        src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1701939206/infinite-spinner_ofu0ob.svg"
      />
    </div>
  );
};
