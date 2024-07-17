import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEditBook } from "../../features/bookings/useEditBook";
import Sppiner from "../../ui/Sppiner";
import Select from "../../ui/Select";
import { GoPencil } from "react-icons/go";
import InputRow from "../../ui/InputRow";
import Button from "../../ui/Button";
import { useState } from "react";
import Header from "../../ui/Header";
import { firstLitterToUpper } from "../../utils/helpers";
import FileInput from "../../ui/FileInput";
import { RiImageAddFill } from "react-icons/ri";
import { HashLoader } from "react-spinners";
import { useCabins } from "../../features/cabins/useCabins";

const LIST = [
  { label: "Start Date", name: "startDate", type: "date" },
  { label: "end Date", name: "endDate", type: "date" },
  { label: "Num Of Nights", name: "numNights", type: "number" },
  { label: "Status", name: "status", type: "text" },
  { label: "has breakfast", name: "hasBreakfast", type: "checkbox" },
];

// let guestOptions = [];
let cabinOptions = [];

function EditBooking() {
  const [selected, setSelected] = useState(null);
  const { state: book } = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { editBook, isEditing } = useEditBook();

  const { cabins, isLoadingCabins } = useCabins();
  if (isLoadingCabins) return <Sppiner />;
  if (cabins) {
    cabinOptions = cabins?.map((cabin) => {
      return { value: cabin.id, name: cabin.name };
    });
  }

  function handleOnClick(id) {
    setSelected((sel) => (sel === null ? id : sel === id ? null : id));
  }

  function onSubmit(data) {
    if (data) editBook({ id: book.id, updatedData: data });
  }

  return (
    <div className="w-full flex flex-col gap-5">
      <Header header={firstLitterToUpper("Edit Booking")} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-7 text-lg font-bold"
      >
        <div>
          <span>Guest</span>
          <span>{":  "}</span>
          <span>{book.guests.fullName}</span>
        </div>
        <Select
          label="cabin"
          onChange={() => {}}
          register={register("cabinId", {
            required: "this field is required",
          })}
          options={cabinOptions}
        />
        {LIST.map((item, i) => (
          <div
            key={item.label}
            className={`${selected !== i ? "border-b-4 border-primary" : ""} rounded-full p-1 px-5`}
          >
            <div className="flex flex-col">
              <div
                className="flex justify-between cursor-pointer"
                onClick={() => handleOnClick(i)}
              >
                <div onClick={() => handleOnClick(i)}>
                  <span>{item.label}</span>
                  <span>{":  "}</span>
                  <span>{book[item.name].toString()}</span>
                </div>
                <GoPencil
                  className="cursor-pointer text-xl"
                  onClick={() => handleOnClick(i)}
                />
              </div>
            </div>

            {selected === i && item.type !== "file" ? (
              <div className="flex items-center gap-5">
                {item.name === "hasBreakfast" && (
                  <label htmlFor="pay">do you want to pay now</label>
                )}
                <InputRow
                  className="my-3 text-lg font-normal"
                  name={item.name}
                  type={item.type}
                  options={register(item.name, {
                    required: "this field is required",
                  })}
                  error={errors[item.name] ? errors[item.name].message : ""}
                />
              </div>
            ) : selected === i && item.type === "file" ? (
              <FileInput
                label="Choose Cabin Image"
                name="image"
                icon={<RiImageAddFill />}
                options={register("cabinImage")}
                error={errors?.cabinImage ? errors?.cabinImage.message : ""}
                className="my-3"
              />
            ) : (
              ""
            )}
          </div>
        ))}
        <Button
          type="submit"
          disabled={isEditing}
          icon={<HashLoader size={25} loading={isEditing} />}
        >
          Update Booking
        </Button>
      </form>
    </div>
  );
}

EditBooking.propTypes = {};

export default EditBooking;
