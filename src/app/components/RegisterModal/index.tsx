"use client";

import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useRegisterModal } from "@/app/hooks/useRegisterModal";
import { useLoginModal } from "@/app/hooks/useLoginModal";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Modal } from "../Modal";
import { Heading } from "../Heading";
import { Input } from "../Input";
import { toast } from "react-hot-toast";
import { Button } from "../Button";
import { signIn } from "next-auth/react";
import { t } from "i18next";

export const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((err) => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title={t("RegisterModal.welcomeTitle")}
        subtitle={t("RegisterModal.createAccountSubtitle") as string}
      />
      <Input
        id="email"
        label={t("RegisterModal.emailLabel")}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label={t("RegisterModal.nameLabel")}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label={t("RegisterModal.passwordLabel")}
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
        label={t("RegisterModal.continueGoogle")}
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label={t("RegisterModal.continueGitHub")}
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="justify-center flex items-center  mt-4 font-light">
        <div className=" flex flex-row items-center gap-2">
          <div>{t("RegisterModal.alreadyHaveAccount")}</div>
          <div
            onClick={onToggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            {t("RegisterModal.login")}
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title={t("RegisterModal.title") as string}
      actionLabel={t("RegisterModal.continueButton") as string}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
