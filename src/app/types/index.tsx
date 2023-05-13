import { User } from "@prisma/client";
import { IconType } from "react-icons";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export interface UserMenuProps {
  currentUser?: SafeUser | null;
}
export interface NavbarProps {
  currentUser?: SafeUser | null;
}

export interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

export interface ClientOnlyProps {
  children: React.ReactNode;
}
export interface ContainerProps {
  children: React.ReactNode;
}

export interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

export interface MenuItemProps {
  onClick: () => void;
  label: string;
}

export interface ModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}


export interface CategoryBoxProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

export interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

export interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

export interface MapProps {
  center?: number[];
}
export interface CategoryInputProps {
  onClick: (value: string) => void;
  selected?: boolean;
  icon: IconType;
  label: string;
}
