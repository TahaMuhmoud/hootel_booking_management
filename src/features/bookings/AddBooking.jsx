import { useForm } from "react-hook-form";
import { useAddBooking } from "./useAddBooking";
import InputRow from "../../ui/InputRow";
import Button from "../../ui/Button";
import Sppiner from "../../ui/Sppiner";
import AddGuest from "../guests/AddGuest";
import Select from "../../ui/Select";
import { useCabins } from "../cabins/useCabins";
import { useGuests } from "../guests/useGuests";
import { useState } from "react";
import { HashLoader } from "react-spinners";
import CheckInput from "../../ui/CheckInput";
import { differenceInDays } from "date-fns";
import toast from "react-hot-toast";
import { useSettings } from "../settings/useSettings";
import { SECONDARY_COLOR } from "../../utils/constants";

let guestOptions = [];
let cabinOptions = [];

function AddBooking() {
  const [isShowAddGuest, setIsShowAddGuest] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { settings } = useSettings();

  const { mutate, isBookAdding } = useAddBooking();

  const { cabins, isLoadingCabins } = useCabins();
  const { guests, isLoadingGuest } = useGuests();

  if (isLoadingCabins || isLoadingGuest) return <Sppiner />;

  if (guests) {
    guestOptions = guests?.map((guest) => {
      return { value: guest.id, name: guest.fullName };
    });
  }
  if (cabins) {
    cabinOptions = cabins?.map((cabin) => {
      return { value: cabin.id, name: cabin.name };
    });
  }

  function addBookOnSubmit(formData) {
    const numNights = differenceInDays(formData.endDate, formData.startDate);

    const cabin = cabins.filter((item) => item.id == formData.cabinId)[0];
    //
    const maxCapacity = cabin?.maxCapacity;
    //
    const cabinPrice =
      cabin.regularPrice - cabin?.regularPrice * (cabin?.discount / 100);
    //
    const extrasPrice = settings?.breakfastPrice * Number(formData.numGuests);

    if (formData.numGuests <= maxCapacity && numNights > 0) {
      mutate({
        guestId: Number(formData.guestId),
        cabinId: Number(formData.cabinId),
        startDate: formData.startDate,
        endDate: formData.endDate,
        numNights: numNights,
        numGuests: formData.numGuests,
        status: formData.status,
        hasBreakfast: formData.hasBreakfast,
        isPaid: formData.isPaid,
        cabinPrice: cabinPrice,
        totalPrice: cabinPrice + formData.hasBreakfast ? extrasPrice : 0,
        extrasPrice: extrasPrice,
      });
    } else {
      if (formData.numGuests > maxCapacity) {
        toast.error(`please choose number of guests < ${maxCapacity}`);
      } else toast.error(`please choose start date before end date`);
    }
  }

  return (
    <div className="flex flex-col gap-10">
      {isShowAddGuest && <AddGuest />}
      <form
        className="grid grid-cols-6 items-end gap-7 gap-x-5 text-lg font-medium"
        onSubmit={handleSubmit(addBookOnSubmit)}
      >
        <div className="flex items-center gap-5 col-span-6">
          <Select
            label="Select Guest"
            onChange={() => {}}
            register={register("guestId", {
              required: "this field is required",
            })}
            options={guestOptions}
          />
          {!isShowAddGuest && (
            <Button onClick={() => setIsShowAddGuest(true)}>
              Add new Guest
            </Button>
          )}
        </div>
        <Select
          label="Select Cabin"
          register={register("cabinId", {
            required: "this field is required",
          })}
          options={cabinOptions}
          className="col-span-6"
        />
        <InputRow
          label="start"
          name="startDate"
          type="date"
          options={register("startDate", {
            required: "this field is required",
          })}
          error={errors?.startDate ? errors?.startDate.message : ""}
          className="col-span-3"
        />
        <InputRow
          label="end"
          name="endDate"
          type="date"
          options={register("endDate", {
            required: "this field is required",
          })}
          error={errors?.endDate ? errors?.endDate.message : ""}
          className="col-span-3"
        />

        <InputRow
          label="numGuests"
          name="numGuests"
          type="number"
          options={register("numGuests", {
            min: 1,
            required: "this field is required",
          })}
          error={
            errors?.numGuests
              ? errors?.numGuests.message
                ? errors?.numGuests.message
                : `this field must be >= 1`
              : ""
          }
          className="col-span-3"
        />
        <Select
          label="status"
          onChange={() => {}}
          register={register("status", {
            required: "this field is required",
          })}
          options={[
            { name: "confirmed", value: "confirmed" },
            { name: "check-in", value: "check-in" },
            { name: "check-out", value: "check-out" },
          ]}
          className="h-full col-span-3 flex justify-center items-center"
        />
        <CheckInput
          name={"hasBreakfast"}
          label={"do you want breakfast"}
          register={register("hasBreakfast")}
          value={true}
        />
        <CheckInput
          name={"isPaid"}
          label={"do you want to pay now"}
          register={register("isPaid")}
          value={true}
        />

        <Button
          className="col-span-6"
          type="submit"
          disabled={isBookAdding}
          icon={<HashLoader size={20} color={SECONDARY_COLOR} loading={isBookAdding} />}
        >
          Add Booking
        </Button>
      </form>
    </div>
  );
}

AddBooking.propTypes = {};

export default AddBooking;
