import { ListingReservationProps } from "@/app/types";
import { Button } from "../Button";
import { Calendar } from "../Calendar";
import { t } from "i18next";

export const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  return (
    <div className="bg-white rounded-xl border-[1px]border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">
          {t("listingReservation.price")}
          {price}
        </div>
        <div className="font-light text-neutral-600">
          {t("listingReservation.night")}
        </div>
      </div>
      <hr />
      <Calendar
        //@ts-ignore
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value: any) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button
          disabled={disabled}
          label={t("listingReservation.reserve")}
          onClick={onSubmit}
        />
      </div>
      <hr />
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>{t("listingReservation.total")}</div>
        <div>
          {t("listingReservation.totalPrice")} {totalPrice}
        </div>
      </div>
    </div>
  );
};
