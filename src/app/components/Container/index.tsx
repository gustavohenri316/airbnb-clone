"use client";

import { ContainerProps } from "@/app/types";

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sn:px-2 px-4">
      {children}
    </div>
  );
};
