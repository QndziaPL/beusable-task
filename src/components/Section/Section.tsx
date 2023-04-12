import { type FC, type ReactNode } from "react";
import "./Section.css";

export interface SectionProps {
  title: string;
  children: ReactNode;
}
export const Section: FC<SectionProps> = ({ children, title }) => {
  return (
    <section>
      <h4>{title}</h4>
      <hr />
      {children}
    </section>
  );
};
