import { GoPencil } from "react-icons/go";
import { useLocation } from "react-router-dom";
import InputRow from "../../ui/InputRow";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { useState } from "react";
import Sppiner from "../../ui/Sppiner";
import { useEditCabin } from "../../features/cabins/useEditCabin";
import Header from "../../ui/Header";
import { firstLitterToUpper } from "../../utils/helpers";
import FileInput from "../../ui/FileInput";
import { RiImageAddFill } from "react-icons/ri";

const LIST = [
  { label: "Name", name: "name", type: "text" },
  { label: "Price", name: "regularPrice", type: "number" },
  { label: "Discount", name: "discount", type: "number" },
  { label: "Capacity", name: "maxCapacity", type: "number" },
  { label: "image", name: "image", type: "file" },
];

function EditCabin() {
  const [selected, setSelected] = useState(null);
  const { state: cabin } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { editCabin, isEditing } = useEditCabin();

  function handleOnClick(id) {
    setSelected((sel) => (sel === null ? id : sel === id ? null : id));
  }

  function onSubmit(data) {
    if (data) editCabin({ id: cabin.id, updatedData: data });
  }

  if (isEditing) return <Sppiner />;
  return (
    <div className="w-full flex flex-col gap-5">
      <Header header={firstLitterToUpper("Edit Cabin")} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-7 text-lg font-bold"
      >
        {LIST.map((item, i) => (
          <div
            key={item.label}
            className={`${selected !== i ? "border-b-4 border-primary" : ""} rounded-full p-1 px-5`}
          >
            <div className="flex flex-col">
              <div className="flex justify-between">
                <div>
                  <span>{item.label}</span>
                  <span>{":  "}</span>
                  <span>
                    {item.name !== "image"
                      ? cabin[item.name]
                      : cabin["image"].split("/")[8]}
                  </span>
                </div>
                <GoPencil
                  className="cursor-pointer text-xl"
                  onClick={() => handleOnClick(i)}
                />
              </div>
            </div>

            {selected === i && item.type !== "file" ? (
              <InputRow
                className="my-3 text-lg font-normal"
                name={item.name}
                type={item.type}
                options={register(item.name, {
                  minLength: 3,
                  required: "this field is required",
                })}
                error={
                  errors[item.name]
                    ? errors[item.name].message
                      ? errors[item.name].message
                      : "this field length must be >= 3"
                    : ""
                }
              />
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

        <Button type="submit">Update Cabin</Button>
      </form>
    </div>
  );
}

EditCabin.propTypes = {};

export default EditCabin;
