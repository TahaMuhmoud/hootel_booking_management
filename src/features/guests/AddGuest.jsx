import { useForm } from "react-hook-form";
import InputRow from "../../ui/InputRow";
import Button from "../../ui/Button";
import { useAddGuest } from "./useAddGuest";
import FileInput from "../../ui/FileInput";
import { RiImageAddFill } from "react-icons/ri";
import { HashLoader } from "react-spinners";
import Sppiner from "../../ui/Sppiner";

function AddGuest() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { addGuestOnSubmit, isGuestAddLoading } = useAddGuest();
  if (isGuestAddLoading) return <Sppiner />;
  return (
    <div className="">
      <form
        className="grid grid-cols-6 gap-10 gap-x-3"
        onSubmit={handleSubmit(addGuestOnSubmit)}
      >
        <InputRow
          label="name"
          name="fullName"
          type="text"
          options={register("fullName", {
            required: "this field is required",
          })}
          error={errors?.fullName ? errors?.fullName.message : ""}
          className="col-span-6 sm:col-span-3"
        />
        <InputRow
          label="email"
          name="email"
          type="email"
          options={register("email", {
            required: "this field is required",
          })}
          error={errors?.email ? errors?.email.message : ""}
          className="col-span-6 sm:col-span-3"
        />
        <InputRow
          label="nationality"
          name="nationality"
          type="text"
          options={register("nationality", {
            required: "this field is required",
          })}
          error={errors?.nationality ? errors?.nationality.message : ""}
          className="col-span-3"
        />
        <InputRow
          label="natID"
          name="natID"
          type="number"
          options={register("natID", {
            required: "this field is required",
            min: 4,
          })}
          error={
            errors?.natID
              ? errors?.natID.message
                ? errors?.natID.message
                : "this field must be >= 4"
              : ""
          }
          className="col-span-3"
        />
        <FileInput
          className="col-span-6 sm:col-span-3"
          icon={<RiImageAddFill />}
          label="Choose guest avatar"
          name="avatar"
          options={register("avatar")}
        />
        <FileInput
          className="col-span-6 sm:col-span-3"
          icon={<RiImageAddFill />}
          label="Choose guest Country flag Img"
          name="countryFlag"
          options={register("countryFlag")}
        />
        {/* <InputRow name="avatar" type="file" options={register("avatar")} /> */}

        <Button
          className="col-span-6"
          type="submit"
          disabled={isGuestAddLoading}
        >
          ADD Guest
        </Button>
      </form>
    </div>
  );
}

AddGuest.propTypes = {};

export default AddGuest;
