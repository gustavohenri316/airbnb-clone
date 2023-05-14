import { IconType } from "react-icons";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import { Listing, Reservation, User } from "@prisma/client";
import { RangeKeyDict, Range } from "react-date-range";

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};

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

export interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | undefined | null;
}

export interface HeartButtonProps {
  listingId: string;
  currentUser: SafeUser | null | undefined;
}

export interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

export interface IUserFavorite {
  listingId: string;
  currentUser?: SafeUser | null | undefined;
}

export interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

export interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
}

export interface ListingInfoProps {
  user: SafeUser,
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category: {
    icon: IconType,
    label: string;
    description: string;
  } | undefined
  locationValue: string;
}

export interface ListingCategoryProps {
  icon: IconType,
  label: string,
  description: string
}

export interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

export interface DatePickerProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
}

export interface TripsClientProps {
  reservations: SafeReservation[];
  currentUser:  SafeUser | null | undefined;
}
export interface IParams {
  listingId?: string;
  reservationId?: string;
  userId?: string;
  authorId?: string;
}

export interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel?: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryLabel?: string;
  secondaryActionLabel?: string;
}

export interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

export interface AvatarProps {
  src: string | null | undefined
}