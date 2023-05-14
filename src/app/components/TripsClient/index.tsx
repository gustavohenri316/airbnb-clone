"use client";
import { TripsClientProps } from "@/app/types";
import { Container } from "../Container";
import { Heading } from "../Heading";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ListingCard } from "../ListingCard";
import { t } from "i18next";

export const TripsClient: React.FC<TripsClientProps> = ({
  currentUser,
  reservations,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success(t('toast.reservationCancelledSuccess'));
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => setDeletingId(""));
    },
    [router]
  );

  return (
    <Container>
     <Heading
        title={t('trips.title')}
        subtitle={t('trips.subtitle') as string}
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel={t('listingCard.cancelReservation') as string}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};
