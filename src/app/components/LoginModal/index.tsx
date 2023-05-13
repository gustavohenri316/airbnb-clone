"use client";

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useRouter } from "next/navigation";

import { useRegisterModal } from "@/app/hooks/useRegisterModal";
import { useLoginModal } from "@/app/hooks/useLoginModal";

import { Modal } from "../Modal";
import { Input } from "../Input";
import { Heading } from "../Heading";
import { Button } from "../Button";
import { t } from "i18next";

export const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
  
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
  
      if (callback?.ok) {
        toast.success(t('LoginModal.loggedIn'));
        router.refresh();
        loginModal.onClose();
      }
  
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };
  
  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);
  
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title={t('LoginModal.welcomeTitle')} subtitle={t('LoginModal.loginSubtitle') as string} />
      <Input
        id="email"
        label={t('LoginModal.emailLabel')}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label={t('LoginModal.passwordLabel')}
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label={t('LoginModal.googleButton')}
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label={t('LoginModal.githubButton')}
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <p>
          {t('LoginModal.firstTime')}
          <span
            onClick={onToggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >{' '}
            {t('LoginModal.createAccount')}
          </span>
        </p>
      </div>
    </div>
  );
  
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title={t('LoginModal.title') as string}
      actionLabel={t('LoginModal.continueButton') as string}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
