import React from "react";
import {
  FaBusinessTime,
  FaCampground,
  FaCarAlt,
  FaCarSide,
  FaHorse,
  FaMosque,
  FaParking,
  FaPlane,
  FaRunning,
  FaShower,
  FaSmokingBan,
  FaSwimmingPool,
  FaToilet,
  FaTrain,
  FaUniversity,
  FaWater,
  FaWifi,
} from "react-icons/fa";
import { FaKitchenSet, FaUsersViewfinder } from "react-icons/fa6";
import {
  GiArcher,
  GiCoffeeCup,
  GiCooler,
  GiDoubleFish,
  GiFlyingFox,
  GiKidSlide,
  GiPeaks,
  GiPlantsAndAnimals,
  GiSleepingBag,
} from "react-icons/gi";
import { IoMdRestaurant } from "react-icons/io";
import { IoStorefront } from "react-icons/io5";
import {
  MdBedroomChild,
  MdFreeBreakfast,
  MdLocalLaundryService,
  MdMeetingRoom,
  MdMosque,
  MdOutlineSportsHandball,
  MdOutlineStorage,
  MdSoupKitchen,
  MdTableRestaurant,
} from "react-icons/md";
import { RiLifebuoyFill } from "react-icons/ri";
import { SiGooglehome } from "react-icons/si";
import {
  PiMotorcycleBold,
  PiParkBold,
  PiTelevisionSimpleFill,
} from "react-icons/pi";
import { CgGym, CgSmartHomeRefrigerator } from "react-icons/cg";
import { TbMassage } from "react-icons/tb";

const renderFacilityIcon = (facilityId) => {
  switch (facilityId) {
    case 1:
      return <FaParking className="w-10 h-10" />;
    case 2:
      return <FaToilet className="w-10 h-10" />;
    case 3:
      return <FaMosque className="w-10 h-10" />;
    case 4:
      return <FaUniversity className="w-10 h-10" />;
    case 5:
      return <FaSwimmingPool className="w-10 h-10" />;
    case 6:
      return <IoStorefront className="w-10 h-10" />;
    case 7:
      return <FaCampground className="w-10 h-10" />;
    case 8:
      return <GiFlyingFox className="w-10 h-10" />;
    case 9:
      return <GiKidSlide className="w-10 h-10" />;
    case 10:
      return <PiMicrophoneStageFill className="w-10 h-10" />;
    case 11:
      return <SiGooglehome className="w-10 h-10" />;
    case 12:
      return <MdOutlineSportsHandball className="w-10 h-10" />;
    case 13:
      return <FaCarAlt className="w-10 h-10" />;
    case 14:
      return <FaTrain className="w-10 h-10" />;
    case 15:
      return <PiMotorcycleBold className="w-10 h-10" />;
    case 16:
      return <MdMosque className="w-10 h-10" />;
    case 17:
      return <GiPlantsAndAnimals className="w-10 h-10" />;
    case 18:
      return <FaPlane className="w-10 h-10" />;
    case 19:
      return <FaUsersViewfinder className="w-10 h-10" />;
    case 20:
      return <GiPeaks className="w-10 h-10" />;
    case 21:
      return <RiLifebuoyFill className="w-10 h-10" />;
    case 22:
      return <FaWater className="w-10 h-10" />;
    case 23:
      return <GiArcher className="w-10 h-10" />;
    case 24:
      return <GiDoubleFish className="w-10 h-10" />;
    case 25:
      return <GiSleepingBag className="w-10 h-10" />;
    case 26:
      return <MdFreeBreakfast className="w-10 h-10" />;
    case 27:
      return <FaHorse className="w-10 h-10" />;
    case 28:
      return <IoMdRestaurant className="w-10 h-10" />;
    case 29:
      return <GiCooler className="w-10 h-10" />;
    case 30:
      return <FaWifi className="w-10 h-10" />;
    case 31:
      return <FaBusinessTime className="w-10 h-10" />;
    case 32:
      return <FaSmokingBan className="w-10 h-10" />;
    case 33:
      return <MdOutlineStorage className="w-10 h-10" />;
    case 34:
      return <GiCoffeeCup className="w-10 h-10" />;
    case 35:
      return <MdLocalLaundryService className="w-10 h-10" />;
    case 36:
      return <PiParkBold className="w-10 h-10" />;
    case 37:
      return <FaRunning className="w-10 h-10" />;
    case 38:
      return <MdMeetingRoom className="w-10 h-10" />;
    case 39:
      return <CgGym className="w-10 h-10" />;
    case 40:
      return <PiTelevisionSimpleFill className="w-10 h-10" />;
    case 41:
      return <MdTableRestaurant className="w-10 h-10" />;
    case 42:
      return <MdSoupKitchen className="w-10 h-10" />;
    case 43:
      return <CgSmartHomeRefrigerator className="w-10 h-10" />;
    case 44:
      return <FaShower className="w-10 h-10" />;
    case 45:
      return <TbMassage className="w-10 h-10" />;
    case 46:
      return <FaCarSide className="w-10 h-10" />;
    case 47:
      return <MdBedroomChild className="w-10 h-10" />;
    case 48:
      return <FaKitchenSet className="w-10 h-10" />;
    default:
      return null;
  }
};

const FacilityList = ({ facilities }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {facilities.map((facility) => (
        <div key={facility.name} className="flex items-center gap-3">
          {renderFacilityIcon(Number(facility.facility_id))}
          <p className="text-neutral-60 rounded-full">{facility.name}</p>
        </div>
      ))}
    </div>
  );
};

export default FacilityList;
