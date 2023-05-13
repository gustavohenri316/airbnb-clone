"use client";

import Image from "next/image";

export const Avatar = () => {
  return (
    <Image
      className="rounded-full"
      height={20}
      width={30}
      alt="Avatar"
      src="/images/placeholder.jpg"
    />
  );
};
