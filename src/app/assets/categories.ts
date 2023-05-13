import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";
import { t } from "i18next";

export const categories = [
  {
    label: t("Beach.label"),
    icon: TbBeach,
    description: t("Beach.description"),
  },
  {
    label: t("Windmills.label"),
    icon: GiWindmill,
    description: t("Windmills.description"),
  },
  {
    label: t("Modern.label"),
    icon: MdOutlineVilla,
    description: t("Modern.description"),
  },
  {
    label: t("Countryside.label"),
    icon: TbMountain,
    description: t("Countryside.description"),
  },
  {
    label: t("Pools.label"),
    icon: TbPool,
    description: t("Pools.description"),
  },
  {
    label: t("Islands.label"),
    icon: GiIsland,
    description: t("Islands.description"),
  },
  {
    label: t("Lake.label"),
    icon: GiBoatFishing,
    description: t("Lake.description"),
  },
  {
    label: t("Skiing.label"),
    icon: FaSkiing,
    description: t("Skiing.description"),
  },
  {
    label: t("Castles.label"),
    icon: GiCastle,
    description: t("Castles.description"),
  },
  {
    label: t("Caves.label"),
    icon: GiCaveEntrance,
    description: t("Caves.description"),
  },
  {
    label: t("Camping.label"),
    icon: GiForestCamp,
    description: t("Camping.description"),
  },
  {
    label: t("Arctic.label"),
    icon: BsSnow,
    description: t("Arctic.description"),
  },
  {
    label: t("Desert.label"),
    icon: GiCactus,
    description: t("Desert.description"),
  },
  {
    label: t("Barns.label"),
    icon: GiBarn,
    description: t("Barns.description"),
  },
  {
    label: t("Lux.label"),
    icon: IoDiamond,
    description: t("Lux.description"),
  },
];
