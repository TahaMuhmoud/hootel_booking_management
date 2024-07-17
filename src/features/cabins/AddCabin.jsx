import { useForm } from "react-hook-form";
import InputRow from "../../ui/InputRow";
import Button from "../../ui/Button";
import { useAddCabin } from "./useAddCabin";
import FileInput from "../../ui/FileInput";
import { RiImageAddFill } from "react-icons/ri";
import { HashLoader } from "react-spinners";
import { SECONDARY_COLOR } from "../../utils/constants";

function AddCabin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { addOnSubmit, isLoading } = useAddCabin();

  return (
    <form
      className="grid grid-cols-6 items-end gap-5"
      onSubmit={handleSubmit(addOnSubmit)}
    >
      <InputRow
        label="name"
        name="cabinName"
        type="text"
        options={register("cabinName", {
          minLength: 3,
          required: "this field is required",
        })}
        error={
          errors?.cabinName
            ? errors?.cabinName.message
              ? errors?.cabinName.message
              : "this field length must be >= 3"
            : ""
        }
        className="col-span-6"
      />
      <InputRow
        label="Price"
        name="cabinPrice"
        type="number"
        options={register("cabinPrice", { required: "this field is required" })}
        error={errors?.cabinPrice ? errors?.cabinPrice.message : ""}
        className="col-span-2"
      />
      <InputRow
        label="Discount"
        name="cabinDiscount"
        type="number"
        options={register("cabinDiscount", {
          required: "this field is required",
        })}
        error={errors?.cabinDiscount ? errors?.cabinDiscount.message : ""}
        className="col-span-2"
      />
      <InputRow
        label="Capacity"
        name="cabinCapacity"
        type="number"
        options={register("cabinCapacity", {
          required: "this field is required",
          min: 1,
        })}
        error={
          errors?.cabinCapacity
            ? errors?.cabinCapacity.message
              ? errors?.cabinCapacity.message
              : "this field must be >= 1"
            : ""
        }
        className="col-span-2"
      />

      <textarea
        name="cabinDescription"
        id="cabinDescription"
        cols={10}
        rows={4}
        placeholder="Description"
        className="col-span-6 border-t-4 border-primary rounded-3xl p-4 overflow-y-auto outline-none bg-gradient-to-b from-primary/20 to-secondary"
        {...register("cabinDescription", {
          required: "this field is required",
        })}
      ></textarea>
      <FileInput
        label="Choose Cabin Image"
        name="cabinImage"
        icon={<RiImageAddFill />}
        options={register("cabinImage")}
        error={errors?.cabinImage ? errors?.cabinImage.message : ""}
        className="col-span-6"
      />
      <Button
        type="submit"
        disabled={isLoading}
        icon={
          <HashLoader size={25} color={SECONDARY_COLOR} loading={isLoading} />
        }
      >
        add cabin
      </Button>
    </form>
  );
}

AddCabin.propTypes = {};

export default AddCabin;
