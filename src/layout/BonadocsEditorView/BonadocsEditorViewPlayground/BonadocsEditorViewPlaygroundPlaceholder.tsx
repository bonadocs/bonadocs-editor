import React from "react";

interface BonadocsEditorViewPlaygroundPlaceholderProps {
  className?: string;
  title: string;
  description: string;
}

export const BonadocsEditorViewPlaygroundPlaceholder: React.FC<
  BonadocsEditorViewPlaygroundPlaceholderProps
> = ({ className, title, description }) => {
  return (
    <div className={`bonadocs__editor__dashboard__playground__placeholder ${className}`}>
      <img
        alt="Empty placeholder"
        src="https://res.cloudinary.com/dfkuxnesz/image/upload/v1713548190/placeholder_jwscw0.svg"
      />
      <h3>{title}</h3>
      <span>{description}</span>
    </div>
  );
};
