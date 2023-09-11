import EarthIcon from "../icons/EarthIcon";
import HouseIcon from "../icons/HouseIcon";
import LaptopIcon from "../icons/LaptopIcon";
import MobileIcon from "../icons/MobileIcon";
import ShopIcon from "../icons/ShopIcon";

export const VIDEO_VARIANTS = [
  {
    icon: HouseIcon,
    label: "I want a video for my airbnb listing",
    key: "ad",
  },
  {
    icon: ShopIcon,
    label: "I just booked an airbnb, i am excited",
    key: "social",
  },
  {
    icon: EarthIcon,
    label: "Congratulation for your booking",
    key: "congratulation",
  },
];
export const VIDEO_RESOLUTIONS = [
  {
    icon: MobileIcon,
    label: "1080X1920",
    key: "mobile",
    value: "w-full h-[800px]",
  },
  {
    icon: LaptopIcon,
    label: "2560X1440",
    key: "desktop",
    value: "w-full h-[800px]",
  },
];


