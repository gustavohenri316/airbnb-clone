"use client";
import { AiOutlineMenu } from "react-icons/ai";
import { useCallback, useEffect, useState } from "react";
import { Avatar } from "../Avatar";
import { MenuItem } from "../MenuItem";
import { UserMenuProps } from "@/app/types";

import { useRegisterModal } from "@/app/hooks/useRegisterModal";
import { signOut } from "next-auth/react";
import { useLoginModal } from "@/app/hooks/useLoginModal";
import { useTranslation } from "react-i18next";
import { useRentModal } from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

export const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("i18nextLng") ?? "ptBR"
  );
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);

  const handleLanguageChange = useCallback(() => {
    const newLanguage = language === "ptBR" ? "en" : "ptBR";
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    location.reload();
  }, [language, setLanguage, router, i18n]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          {t("UserMenu.airbnbYourHome")}
        </div>
        <div
          className="text-neutral-500 hover:cursor-pointer"
          onClick={handleLanguageChange}
        >
          {language === "ptBR" ? "EN" : "PT"}
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-100 flex flex-row items-center gap-3 rounded-full hover:shadow-md transition cursor-pointer"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push("/trips")}
                  label={t("UserMenu.myTrips")}
                />
                <MenuItem
                  onClick={() => router.push("/favorites")}
                  label={t("UserMenu.myFavorites")}
                />
                <MenuItem
                  onClick={() => router.push("/reservations")}
                  label={t("UserMenu.myReservations")}
                />
                <MenuItem
                  onClick={() => router.push("/properties")}
                  label={t("UserMenu.myProperties")}
                />
                <MenuItem
                  onClick={rentModal.onOpen}
                  label={t("UserMenu.airbnbMyHome")}
                />
                <hr />
                <MenuItem
                  onClick={() => signOut()}
                  label={t("UserMenu.logout")}
                />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={loginModal.onOpen}
                  label={t("UserMenu.login")}
                />
                <MenuItem
                  onClick={registerModal.onOpen}
                  label={t("UserMenu.signUp")}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
