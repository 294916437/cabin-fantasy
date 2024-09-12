"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

function Logo({}: Props) {
  const router = useRouter();

  return (
    <div onClick={() => router.push("/")} className='flex items-center gap-1 cursor-pointer'>
      <Image
        alt='logo'
        className='hidden md:block'
        height={32}
        width={64}
        src='/assets/logo.png'
      />
      <span className='text-xl font-semibold text-gray-800'>CabinFantasy</span>
    </div>
  );
}

export default Logo;
