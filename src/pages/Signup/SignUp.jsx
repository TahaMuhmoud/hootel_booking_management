import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import InputRow from "../../ui/InputRow";
import Button from "../../ui/Button";
import { HashLoader } from "react-spinners";
import FileInput from "../../ui/FileInput";
import { RiImageAddFill } from "react-icons/ri";
import { useSignUp } from "../../features/auth/useSignUp";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../../features/auth/useUser";

function SignUp() {
  const { isAuthenticated, isUserLoading } = useUser();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isLoading, signUp } = useSignUp();

  function onSubmit({
    firstName,
    lastName,
    birthDate,
    phone,
    email,
    password,
    verifyPass,
    avatar,
    bgImg,
  }) {
    let fullName = firstName + " " + lastName;
    if (password === verifyPass) {
      let data = {
        data: { password, email, phone },
        additionalData: { fullName, details: "", birthDate },
        avatar,
        bgImg,
      };
      signUp(data, {
        onSuccess: () => navigate("/login", { state: { email, password } }),
      });
    } else {
      toast.error("verfiy pass and pass not matched");
    }
  }
  useEffect(() => {
    if (isAuthenticated) navigate("/");
    return () => {};
  }, [isAuthenticated, navigate]);

  if (isUserLoading || isAuthenticated) return null;
  return (
    <div className="w-screen h-screen grid place-items-center p-2 overflow-">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
        }}
      />
      <div className="w-full md:w-[800px] bg-third p-4 sm:p-10 rounded-xl">
        <div className="text-4xl font-bold mb-5">Sign Up</div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full grid grid-cols-6 gap-5"
        >
          <InputRow
            label="first name"
            type="text"
            name="firstName"
            options={register("firstName", {
              required: "this field is required to fill",
            })}
            error={errors?.firstName?.message}
            className="col-span-6 md:col-span-3"
          />

          <InputRow
            label="last name"
            type="text"
            name="lastName"
            options={register("lastName", {
              required: "this field is required to fill",
            })}
            error={errors?.lastName?.message}
            className="col-span-6 md:col-span-3"
          />
          <InputRow
            label="birth date"
            type="date"
            name="birthDate"
            options={register("birthDate", {
              required: "this field is required to fill",
            })}
            error={errors?.birthDate?.message}
            className="col-span-6 md:col-span-3"
          />
          <InputRow
            label="phone number"
            type="number"
            name="phone"
            options={register("phone", {
              required: "this field is required to fill",
            })}
            error={errors?.phone?.message}
            className="col-span-6 md:col-span-3"
          />
          <InputRow
            label="email"
            type="email"
            name="email"
            options={register("email", {
              required: "this field is required to fill",
            })}
            error={errors?.email?.message}
            className="col-span-6"
          />
          <InputRow
            label="password"
            type="text"
            name="password"
            options={register("password", {
              required: "this field is required to fill",
              minLength: 8,
            })}
            error={errors?.password?.message}
            className="col-span-6 md:col-span-3"
          />
          <InputRow
            label="verify password"
            name="verifyPass"
            type="text"
            options={register("verifyPass", {
              required: "this field is required to fill",
              minLength: 8,
            })}
            error={errors?.verifyPass?.message}
            className="col-span-6 md:col-span-3"
          />
          <FileInput
            label="Add profile image"
            name={"avatar"}
            icon={<RiImageAddFill />}
            options={register("avatar")}
            error={errors?.avatar?.message}
            className="col-span-6 md:col-span-3 w-full"
          />
          <FileInput
            label="Add background image"
            name={"bgImg"}
            icon={<RiImageAddFill />}
            options={register("bgImg")}
            error={errors?.bgImg?.message}
            className="col-span-6 md:col-span-3 w-full"
          />
          <Button
            icon={<HashLoader size={25} loading={isLoading} />}
            className="col-span-6 w-full grid place-items-center py-5"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
}

SignUp.propTypes = {};

export default SignUp;
