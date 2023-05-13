"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export const Logo: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <Image
        onClick={() => router.push("/")}
        src="/images/logo.png"
        className="hidden md:block cursor-pointer"
        width="100"
        height="100"
        alt="logo"
      />
    </div>
  );
  return <div>oi</div>;
};
0