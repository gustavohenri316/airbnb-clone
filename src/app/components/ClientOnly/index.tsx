"use client";
import { ClientOnlyProps } from "@/app/types";
import { useEffect, useState } from "react";
import  "@/i18n";

export const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }
  return <>{children}</>;
};
