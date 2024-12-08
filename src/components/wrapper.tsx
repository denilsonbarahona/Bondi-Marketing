import { ReactNode } from "react";

interface WrapperProps {
  readonly children: ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  return <div className="max-w-[1440px] mx-auto px-5 md:px-9">{children}</div>;
};
