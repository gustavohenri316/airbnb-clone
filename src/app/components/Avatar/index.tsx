"use client";

import Image from "next/image";
import React from "react";
interface AvatarProps {
  src: string | null | undefined
}
export const Avatar: React.FC<AvatarProps> = ({src}) => {
  return (
    <Image
      className="rounded-full"
      height={20}
      width={30}
      alt="Avatar"
      src={src || "/images/placeholder.jpg"}
    />
  );
};
