import { useForm } from "react-hook-form";
import Header from "../../ui/Header";
import { firstLitterToUpper } from "../../utils/helpers";
import { useState } from "react";
import { GoPencil } from "react-icons/go";
import Button from "../../ui/Button";
import Sppiner from "../../ui/Sppiner";
import InputRow from "../../ui/InputRow";
import { useUpdateSettings } from "../../features/settings/useUpdateSettings";
import { HashLoader } from "react-spinners";
import { useSettings } from "../../features/settings/useSettings";

// import PropTypes from 'prop-types'
const LIST = [
  { label: "breakfastPrice", name: "breakfastPrice", type: "number" },
  { label: "maxGuestsPerBooking", name: "maxGuestsPerBooking", type: "number" },
  { label: "maxBookingLength", name: "maxBookingLength", type: "number" },
  { label: "minBookingLength", name: "minBookingLength", type: "number" },
];
function Settings() {
  const [selected, setSelected] = useState(null);
  const { settings, isLoadingSettings } = useSettings();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isUpdating, updateSettings } = useUpdateSettings();

  function handleOnClick(id) {
    setSelected((sel) => (sel === null ? id : sel === id ? null : id));
  }
  function onSubmit(formData) {
    let filtered = Object.entries(formData).filter((item) => item[1] !== "");
    formData = Object.fromEntries(filtered);

    let id = settings[0].id;
    if (formData && id) updateSettings({ id, data: { ...formData } });
  }

  if (isLoadingSettings) return <Sppiner />;
  return (
    <div className="w-full flex flex-col gap-5">
      <Header header={firstLitterToUpper("Edit Booking")} />
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
              <div
                className="flex justify-between cursor-pointer"
                onClick={() => handleOnClick(i)}
              >
                <div onClick={() => handleOnClick(i)}>
                  <span>{item.label}</span>
                  <span>{":  "}</span>
                  <span>{settings[0][item.name].toString()}</span>
                </div>
                <GoPencil
                  className="cursor-pointer text-xl"
                  onClick={() => handleOnClick(i)}
                />
              </div>
            </div>

            {selected === i && (
              <InputRow
                className="my-3 text-lg font-normal"
                name={item.name}
                type={item.type}
                options={register(item.name, {
                  required: "this field is required",
                })}
                error={errors[item.name] ? errors[item.name].message : ""}
              />
            )}
          </div>
        ))}
        <Button type="submit">
          Update Booking {isUpdating && <HashLoader size={25} />}
        </Button>
      </form>
    </div>
  );
}

Settings.propTypes = {};

export default Settings;
