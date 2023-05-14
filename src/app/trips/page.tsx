import { EmptyState } from "../components/EmptyState";
import { ClientOnly } from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import { TripsClient } from "../components/TripsClient";
import { t } from "i18next";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title={t("tripsPage.unauthorizedTitle") as string}
          subtitle={t("tripsPage.unauthorizedSubtitle") as string}
        />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
           title={t('tripsPage.noTripsTitle') as string}
           subtitle={t('tripsPage.noTripsSubtitle') as string}
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default TripsPage;
