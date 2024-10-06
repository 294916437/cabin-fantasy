"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { toast } from "react-toastify";
declare global {
  var cloudinary: any;
}

type Props = {
  onChange: (value: string) => void;
  value: string;
  showValue:boolean;
};

function ImageUpload({ onChange, value ,showValue}: Props) {
  const handleCallback = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange, value]
  );

  return (
    <CldUploadWidget
      onUpload={handleCallback}
      uploadPreset='carbin_preview'
      options={{
        maxFiles: 1,
      }}>
      {({ open }) => {
        return (
          <div
            onClick={() => {
              try {
                open();
              } catch (error) {
                console.log(error);
                toast.info("Waiting a minute,the uploader is initializing");
              }
            }}
            className=' relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600'>
            <TbPhotoPlus size={50} />
            <div className='font-semibold text-lg'>Click to upload</div>
            {value && showValue && (
              <div className=' absolute inset-0 w-full h-full'>
                <Image alt='upload' fill style={{ objectFit: "cover" }} src={value} />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
}

export default ImageUpload;
