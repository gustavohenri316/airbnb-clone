"use client";

import { useMemo, useState } from "react";
import { useRentModal } from "@/app/hooks/useRentModal";
import { Modal } from "../Modal";
import { Heading } from "../Heading";
import { categories } from "@/app/assets/categories";
import { CategoryInput } from "../CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { CountrySelect } from "../CountrySelect";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Map } from "../Map";
import { t } from "i18next";
import { Counter } from "../Counter";
import { ImageUpload } from "../ImageUpload";
import { Input } from "../Input";
import axios from "axios";
import { toast } from "react-hot-toast";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const location = watch("location");
  const category = watch("category");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing created!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return t("rentModal.actionLabel.create");
    }

    return t("rentModal.actionLabel.next");
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return t("rentModal.actionLabel.back");
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title={t("rentModal.placeDescription.title")}
        subtitle={t("rentModal.placeDescription.subtitle") as string}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={t("rentModal.location.title")}
          subtitle={t("rentModal.location.subtitle") as string}
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={t("rentModal.basicInfo.title")}
          subtitle={t("rentModal.basicInfo.subtitle") as string}
        />
        <Counter
          onChange={(value) => setCustomValue("guestCount", value)}
          value={guestCount}
          title={t("rentModal.guests.title")}
          subtitle={t("rentModal.guests.subtitle")}
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("roomCount", value)}
          value={roomCount}
          title={t("rentModal.rooms.title")}
          subtitle={t("rentModal.rooms.subtitle")}
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("bathroomCount", value)}
          value={bathroomCount}
          title={t("rentModal.bathrooms.title")}
          subtitle={t("rentModal.bathrooms.subtitle")}
        />
      </div>
    );
  }
  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={t("rentModal.addPhoto.title")}
          subtitle={t("rentModal.addPhoto.subtitle") as string}
        />
        <ImageUpload
          onChange={(value) => setCustomValue("imageSrc", value)}
          value={imageSrc}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={t("rentModal.describePlace.title")}
          subtitle={t("rentModal.describePlace.subtitle") as string}
        />
        <Input
          id="title"
          label={t("rentModal.describePlace.labelTitle")}
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label={t("rentModal.describePlace.labelDescription")}
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={t("rentModal.setPrice.title")}
          subtitle={t("rentModal.setPrice.subtitle") as string}
        />
        <Input
          id="price"
          label={t("rentModal.setPrice.labelPrice")}
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      title={t("rentModal.modalTitle") as string}
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={rentModal.onClose}
      body={bodyContent}
    />
  );
};
