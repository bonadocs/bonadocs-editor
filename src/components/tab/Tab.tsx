import React from "react";
import clsx from "clsx";
interface TabProps {
  className?: string;
  children: React.ReactNode | string;
  type?: "package" | "inertia" | "critical";
  color?: "neutral" | "yellow" | "blue";
}

type PackageType = {
  [key in "neutral" | "yellow" | "blue"]: string;
};

type TabType = {
  [key in "package" | "inertia" | "critical"]: PackageType | string;
};

const tabType: TabType = {
  package: {
    neutral: "bonadocs__tab__package bonadocs__tab__package__neutral",
    yellow: "bonadocs__tab__package bonadocs__tab__package__yellow",
    blue: "bonadocs__tab__package bonadocs__tab__package__blue",
  },
  inertia: "bonadocs__button__inertia",
  critical: "bonadocs__button__critical",
};

export const Tab: React.FC<TabProps> = ({
  className,
  children,
  type = "neutral",
  color,
}) => {
  // Component logic here
  const tabClassName =
    type &&
    color &&
    (tabType[type as keyof TabType] as PackageType)[color as keyof PackageType];
  return (
    <div className={clsx("bonadocs__tab", className, tabClassName)}>
      {children}
    </div>
  );
};
