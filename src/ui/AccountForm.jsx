import PropTypes from "prop-types";
import { HashLoader } from "react-spinners";
import Button from "./Button";
import { useForm } from "react-hook-form";
import InputRow from "./InputRow";
import { RiImageAddFill } from "react-icons/ri";
import FileInput from "./FileInput";
import { SECONDARY_COLOR } from "../utils/constants";

const LIST = [
  { label: "email", name: "email", type: "email" },
  { label: "phone", name: "phone", type: "number" },
  { label: "Birth date", name: "birthDate", type: "date" },
  { label: "full name", name: "fullName", type: "text" },
  { label: "Add new profile image", name: "avatar", type: "file" },
  { label: "Add new background image", name: "bgImg", type: "file" },
];

function AccountForm({ onSubmit, isSubmiting, submitBtnText }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <form
      className="flex flex-col gap-4 text-lg font-bold"
      onSubmit={handleSubmit(onSubmit)}
    >
      {LIST.map((item, i) =>
        item.type !== "file" ? (
          <InputRow
            key={i}
            className="text-lg font-normal"
            label={item.label}
            name={item.name}
            type={item.type}
            options={register(item.name)}
            error={errors[item.name] ? errors[item.name].message : ""}
          />
        ) : (
          <FileInput
            key={i}
            label={item.label}
            name={item.name}
            icon={<RiImageAddFill />}
            options={register(item.name)}
            error={errors?.cabinImage ? errors?.cabinImage.message : ""}
          />
        )
      )}
      <div className="flex gap-5 items-center justify-end">
        <InputRow
          label="password"
          className="text-lg font-normal"
          name="password"
          type="text"
          options={register("password")}
          error={errors["password"] ? errors["password"].message : ""}
        />
        <InputRow
          label="verify password"
          className="text-lg font-normal"
          name="verifyPass"
          type="text"
          options={register("verifyPass")}
          error={errors["verifyPass"] ? errors["verifyPass"].message : ""}
        />
      </div>
      <div className="w-full">
        <textarea
          name="details"
          id="details"
          cols={10}
          rows={4}
          placeholder="details"
          className="w-full border-t-4 border-primary rounded-3xl p-4 overflow-y-auto outline-none bg-gradient-to-b from-primary/20 to-secondary"
          {...register("details")}
        ></textarea>
      </div>
      <Button
        type="submit"
        disabled={isSubmiting}
        icon={
          <HashLoader size={25} color={SECONDARY_COLOR} loading={isSubmiting} />
        }
      >
        {submitBtnText}
      </Button>
    </form>
  );
}

AccountForm.propTypes = {
  onSubmit: PropTypes.func,
  isSubmiting: PropTypes.bool,
  submitBtnText: PropTypes.string,
};

export default AccountForm;
