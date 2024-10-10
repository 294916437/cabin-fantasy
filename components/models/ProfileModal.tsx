"use client";
import useProfileModal from "@/hook/useProfileModal";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import Input from "../inputs/Input";
import Modal from "./Modal";
import { SafeUser } from "@/types";
import ImageUpload from "../inputs/ImageUpload";
import { BiEnvelope, BiUser } from "react-icons/bi";
import { useRouter } from "next/navigation";
type Props = {
  currentUser?: SafeUser | null;
};

function ProfileModal({ currentUser }: Props) {
  const profileModel = useProfileModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: currentUser?.email || "",
      name: currentUser?.name || "",
      image: currentUser?.image || "",
    },
  });

  useEffect(() => {
    setValue("name", currentUser?.name);
    setValue("image", currentUser?.image);
  }, [currentUser, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    const { name, email, image } = data;
    axios
      .post("/api/profile", { name, email, image })
      .then((res) => {
        router.refresh();
        toast.success("Profile updated!");
        profileModel.onClose();
      })
      .catch(() => {
        toast.error("Something Went Wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <Image
          width={232}
          height={232}
          src={watch("image") || `https://ui-avatars.com/api/?name=${currentUser?.name}`}
          className='w-120 h-120 rounded-md flex-shrink-1'
          alt='Avatar'
        />
        <ImageUpload onChange={(value) => setValue("image", value)} value={watch("image")} showValue={false}/>
      </div>
      <Input
        id='email'
        label='Email Address'
        value={watch("email")}
        disabled={isLoading}
        readonly={true}
        errors={errors}
        required
        prependIcon={<BiEnvelope size={24} className='text-secondary' />}
      />
      <Input
        id='name'
        label='Name'
        onChange={(e) => setValue("name", e.target.value)}
        value={watch("name")}
        disabled={isLoading}
        errors={errors}
        required
        prependIcon={<BiUser size={24} className='text-secondary' />}
      />
    </div>
  );

  const footerContent = <div className='flex flex-col gap-4 mt-3'></div>;

  return (
    <Modal
      disabled={isLoading}
      isOpen={profileModel.isOpen}
      title='My Profile'
      actionLabel='Save Changes'
      onClose={profileModel.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default ProfileModal;
