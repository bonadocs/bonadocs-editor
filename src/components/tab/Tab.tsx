import React from "react";

interface TabProps {
  className?: string;
  children: React.ReactNode | string;
}
export const Tab: React.FC<TabProps> = ({ className, children }) => {
  // Component logic here
  return <div className={`bonadocs__tab ${className}`}>{children}</div>;
};
