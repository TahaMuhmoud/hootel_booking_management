import { useState } from "react";
import PropTypes from "prop-types";
import { FaBed } from "react-icons/fa";
import { getTotalPrice } from "../utils/helpers";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LuBadge } from "react-icons/lu";
import Button from "./Button";

function CabinCard({ booking }) {
  const cabin = booking.cabins;
  const [showDescription, setShowDescription] = useState(false);
  function handleShowDescription() {
    setShowDescription((is) => !is);
  }
  return (
    <div>
      <div className="bg-[#dfdfdf] text-primary w-full sm:h-56 sm:flex border-[1px] border-primary">
        <div className="img w-auto p-1">
          <div className="w-full sm:h-full sm:w-auto aspect-square">
            <img src={cabin.image} alt="" className="w-full h-full block" />
          </div>
        </div>
        <div className="info w-full flex flex-col gap-5 sm:gap-0 sm:justify-between p-3 px-7">
          <div className="flex items-center justify-between gap-3">
            <span className="text-2xl font-bold">Cabin</span>
            <span className="text-3xl font-bold">{cabin.name}</span>
            {cabin.discount !== 0 && (
              <div className="relative text-sm font-bold">
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  {cabin.discount}%
                </span>
                <LuBadge size={50} />
              </div>
            )}
          </div>
          <div className="capacity ">
            <span className="text-lg font-bold">
              Cabin with {cabin.maxCapacity} bed
            </span>
            <div className="flex gap-2">
              {Array.from({ length: cabin.maxCapacity }, (_, i) => (
                <FaBed
                  key={i}
                  className={`text-3xl ${i < booking.numGuests ? "text-primary" : "text-red-400"}`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-xl font-bold">Price</span>
            <div className="flex gap-3 items-end">
              {cabin.discount !== 0 && (
                <span className="line-through italic font-bold text-red-700">
                  {cabin.regularPrice}$
                </span>
              )}
              <span className="text-2xl font-bold">
                {getTotalPrice(cabin.regularPrice, cabin.discount)}$
              </span>
            </div>
          </div>
          <Button
            className="flex items-center gap-3"
            onClick={handleShowDescription}
          >
            <span className="text-xl">Description</span>
            {!showDescription ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </Button>
        </div>
      </div>
      {showDescription && (
        <div className="w-full">
          <div className="text-xl font-bold">Description</div>
          <div className="">{cabin.description.split("").join("")}</div>
        </div>
      )}
    </div>
  );
}

CabinCard.propTypes = { booking: PropTypes.object };

export default CabinCard;
