import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import InputRow from "../../ui/InputRow";
import { useLogin } from "../../features/auth/useLogin";
import { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../features/auth/useUser";
import { useEffect } from "react";
import { HashLoader } from "react-spinners";
import { PRIMARY_COLOR } from "../../utils/constants";

const Login = () => {
  const { isAuthenticated, isUserLoading } = useUser();
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: state?.email || "someone@email.com",
      password: state?.password || "AVPYDLgYQlxfCjezOMfp",
    },
  });

  const { login, isLoging } = useLogin();

  function onSubmit(formData) {
    login(formData, { onSuccess: () => navigate("/") });
  }

  function handleSignUpClick() {
    navigate("/signup");
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/");
    return () => {};
  }, [isAuthenticated, navigate]);

  if (isUserLoading || isAuthenticated) return null;

  return (
    <div className="w-screen h-screen grid place-items-center p-2">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
        }}
      />
      <div className="w-full sm:w-[500px] bg-third p-4 sm:p-10 rounded-xl">
        <div className="text-4xl font-bold">Login</div>
        <form
          className="flex flex-col gap-5 mt-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputRow
            name="Email"
            label="Email"
            type="email"
            options={register("email", {
              required: "please enter your Email",
            })}
            error={errors.email?.message}
          />
          <InputRow
            name="Password"
            label="Password"
            type="text"
            options={register("password", {
              required: "please enter your passowrd",
              minLength: 8,
            })}
            error={
              errors?.password
                ? errors?.password.message
                  ? errors?.password.message
                  : "this field size must be >= 8"
                : ""
            }
          />
          <div className="">
            <span>{`if you don't have account please `}</span>
            <Button onClick={handleSignUpClick} className="text-sm">
              Sign up
            </Button>
          </div>
          <Button
            type="submit"
            disabled={isLoging}
            className={"w-full grid place-items-center py-5"}
            icon={
              <HashLoader size={25} color={PRIMARY_COLOR} loading={isLoging} />
            }
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
