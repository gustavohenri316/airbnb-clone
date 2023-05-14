"use client";
import { categories } from "@/app/assets/categories";
import { ListingClientProps } from "@/app/types";
import { Reservation } from "@prisma/client";
import { useMemo } from "react";
import { Container } from "../Container";
import { ListingHead } from "../ListingHead";

export const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations,
}) => {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </Container>
  );
};
