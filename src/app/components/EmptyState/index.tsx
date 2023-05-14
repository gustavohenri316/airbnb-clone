"use client";
import { useRouter } from "next/navigation";
import { Heading } from "../Heading";
import { Button } from "../Button";
import { t } from "i18next";
import { EmptyStateProps } from "@/app/types";

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "emptyState.title",
  subtitle = "emptyState.subtitle",
  showReset,
}) => {
  const router = useRouter();
  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={t(title)} subtitle={t(subtitle) as string} center />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label={t("emptyState.label")}
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};
