import { type FC, type ReactNode } from "react";

import "./Section.css";

export interface SectionProps {
  title: string;
  additionalContent?: ReactNode;
  children: ReactNode;
}
export const Section: FC<SectionProps> = ({
  children,
  title,
  additionalContent,
}) => {
  return (
    <section>
      <div className="sectionHeader">
        <div className="title">{title}</div>
        {additionalContent && additionalContent}
      </div>
      <hr />
      {children}
    </section>
  );
};
