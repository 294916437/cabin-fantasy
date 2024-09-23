"use client";

import useLoginModel from "@/hook/useLoginModal";
import useRegisterModal from "@/hook/useRegisterModal";
import useRentModal from "@/hook/useRentModal";
import useProfileModal from "@/hook/useProfileModal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";
import { signOut } from "next-auth/react";
import {  useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
type Props = {
  currentUser?: SafeUser | null;
};
function UserMenu({ currentUser }: Props) {
  const router = useRouter();
  const profileModel = useProfileModal();
  const registerModel = useRegisterModal();
  const loginModel = useLoginModel();
  const rentModel = useRentModal();
  const [isOpen, setIsOpen] = useState(false);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModel.onOpen();
    }

    rentModel.onOpen();
  }, [currentUser, loginModel, rentModel]);
  const handleMouseEnter = () => {
    setIsOpen(true);
  };
  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div
          className='hidden md:block text-sm text-white font-semibold py-3 px-4 border-[1px] bg-first rounded-full hover:shadow-md transition cursor-pointer'
          onClick={onRent}>
          Click to Rent
        </div>
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className='p-4 md:py-1 md:px-2 border-[1px] flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'>
          <AiOutlineMenu />
          <div className='hidden md:block'>
            {currentUser ? (
              <Avatar src={currentUser?.image} userName={currentUser?.name} />
            ) : (
              <Image
                className='rounded-full'
                height='30'
                width='30'
                alt='Avatar'
                src='/assets/avatar.png'
              />
            )}
          </div>
        </div>
      </div>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white  right-0 top-12 text-sm transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}>
        <div className='flex flex-col cursor-pointer'>
          {currentUser ? (
            <>
              <MenuItem onClick={profileModel.onOpen} label='My Profile' />
              <hr />
              <MenuItem onClick={() => router.push("/trips")} label='My trips' />
              <MenuItem onClick={() => router.push("/favorites")} label='My favorites' />
              <MenuItem onClick={() => router.push("/reservations")} label='My reservations' />
              <MenuItem onClick={() => router.push("/properties")} label='My properties' />
              <MenuItem onClick={onRent} label='rent your carbin' />
              <hr />
              <MenuItem onClick={() => signOut()} label='Logout' />
            </>
          ) : (
            <>
              <MenuItem onClick={loginModel.onOpen} label='Login' />
              <MenuItem onClick={registerModel.onOpen} label='Sign up' />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserMenu;
